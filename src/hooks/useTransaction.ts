"use client";
import { useContext } from "react";
import { _TransactionContext } from "../context/Transaction";

const useTransaction = () => {
  const context = useContext(_TransactionContext);

  if (!context) {
    throw new Error(
      "Transaction context must be within  a transaction context provider"
    );
  }
  return context;
};

export default useTransaction;
