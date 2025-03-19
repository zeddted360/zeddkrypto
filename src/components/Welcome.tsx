"use client";
import { SiEthereum } from "react-icons/si";
import { BsInfoCircle } from "react-icons/bs";
import { ChangeEvent, useState } from "react";
import { Loader } from "./";
import useTransaction from "../hooks/useTransaction";
import { shortenAddress } from "../../utils/shortenAddres";
import { isAddress } from "ethers";

const Welcome = () => {
  const [error, setError] = useState<string | null>("");

  const {
    formData,
    setFormData,
    connectWallet,
    currentAccount,
    isLoading,
    sendTransaction,
  } = useTransaction();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (): Promise<void> => {
    const { addressTo, amount, keyword, message } = formData;
    const validateFormData = (): string | null => {
      if (!isAddress(addressTo)) return "Invalid Ethereum address";
      if (!amount || isNaN(Number(amount)) || Number(amount) <= 0)
        return "Amount must be a positive number";
      if (!keyword.trim()) return "Keyword is required";
      if (!message.trim()) return "Message is required";
      if (addressTo === currentAccount)
        return "Cannot send to your own address";
      return null;
    };

    const validationError = validateFormData();
    if (validationError) {
      setError(validationError);
      return;
    }
    setError(null);
    await sendTransaction();
  };

  const commonStyles =
    "min-h-[70px] px-4 py-3 text-white flex justify-center items-center border-[2px] border-gray-700 hover:border-blue-500 transition-all duration-300 rounded-lg shadow-md";

  return (
    <div
      id="Market"
      className="flex w-full justify-center items-center bg-gradient-to-br from-gray-900 via-black to-gray-800 min-h-screen p-6"
    >
      <div className="flex flex-col md:flex-row items-center justify-between max-w-7xl w-full gap-10">
        {/* Left Section */}
        <div className="flex flex-1 flex-col items-start text-center md:text-left">
          <h1 className="text-4xl sm:text-5xl md:text-6xl text-white font-extrabold mb-6 leading-tight">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500">
              Send Crypto
            </span>
            <br /> Across the World
          </h1>
          <p className="mb-8 text-gray-300 font-light text-lg md:text-xl max-w-md">
            Explore the future of finance. Transact securely and instantly on
            Krypto with minimal fees.
          </p>
          <button
            onClick={connectWallet}
            className={`inline-flex items-center justify-center px-6 py-3 rounded-full text-white font-semibold text-lg transition-all duration-300 ${
              currentAccount
                ? "bg-green-600 hover:bg-green-700"
                : "bg-blue-600 hover:bg-blue-800"
            }`}
          >
            {currentAccount ? (
              <>
                <span className="mr-2">✓</span> Wallet Connected
              </>
            ) : (
              "Connect Wallet"
            )}
          </button>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 w-full mt-12">
            {[
              "Reliability",
              "Security",
              "Ethereum",
              "Web 3.0",
              "Low Fees",
              "Blockchain",
            ].map((item) => (
              <div key={item} className={commonStyles}>
                {item}
              </div>
            ))}
          </div>
        </div>

        {/* Right Section */}
        <div className="flex flex-1 flex-col w-full max-w-md">
          {/* Ethereum Card */}
          <div className="p-6 flex flex-col justify-between rounded-2xl h-52 bg-gradient-to-br from-blue-900 to-purple-900 hover:from-blue-800 hover:to-purple-800 transition-all duration-500 shadow-lg">
            <div className="flex justify-between items-center">
              <div className="h-12 w-12 rounded-full border-2 border-white flex justify-center items-center bg-black/40 backdrop-blur-md">
                <SiEthereum fontSize={24} color="white" />
              </div>
              <div className="p-2 bg-black/40 rounded-full backdrop-blur-md cursor-pointer hover:bg-black/60 transition-colors">
                <BsInfoCircle
                  fontSize={18}
                  color="white"
                  title="Ethereum Info"
                />
              </div>
            </div>
            <div>
              <p className="text-white font-light text-sm truncate max-w-[80%]">
                {currentAccount
                  ? shortenAddress(currentAccount)
                  : "Connect your wallet"}
              </p>
              <p className="text-white font-bold text-xl mt-1">Ethereum</p>
              {currentAccount && (
                <p className="text-green-400 text-sm mt-2">Connected ✓</p>
              )}
            </div>
          </div>

          {/* Transaction Form */}
          <div
            id="Exchange"
            className="p-6 mt-6 flex flex-col gap-5 bg-gray-900/90 backdrop-blur-md rounded-2xl shadow-xl border border-gray-800"
          >
            <h2 className="text-white text-2xl font-semibold">
              Send Transaction
            </h2>
            {[
              {
                id: "addressTo",
                placeholder: "Recipient Address",
                type: "text",
              },
              {
                id: "amount",
                placeholder: "Amount (ETH)",
                type: "number",
                step: "0.0001",
              },
              { id: "keyword", placeholder: "Keyword (for GIF)", type: "text" },
              { id: "message", placeholder: "Message", type: "text" },
            ].map(({ id, placeholder, type, step }) => (
              <div key={id} className="relative">
                <input
                  id={id}
                  name={id}
                  placeholder={placeholder}
                  type={type}
                  step={step}
                  value={formData[id as keyof typeof formData]}
                  onChange={handleChange}
                  className="w-full rounded-lg p-3 bg-gray-800 text-white border border-gray-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all duration-300 text-sm placeholder-gray-500 peer"
                />
                <label
                  htmlFor={id}
                  className="absolute -top-2 left-3 text-xs text-gray-400 bg-gray-900 px-1 peer-focus:text-blue-500 transition-all duration-300"
                >
                  {placeholder}
                </label>
              </div>
            ))}
            {error && (
              <div className="p-2 bg-red-500/10 border border-red-500 text-red-400 text-sm rounded-lg text-center">
                {error}
              </div>
            )}
            <button
              onClick={handleSubmit}
              disabled={!currentAccount || isLoading}
              className="w-full px-6 py-3 mt-2 rounded-lg text-white font-semibold text-base bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 disabled:from-gray-600 disabled:to-gray-600 disabled:opacity-70 transition-all duration-300 flex items-center justify-center"
            >
              {isLoading ? (
                <>
                  <Loader size="small" color="white" />
                  Processing...
                </>
              ) : currentAccount ? (
                "Send Now"
              ) : (
                "Connect Wallet to Send"
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Welcome;
