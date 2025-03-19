"use client";
import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import {
  BrowserProvider,
  parseEther,
  Contract,
  formatEther,
  isAddress,
} from "ethers";
import { contractABI, contractAddress } from "../../utils/constants";

declare global {
  interface Window {
    ethereum: import("ethers").Eip1193Provider & {
      on: (event: string, listener: (...args: any[]) => void) => void;
      removeAllListeners: (event?: string) => void;
    };
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
  addressFrom?: string;
  amount: string;
  keyword: string;
  message: string;
  timestamp: string;
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

export const initialState: IFormData = {
  addressTo: "",
  amount: "",
  keyword: "",
  message: "",
};

export const _TransactionContext = createContext<ITransactionContext>({
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

const getEthereumContract = async (provider?: BrowserProvider) => {
  const ethereum = window?.ethereum;
  if (!ethereum) return null;
  const ethProvider = provider || new BrowserProvider(ethereum);
  const signer = await ethProvider.getSigner();
  return new Contract(contractAddress, contractABI, signer);
};

const validateFormData = (formData: IFormData): string | null => {
  const { addressTo, amount, keyword, message } = formData;
  if (!isAddress(addressTo)) return "Invalid Ethereum address";
  if (!amount || isNaN(Number(amount)) || Number(amount) <= 0)
    return "Amount must be a positive number";
  if (!keyword.trim()) return "Keyword is required";
  if (!message.trim()) return "Message is required";
  return null;
};

export const TransactionProvider = ({ children }: { children: ReactNode }) => {
  const [formData, setFormData] = useState<IFormData>(initialState);
  const [currentAccount, setCurrentAccount] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [transactionCount, setTransactionCount] = useState<string | null>(
    typeof window !== "undefined"
      ? localStorage.getItem("transactionCount")
      : null
  );
  const [allTransactions, setAllTransactions] = useState<ITransaction[]>([]);

  const checkIfWalletIsConnected = async () => {
    if (!window.ethereum) return alert("Please install MetaMask");
    try {
      const provider = new BrowserProvider(window.ethereum);
      const accounts = await provider.listAccounts();
      if (accounts.length) {
        setCurrentAccount(accounts[0].address);
        await getAllTransactions();
        setupEventListeners(provider);
      }
    } catch (error) {
      console.error("Failed to connect to network:", error);
    }
  };

  const connectWallet = async () => {
    // Check if we're on a mobile device
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

    if (!window.ethereum && !isMobile) {
      alert("Please install the MetaMask extension in your browser.");
      return;
    }

    try {
      if (isMobile && !window.ethereum) {
        // Attempt to open MetaMask app via deep link
        const deepLink = `metamask://wc?uri=${encodeURIComponent(
          window.location.href
        )}`;
        window.location.href = deepLink;
        // Fallback if MetaMask isn’t installed (timeout after 2 seconds)
        setTimeout(() => {
          if (document.hasFocus()) {
            alert("MetaMask app not detected. Redirecting to app store...");
            window.location.href = "https://metamask.app.link/";
          }
        }, 2000);
      } else {
        // Desktop or MetaMask browser flow
        const provider = new BrowserProvider(window.ethereum);
        const accounts = await provider.send("eth_requestAccounts", []);
        setCurrentAccount(accounts[0]);
        await getAllTransactions();
        setupEventListeners(provider);
      }
    } catch (error) {
      console.error("Wallet connection failed:", error);
      throw new Error("Failed to connect to wallet");
    }
  };

  const sendTransaction = async () => {
    console.log("Sending transaction");
    if (!window.ethereum) return alert("Please install MetaMask");
    if (!currentAccount) return alert("Please connect your wallet");

    const validationError = validateFormData(formData);
    if (validationError) {
      alert(validationError);
      return;
    }

    try {
      setIsLoading(true);
      const provider = new BrowserProvider(window.ethereum);
      const contract = await getEthereumContract(provider);
      if (!contract) throw new Error("Contract not initialized");

      const { addressTo, amount, keyword, message } = formData;
      const parsedAmount = parseEther(amount);

      const signer = await provider.getSigner();
      const tx = await signer.sendTransaction({
        to: addressTo,
        value: parsedAmount,
      });
      await tx.wait();

      const contractTx = await contract.addToBlockChain(
        addressTo,
        parsedAmount,
        message,
        keyword
      );
      await contractTx.wait();

      const newCount = await contract.getTransactionCount();
      setTransactionCount(newCount.toString());
      localStorage.setItem("transactionCount", newCount.toString());
    } catch (error) {
      console.error("Transaction failed:", error);
      throw new Error("Failed to send transaction");
    } finally {
      setIsLoading(false);
    }
  };

  const getAllTransactions = async () => {
    if (!window.ethereum) return;
    try {
      const contract = await getEthereumContract();
      if (!contract) return;

      const transactions = await contract.getAllTransactions();
      const formattedTransactions: ITransaction[] = transactions.map(
        (tx: any) => ({
          addressFrom: tx.sender,
          addressTo: tx.receiver,
          amount: formatEther(tx.amount),
          keyword: tx.keyword,
          message: tx.message,
          timestamp: new Date(Number(tx.timestamp) * 1000).toLocaleString(),
        })
      );
      setAllTransactions(formattedTransactions.reverse());
    } catch (error) {
      console.error("Failed to fetch transactions:", error);
    }
  };

  const setupEventListeners = (provider: BrowserProvider) => {
    const contract = new Contract(contractAddress, contractABI, provider);

    // Contract Transfer event listener
    contract.on(
      "Transfer",
      (sender, receiver, amount, message, keyword, timestamp) => {
        const newTransaction: ITransaction = {
          addressFrom: sender,
          addressTo: receiver,
          amount: formatEther(amount),
          keyword,
          message,
          timestamp: new Date(Number(timestamp) * 1000).toLocaleString(),
        };
        setAllTransactions((prev) => [newTransaction, ...prev]);
        contract.getTransactionCount().then((count: bigint) => {
          setTransactionCount(count.toString());
          localStorage.setItem("transactionCount", count.toString());
        });
      }
    );

    // Wallet account change listener
    if (window.ethereum) {
      window.ethereum.on("accountsChanged", (accounts: string[]) => {
        if (accounts.length === 0) {
          setCurrentAccount("");
          setAllTransactions([]);
          setTransactionCount(null);
          localStorage.removeItem("transactionCount");
        } else {
          setCurrentAccount(accounts[0]);
          getAllTransactions();
        }
      });
    }
  };

  useEffect(() => {
    checkIfWalletIsConnected();

    // Cleanup listeners on unmount
    return () => {
      if (window.ethereum) {
        window.ethereum.removeAllListeners("accountsChanged");
        const provider = new BrowserProvider(window.ethereum);
        const contract = new Contract(contractAddress, contractABI, provider);
        contract.removeAllListeners("Transfer");
      }
    };
  }, []);

  return (
    <_TransactionContext.Provider
      value={{
        formData,
        connectWallet,
        allTransactions,
        currentAccount,
        getAllTransactions,
        isLoading,
        sendTransaction,
        setFormData,
        transactionCount,
      }}
    >
      {children}
    </_TransactionContext.Provider>
  );
};
