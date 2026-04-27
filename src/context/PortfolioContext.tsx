import { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react';
import { defaultData } from '../data/defaultData';
import { db, auth, googleProvider, signInWithPopup, signOut, doc, setDoc, onSnapshot } from '../lib/firebase';
import { onAuthStateChanged } from 'firebase/auth';

enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
  authInfo: {
    userId?: string | null;
    email?: string | null;
    emailVerified?: boolean | null;
    isAnonymous?: boolean | null;
    tenantId?: string | null;
    providerInfo?: {
      providerId?: string | null;
      email?: string | null;
    }[];
  }
}

function handleFirestoreError(error: unknown, operationType: OperationType, path: string | null) {
  const errInfo: FirestoreErrorInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: {
      userId: auth.currentUser?.uid,
      email: auth.currentUser?.email,
      emailVerified: auth.currentUser?.emailVerified,
      isAnonymous: auth.currentUser?.isAnonymous,
      tenantId: auth.currentUser?.tenantId,
      providerInfo: auth.currentUser?.providerData?.map(provider => ({
        providerId: provider.providerId,
        email: provider.email,
      })) || []
    },
    operationType,
    path
  };
  console.error('Firestore Error: ', JSON.stringify(errInfo));
  throw new Error(JSON.stringify(errInfo));
}

export const PortfolioContext = createContext<any>(null);

export function PortfolioProvider({ children }: { children: ReactNode }) {
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(defaultData);

  // Load from firestore
  useEffect(() => {
    const unsub = onSnapshot(doc(db, 'portfolioData', 'main'), (docSnap) => {
      if (docSnap.exists()) {
        setData(docSnap.data() as typeof defaultData);
      } else {
        setData(defaultData);
      }
      setLoading(false);
    }, (error) => {
      setLoading(false); // fall back to default
      handleFirestoreError(error, OperationType.GET, 'portfolioData/main');
    });
    return unsub;
  }, []);

  // Listen to auth state
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      // Only allow lucaenea0@gmail.com to be in edit mode
      if (user && user.email === 'lucaenea0@gmail.com') {
        setIsEditing(true);
      } else {
        setIsEditing(false);
      }
    });
    return unsub;
  }, []);

  // Use debounce for saving to firestore to prevent quota limits when typing
  useEffect(() => {
    if (loading || !isEditing) return;
    const timer = setTimeout(() => {
      setDoc(doc(db, 'portfolioData', 'main'), data).catch(e => {
        handleFirestoreError(e, OperationType.WRITE, 'portfolioData/main');
      });
    }, 1000);
    return () => clearTimeout(timer);
  }, [data, loading, isEditing]);

  const login = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      return true;
    } catch(err) {
      console.error(err);
      return false;
    }
  };

  const logout = async () => {
    await signOut(auth);
    setIsEditing(false);
  };

  const updateData = (section: string, newData: any) => {
      setData((prev: any) => ({ ...prev, [section]: newData }));
  };

  const updateItem = (section: string, id: string, field: string, value: any) => {
      setData((prev: any) => ({
        ...prev,
        [section]: prev[section].map((item: any) => 
          item.id === id ? { ...item, [field]: value } : item
        )
      }));
  };

  if (loading) {
     return <div className="min-h-screen bg-background flex items-center justify-center text-on-surface">Loading Portfolio...</div>;
  }

  return (
    <PortfolioContext.Provider value={{ data, updateData, updateItem, isEditing, login, logout }}>
      {children}
    </PortfolioContext.Provider>
  );
}

export const usePortfolio = () => useContext(PortfolioContext);
