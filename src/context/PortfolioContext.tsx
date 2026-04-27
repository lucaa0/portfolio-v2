import { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react';
import { defaultData } from '../data/defaultData';
import { db, auth, googleProvider, signInAnonymously, signOut, doc, setDoc, onSnapshot } from '../lib/firebase';
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
  // Not throwing to prevent app crash, just alert in dev or log
  if (operationType === OperationType.WRITE) {
    console.warn("Failed to save data. If you recently logged in via email/password, make sure the rules allow it without email verification. Error:", errInfo.error);
  }
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
        const dbData = docSnap.data();
        setData({
          ...defaultData,
          ...dbData,
          contact: { ...defaultData.contact, ...(dbData.contact || {}) },
          projects: dbData.projects && dbData.projects.length > 0 ? dbData.projects : defaultData.projects,
          experience: dbData.experience && dbData.experience.length > 0 ? dbData.experience : defaultData.experience,
          education: dbData.education && dbData.education.length > 0 ? dbData.education : defaultData.education,
          skills: dbData.skills && dbData.skills.length > 0 ? dbData.skills : defaultData.skills
        });
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
      // Allow any anonymous user for the edit mode, or the bootstrapped admin
      if (user) {
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

  const login = async (password: string) => {
    const validPassword = import.meta.env.VITE_APP_PASSWORD || 'admin';
    if (password === validPassword) {
      try {
        await signInAnonymously(auth);
        return { success: true };
      } catch(err: any) {
        console.error(err);
        return { success: false, error: 'Failed to connect to database: ' + err.message };
      }
    } else {
      return { success: false, error: 'Incorrect password.' };
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
