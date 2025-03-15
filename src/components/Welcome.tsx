"use client"
import { SiEthereum } from "react-icons/si";
import { BsInfoCircle } from "react-icons/bs";
import { ChangeEvent } from "react";
import { Loader } from "./";
import useTransaction from "../hooks/useTransaction";
import { shortenAddress } from "../../utils/shortenAddres";

const Welcome = () => {
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

    if (!(addressTo && amount && keyword && message)) return;

    await sendTransaction();
  };

  const commonStyles =
    "min-h-[70px] sm:px-4 px-2 py-3 text-white sm:min-w-[120px] flex justify-center items-center border-[2px] border-gray-700 hover:border-blue-500 transition-colors duration-300";

  return (
    <div className="flex w-full justify-center items-center bg-gradient-to-b from-gray-900 to-black min-h-screen p-4">
      <div className="flex flex-col md:flex-row items-start  justify-between max-w-6xl w-full gap-8">
        <div className="flex flex-1 justify-start flex-col md:mr-10">
          <h1 className="text-4xl sm:text-6xl text-white font-bold mb-6">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-600">
              Send Crypto
            </span>
            <br /> across the world
          </h1>
          <p className="text-left mb-8 text-gray-300 font-light w-11/12 md:w-9/12 text-lg">
            Explore the Crypto world. Buy and sell cryptocurrencies easily on
            Krypto with low fees and maximum security.
          </p>

          <button
            className={`flex justify-center items-center my-5 p-4 rounded-full cursor-pointer transition-all duration-300 ${
              currentAccount
                ? "bg-green-600 hover:bg-green-700"
                : "bg-blue-600 hover:bg-blue-700"
            }`}
            type="button"
            onClick={connectWallet}
          >
            <p className="text-base font-semibold text-white">
              {currentAccount ? "Wallet Connected ✓" : "Connect Wallet"}
            </p>
          </button>

          <div className="grid grid-cols-2 sm:grid-cols-3 w-full mt-10 mb-5 gap-2">
            <div className={`rounded-tl-2xl ${commonStyles}`}>Reliability</div>
            <div className={`${commonStyles}`}>Security</div>
            <div className={`rounded-tr-2xl ${commonStyles}`}>Ethereum</div>
            <div className={`rounded-bl-2xl ${commonStyles}`}>Web 3.0</div>
            <div className={`${commonStyles}`}>Low Fees</div>
            <div className={`rounded-br-2xl ${commonStyles}`}>Blockchain</div>
          </div>
        </div>

        <div className="flex flex-col flex-1 w-full max-w-md self-center ">
          <div className="p-5 flex flex-col justify-between rounded-xl h-48 sm:w-full my-5 eth-card bg-gradient-to-r from-blue-800 to-purple-800 hover:from-blue-700 hover:to-purple-700 transition-all duration-500 shadow-xl">
            <div className="flex justify-between items-start">
              <div className="h-10 w-10 rounded-full border-2 border-white flex justify-center items-center bg-black/30 backdrop-blur-sm">
                <SiEthereum fontSize={21} color="white" />
              </div>
              <div className="flex items-center bg-black/30 rounded-full p-2 backdrop-blur-sm cursor-help">
                <BsInfoCircle fontSize={17} color="white" />
              </div>
            </div>
            <div>
              <p className="text-white font-light text-sm">
                {currentAccount
                  ? `${shortenAddress(currentAccount)}`
                  : "Connect your wallet"}
              </p>
              <p className="text-white font-bold text-lg mt-1">Ethereum</p>
              {currentAccount && (
                <p className="text-green-300 text-sm mt-1">Connected</p>
              )}
             
            </div>
          </div>

          {/* form here */}
          <div className="p-6 w-full flex flex-col justify-start gap-y-2  items-center bg-gray-900/80 backdrop-blur-md rounded-xl shadow-xl border border-gray-800">
            <h2 className="text-white text-xl font-medium mb-6 self-start">
              Send Transaction
            </h2>

            <input
              id="addressTo"
              name="addressTo"
              placeholder="Recipient Address"
              type="text"
              value={formData.addressTo}
              onChange={handleChange}
              className="w-full rounded-lg p-3 outline-none bg-gray-800 text-white border border-gray-700 focus:border-blue-500 transition-colors duration-300 text-sm"
            />
            <input
              id="amount"
              name="amount"
              placeholder="Amount (ETH)"
              type="number"
              step="0.0001"
              value={formData.amount}
              onChange={handleChange}
              className="w-full rounded-lg p-3 outline-none bg-gray-800 text-white border border-gray-700 focus:border-blue-500 transition-colors duration-300 text-sm"
            />
            <input
              id="keyword"
              name="keyword"
              placeholder="Keyword (for GIF)"
              type="text"
              value={formData.keyword}
              onChange={handleChange}
              className="w-full rounded-lg p-3 outline-none bg-gray-800 text-white border border-gray-700 focus:border-blue-500 transition-colors duration-300 text-sm"
            />
            <input
              id="message"
              name="message"
              placeholder="Message"
              type="text"
              value={formData.message}
              onChange={handleChange}
              className="w-full rounded-lg p-3 outline-none bg-gray-800 text-white border border-gray-700 focus:border-blue-500 transition-colors duration-300 text-sm"
            />

            <div className="w-full mt-2">
              {isLoading ? (
                <div className="flex justify-center items-center py-3">
                  <Loader size="medium" color="blue" />
                  <span className="ml-3 text-white">
                    Processing transaction...
                  </span>
                </div>
              ) : (
                <button
                  onClick={handleSubmit}
                  disabled={!currentAccount}
                  className="text-white w-full px-6 py-3 text-base font-medium rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {currentAccount ? "Send Now" : "Connect Wallet to Send"}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Welcome;
