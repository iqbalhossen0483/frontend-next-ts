"use client";
import { createContext, ReactNode } from "react";
import AuthStore from "./AuthStore";
import { store } from "./auth_store_type";

export const Context = createContext<store | null>(null);

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const store = AuthStore();
  return <Context.Provider value={store}>{children}</Context.Provider>;
};

export default AuthProvider;
