"use client";
import { TransactionProvider } from "@/context/TransactionContext";
import React, { ReactNode } from "react";

const Provider = ({ children }: { children: ReactNode }) => {
  return <TransactionProvider>{children}</TransactionProvider>;
};

export default Provider;
