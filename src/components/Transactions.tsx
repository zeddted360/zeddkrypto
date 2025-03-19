"use client";
import { JSX, useEffect } from "react";
import useTransaction from "../hooks/useTransaction";
import { useFetchGiphy } from "../hooks/useFetchGiphy";
import { FiExternalLink, FiRefreshCw, FiArrowDown } from "react-icons/fi";
import { shortenAddress } from "../../utils/shortenAddres";
import Image from "next/image";

interface TransactionCardProps {
  addressFrom: string;
  addressTo: string;
  keyword: string;
  amount: string;
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
  const { giphyURL } = useFetchGiphy({ keyword });

  return (
    <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-2xl border border-gray-700">
      {/* Image Section */}
      <div className="relative">
        <Image
          className="object-cover"
          src={
            giphyURL ||
            url ||
            "https://media.giphy.com/media/3oEjI6SIIHBdRx6P8I/giphy.gif"
          }
          alt={keyword}
          loading="lazy"
          width={400}
          height={400}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
        <div className="absolute bottom-4 left-4 flex items-center space-x-2">
          <span className="text-white font-bold text-lg">{amount} ETH</span>
          <span className="text-gray-300 text-sm">
            {new Date(timestamp).toLocaleString()}
          </span>
        </div>
        <div className="absolute top-4 right-4 bg-teal-500/90 px-3 py-1 rounded-full shadow-md">
          <p className="text-white text-sm font-medium">{keyword}</p>
        </div>
      </div>

      {/* Details Section */}
      <div className="p-5 space-y-4">
        <div className="flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <span className="text-gray-400 font-medium">From:</span>
            <a
              href={`https://sepolia.etherscan.io/address/${addressFrom}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-teal-400 hover:text-teal-300 transition-colors flex items-center"
            >
              {shortenAddress(addressFrom)}
              <FiExternalLink className="ml-2 h-4 w-4" />
            </a>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-gray-400 font-medium">To:</span>
            <a
              href={`https://sepolia.etherscan.io/address/${addressTo}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-teal-400 hover:text-teal-300 transition-colors flex items-center"
            >
              {shortenAddress(addressTo)}
              <FiExternalLink className="ml-2 h-4 w-4" />
            </a>
          </div>
        </div>
        {message && (
          <div className="p-3 bg-gray-900/50 rounded-lg border border-gray-800">
            <p className="text-gray-300 text-sm line-clamp-2">{message}</p>
          </div>
        )}
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
    <div className="flex flex-col items-center justify-center py-16">
      <div className="bg-gray-800 p-8 rounded-xl text-center max-w-md mx-auto shadow-lg">
        <FiArrowDown className="w-12 h-12 mx-auto text-gray-500 mb-4 animate-bounce" />
        <h3 className="text-2xl font-bold text-white mb-2">
          No Transactions Yet
        </h3>
        <p className="text-gray-400 text-base">
          {currentAccount
            ? "Your transactions will appear here once you’ve made some."
            : "Connect your wallet to view your transaction history."}
        </p>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 py-12 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-3">
            {currentAccount ? "Your Transactions" : "Transaction History"}
          </h1>
          <div className="h-1 w-24 bg-gradient-to-r from-teal-400 to-cyan-500 mx-auto rounded-full" />
          <p className="mt-4 text-gray-300 text-lg md:text-xl max-w-2xl mx-auto">
            {currentAccount
              ? "Track your latest Ethereum blockchain transactions in real-time."
              : "Connect your wallet to explore your transaction history."}
          </p>
        </div>

        {/* Transactions List */}
        {allTransactions && allTransactions.length > 0 ? (
          <>
            <div className="flex justify-between items-center mb-8">
              <p className="text-gray-300 font-medium">
                <span className="text-teal-400">{allTransactions.length}</span>{" "}
                {allTransactions.length === 1 ? "transaction" : "transactions"}{" "}
                found
              </p>
              <button
                onClick={getAllTransactions}
                className="bg-gray-700 hover:bg-teal-500 text-white px-4 py-2 rounded-lg transition-all duration-300 flex items-center shadow-md"
              >
                <FiRefreshCw className="w-4 h-4 mr-2 animate-spin-slow" />
                Refresh
              </button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {allTransactions
                .slice()
                .reverse()
                .map((transaction, index) => (
                  <TransactionCard
                    key={index}
                    addressFrom={transaction.addressFrom || currentAccount}
                    addressTo={transaction.addressTo}
                    amount={transaction.amount.toString()}
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
