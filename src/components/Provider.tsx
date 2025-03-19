"use client";
import { TransactionProvider } from "@/context/Transaction";
import React, { ReactNode } from "react";

const Provider = ({ children }: { children: ReactNode }) => {
  return <TransactionProvider>{children}</TransactionProvider>;
};

export default Provider;
