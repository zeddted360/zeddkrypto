"use client";
import { JSX, useEffect } from "react";
import useTransaction from "../hooks/useTransaction";
import { useFetchGiphy } from "../hooks/useFetchGiphy";
import { FiExternalLink, FiRefreshCw, FiArrowDown } from "react-icons/fi";
import { shortenAddress } from "../../utils/shortenAddres";

interface TransactionCardProps {
  addressFrom: string;
  addressTo: string;
  keyword: string;
  amount: number;
  message: string;
  timestamp: string;
  url?: string;
}

const TransactionCard = ({
  addressFrom,
  addressTo,
  keyword,
  amount,
  message,
  timestamp,
  url,
}: TransactionCardProps): JSX.Element => {
  const { giphyURL } = useFetchGiphy({ keyword: keyword });

  return (
    <div className="bg-gradient-to-r from-[#1f2937] to-[#111827] rounded-xl overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-2xl border border-gray-800">
      <div className="relative">
        <img
          className="w-full h-48 object-cover"
          src={
            giphyURL ||
            url ||
            "https://media.giphy.com/media/3oEjI6SIIHBdRx6P8I/giphy.gif"
          }
          alt="transaction"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
        <div className="absolute bottom-4 left-4">
          <p className="text-white font-bold text-lg">{amount} ETH</p>
          <p className="text-gray-300 text-sm">
            {new Date(timestamp).toLocaleString()}
          </p>
        </div>
        <div className="absolute top-4 right-4 bg-[#37c7da]/90 px-3 py-1 rounded-full">
          <p className="text-white text-sm font-medium">{keyword}</p>
        </div>
      </div>

      <div className="p-5">
        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <span className="text-gray-400 font-medium">From:</span>
            <a
              href={`https://sepolia.etherscan.io/address/${addressFrom}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#37c7da] hover:text-[#4cd8ed] transition-colors flex items-center"
            >
              <span>{shortenAddress(addressFrom)}</span>
              <FiExternalLink className="ml-1 h-4 w-4" />
            </a>
          </div>

          <div className="flex items-center space-x-2">
            <span className="text-gray-400 font-medium">To:</span>
            <a
              href={`https://sepolia.etherscan.io/address/${addressTo}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#37c7da] hover:text-[#4cd8ed] transition-colors flex items-center"
            >
              <span>{shortenAddress(addressTo)}</span>
              <FiExternalLink className="ml-1 h-4 w-4" />
            </a>
          </div>

          {message && (
            <div className="mt-3 p-4 bg-black/40 rounded-lg border border-gray-800">
              <p className="text-gray-300">{message}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const Transactions = () => {
  const { currentAccount, allTransactions, getAllTransactions } =
    useTransaction();

  useEffect(() => {
    if (currentAccount) {
      getAllTransactions();
    }
  }, [currentAccount]);

  const emptyState = (
    <div className="flex flex-col items-center justify-center py-12">
      <div className="bg-[#1f2937] p-8 rounded-xl text-center max-w-lg mx-auto">
        <FiArrowDown className="w-16 h-16 mx-auto text-gray-600 mb-4" />
        <h3 className="text-2xl font-bold text-white mb-2">
          No transactions yet
        </h3>
        <p className="text-gray-400">
          {currentAccount
            ? "Your transactions will appear here once you've made some."
            : "Connect your wallet to see your transaction history."}
        </p>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0f172a] to-[#1e293b] py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-2">
            {currentAccount ? "Your Transactions" : "Transaction History"}
          </h1>
          <div className="h-1 w-20 bg-gradient-to-r from-[#37c7da] to-[#4cd8ed] mx-auto mb-4 rounded-full"></div>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            {currentAccount
              ? "View and track your recent blockchain transactions on the Ethereum network"
              : "Connect your wallet to view your transaction history"}
          </p>
        </div>

        {allTransactions && allTransactions.length > 0 ? (
          <>
            <div className="flex justify-between items-center mb-6">
              <p className="text-white font-medium">
                <span className="text-[#37c7da]">{allTransactions.length}</span>{" "}
                transactions found
              </p>
              <button
                onClick={getAllTransactions}
                className="bg-[#2d3748] hover:bg-[#37c7da] text-white px-4 py-2 rounded-lg transition-colors duration-300 flex items-center"
              >
                <FiRefreshCw className="w-4 h-4 mr-2" />
                Refresh
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {allTransactions
                .slice()
                .reverse()
                .map((transaction, index) => (
                  <TransactionCard
                    key={index}
                    addressFrom={transaction.addressFrom || currentAccount}
                    addressTo={transaction.addressTo}
                    amount={transaction.amount}
                    message={transaction.message}
                    timestamp={transaction.timestamp}
                    keyword={transaction.keyword}
                  />
                ))}
            </div>
          </>
        ) : (
          emptyState
        )}
      </div>
    </div>
  );
};

export default Transactions;
