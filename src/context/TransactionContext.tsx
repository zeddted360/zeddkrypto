"use client";
import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useState,
  useEffect,
} from "react";
import { BrowserProvider, Contract, parseEther, formatEther } from "ethers";
import { contractABI, contractAddress } from "../../utils/constants";

declare global {
  interface Window {
    ethereum: import("ethers").Eip1193Provider;
  }
}

export interface IFormData {
  addressTo: string;
  amount: string;
  keyword: string;
  message: string;
}

interface ITransaction {
  addressTo: string;
  amount: number;
  keyword: string;
  message: string;
  timestamp: string;
  addressFrom?: string;
}

interface ITransactionContext {
  formData: IFormData;
  setFormData: Dispatch<SetStateAction<IFormData>>;
  connectWallet: () => Promise<void>;
  currentAccount: string;
  isLoading: boolean;
  sendTransaction: () => Promise<void>;
  allTransactions: ITransaction[];
  transactionCount: string | null;
  getAllTransactions: () => Promise<void>;
}

const ethereum = typeof window !== undefined ? window.ethereum : null;
console.log("the ethereum is ", ethereum);

const getEthereumContract = async () => {
  try {
    if (!ethereum) return null;

    const provider = new BrowserProvider(ethereum);
    const signer = await provider.getSigner();

    const transactionContract = new Contract(
      contractAddress,
      contractABI,
      signer
    );

    return transactionContract;
  } catch (error) {
    console.error("Failed to get Ethereum contract:", error);
    return null;
  }
};

export const initialState: IFormData = {
  addressTo: "",
  amount: "",
  keyword: "",
  message: "",
};

export const TransactionContext = createContext<ITransactionContext>({
  formData: initialState,
  setFormData: () => {},
  connectWallet: async () => {},
  currentAccount: "",
  isLoading: false,
  sendTransaction: async () => {},
  allTransactions: [],
  transactionCount: null,
  getAllTransactions: async () => {},
});

export const TransactionProvider = ({ children }: { children: ReactNode }) => {
  const [formData, setFormData] = useState<IFormData>(initialState);
  const [currentAccount, setCurrentAccount] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [transactionCount, setTransactionCount] = useState<string | null>(
    localStorage.getItem("transactionCount")
  );
  const [allTransactions, setAllTransactions] = useState<ITransaction[]>([]);

  const getAllTransactions = async () => {
    try {
      if (!ethereum) {
        alert("Please install MetaMask");
        return;
      }

      const transactionContract = await getEthereumContract();
      if (!transactionContract) return;

      try {
        const transactions = await transactionContract.getAllTransactions();
        console.log("the all transactions is ", transactions);
        const structuredTransactions = transactions.map((transaction: any) => ({
          addressTo: transaction.receiver,
          addressFrom: transaction.sender,
          amount: Number(formatEther(transaction.amount)),
          keyword: transaction.keyword,
          message: transaction.message,
          timestamp: new Date(
            Number(transaction.timestamp) * 1000
          ).toLocaleString(),
        }));

        setAllTransactions(structuredTransactions);
        console.log("All transactions", structuredTransactions);
      } catch (error) {
        console.error(
          "Failed to get transactions from contract:",
          error instanceof Error && error.message
        );
        // If contract call fails, set an empty array
        setAllTransactions([]);
      }
    } catch (error) {
      console.error("Failed to get transactions:", error);
    }
  };

  const checkIfWalletIsConnected = async () => {
    try {
      if (!ethereum) {
        console.log("Please install MetaMask");
        return;
      }

      const accounts = await ethereum.request({ method: "eth_accounts" });

      if (accounts.length) {
        setCurrentAccount(accounts[0]);
        getAllTransactions();
      } else {
        console.log("No authorized accounts found");
      }
    } catch (error) {
      console.error("Failed to connect wallet:", error);
    }
  };

  const checkIfTransactionExists = async () => {
    try {
      if (!ethereum) return;

      const transactionContract = await getEthereumContract();
      if (!transactionContract) return;

      try {
        // Add error handling for the contract call
        const count = await transactionContract.getTransactionCount();
        console.log("the count is ", count);
        if (count !== undefined && count !== null) {
          window.localStorage.setItem("transactionCount", count.toString());
          setTransactionCount(count.toString());
        }
      } catch (error) {
        console.error("Contract method error:", error);
        // Handle the specific error for this method by just using the stored count
        // Don't update localStorage if the method fails
      }
    } catch (error) {
      console.error("Failed to check transactions:", error);
    }
  };

  const connectWallet = async () => {
    try {
      if (!ethereum) {
        alert("Please install MetaMask");
        return;
      }

      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });

      setCurrentAccount(accounts[0]);
    } catch (error) {
      console.error("Failed to connect wallet:", error);
    }
  };

  const sendTransaction = async () => {
    try {
      if (!ethereum) {
        alert("Please install MetaMask");
        return;
      }

      const { addressTo, amount, keyword, message } = formData;

      if (!addressTo || !amount || !keyword || !message) {
        alert("Please fill all fields");
        return;
      }

      const transactionContract = await getEthereumContract();
      if (!transactionContract) return;

      const parsedAmount = parseEther(amount);

      setIsLoading(true);

      try {
        // First, send ETH via MetaMask
        await ethereum.request({
          method: "eth_sendTransaction",
          params: [
            {
              from: currentAccount,
              to: addressTo,
              gas: "0x5208", // 21000 GWEI
              value: parsedAmount.toString(16),
            },
          ],
        });

        // Then try to record it on your contract
        try {
          const transactionHash = await transactionContract.addToBlockChain(
            addressTo,
            parsedAmount,
            message,
            keyword
          );

          console.log(`Loading - ${transactionHash.hash}`);
          await transactionHash.wait();
          console.log(`Success - ${transactionHash.hash}`);

          try {
            const transactionCount =
              await transactionContract.getTransactionCount();
            setTransactionCount(transactionCount.toString());
            localStorage.setItem(
              "transactionCount",
              transactionCount.toString()
            );
          } catch (countError) {
            console.error("Failed to get transaction count:", countError);
          }
        } catch (contractError) {
          console.error("Contract interaction failed:", contractError);
          // The ETH transfer may have succeeded, but contract recording failed
        }

        setIsLoading(false);
        setFormData(initialState);

        // Try to refresh transactions
        getAllTransactions();
      } catch (txError) {
        console.error("Transaction failed:", txError);
        setIsLoading(false);
      }
    } catch (error) {
      console.error("Send transaction failed:", error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    checkIfWalletIsConnected();
    const timer = setTimeout(() => {
      checkIfTransactionExists();
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <TransactionContext.Provider
      value={{
        formData,
        setFormData,
        connectWallet,
        currentAccount,
        isLoading,
        sendTransaction,
        allTransactions,
        transactionCount,
        getAllTransactions,
      }}
    >
      {children}
    </TransactionContext.Provider>
  );
};
