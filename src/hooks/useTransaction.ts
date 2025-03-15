"use client";
import { useContext } from "react";
import { TransactionContext } from "../context/TransactionContext";

const useTransaction = () => {
  const context = useContext(TransactionContext);

  if (!context) {
    throw new Error(
      "Transaction context must be within  a transaction context provider"
    );
  }
  return context;
};

export default useTransaction;
