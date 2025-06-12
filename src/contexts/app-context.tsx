"use client";
import React, { createContext, useContext, useState, ReactNode } from "react";

interface AppContextProps {
  headerVisible: boolean;
  setHeaderVisible: (visible: boolean) => void;
}

const AppContext = createContext<AppContextProps | undefined>(undefined);

interface AppProviderProps {
  children: ReactNode;
}

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  const [headerVisible, setHeaderVisible] = useState<boolean>(true);

  return (
    <AppContext.Provider value={{ headerVisible, setHeaderVisible }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useApp must be used within an AppProvider");
  }
  return context;
};
