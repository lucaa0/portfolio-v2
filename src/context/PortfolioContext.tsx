import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { defaultData } from '../data/defaultData';

export const PortfolioContext = createContext<any>(null);

export function PortfolioProvider({ children }: { children: ReactNode }) {
  const [isEditing, setIsEditing] = useState(false);
  const [data, setData] = useState(() => {
    const saved = localStorage.getItem('portfolioData');
    return saved ? JSON.parse(saved) : defaultData;
  });

  useEffect(() => {
    localStorage.setItem('portfolioData', JSON.stringify(data));
  }, [data]);

  const login = (password: string) => {
    if (password === import.meta.env.VITE_APP_PASSWORD) {
      setIsEditing(true);
      return true;
    }
    return false;
  };

  const logout = () => setIsEditing(false);

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

  return (
    <PortfolioContext.Provider value={{ data, updateData, updateItem, isEditing, login, logout }}>
      {children}
    </PortfolioContext.Provider>
  );
}

export const usePortfolio = () => useContext(PortfolioContext);
