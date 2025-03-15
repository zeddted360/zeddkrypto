"use client";
import { useEffect, useState } from "react";

const MetaMaskMobileGuide: React.FC = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    // Only run on client side
    if (typeof window !== "undefined") {
      const mobileCheck =
        /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
          navigator.userAgent
            );
      setIsMobile(mobileCheck);
      // Show the banner if on mobile and no ethereum provider
      if (mobileCheck && !window.ethereum) {
        setShowBanner(true);
      }
    }
  }, []);

  const handleOpenMetaMask = () => {
    if (typeof window !== "undefined") {
      const deepLink = `https://metamask.app.link/dapp/${window.location.host}${window.location.pathname}`;
      window.location.href = deepLink;
    }
  };

  if (!isMobile || !showBanner) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-yellow-100 p-4 border-t-2 border-yellow-300 z-50">
      <button
        className="absolute top-2 right-2 text-gray-600"
        onClick={() => setShowBanner(false)}
      >
        ✕
      </button>
      <h3 className="text-lg font-bold">Using MetaMask on Mobile?</h3>
      <p className="mb-3">
        For the best experience, open this website in the MetaMask app&apos;s
        browser.
      </p>
      <button
        onClick={handleOpenMetaMask}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Open in MetaMask
      </button>
    </div>
  );
};

export default MetaMaskMobileGuide;
