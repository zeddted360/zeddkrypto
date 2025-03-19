"use client";
import { HiMenuAlt4 } from "react-icons/hi";
import { AiOutlineClose } from "react-icons/ai";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import useTransaction from "@/hooks/useTransaction";

const Navbar = () => {
  const [toggleMenu, setToggleMenu] = useState<boolean>(false);
  const [activeItem, setActiveItem] = useState<string>("Market");
  const { connectWallet, currentAccount } = useTransaction();

  const NavbarItem = ({
    title,
    classProps,
  }: {
    title: string;
    classProps?: string;
  }) => {
    const isActive = activeItem === title;
    return (
      <Link
        href={`#${title}`}
        className={`cursor-pointer hover:text-blue-400 transition-colors duration-300 ${
          isActive ? "text-blue-400 font-semibold" : "text-gray-300"
        } ${classProps || ""}`}
        onClick={() => setActiveItem(title)}
      >
        {title}
      </Link>
    );
  };

  const handleToggleMenu = () => {
    setToggleMenu(!toggleMenu);
  };

  // Prevent body scrolling when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = toggleMenu ? "hidden" : "auto";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [toggleMenu]);

  return (
    <nav className="fixed top-0 left-0 w-full z-50 flex justify-between items-center px-6 py-4 bg-gray-900/95 backdrop-blur-md shadow-md text-white">
      {/* Logo Section */}
      <div className="flex items-center space-x-3">
        <Image
          src="/tron-trx-logo.png"
          alt="Zeddkrypto Logo"
          width={50}
          height={50}
          quality={100}
          priority
          className="cursor-pointer rounded-full"
        />
        <span className="text-2xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
          Zeddkrypto
        </span>
      </div>

      {/* Desktop Navigation */}
      <ul className="hidden md:flex items-center space-x-8">
        {["Market", "Exchange", "Wallets", "Tutorials"].map((item) => (
          <li key={item}>
            <NavbarItem title={item} />
          </li>
        ))}
        {!currentAccount && (
          <li>
            <button
              onClick={connectWallet}
              className="px-6 py-2 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold transition-all duration-300 shadow-md"
            >
              Login
            </button>
          </li>
        )}
      </ul>

      {/* Mobile Menu Toggle */}
      <div className="md:hidden">
        <HiMenuAlt4
          fontSize={28}
          onClick={handleToggleMenu}
          className={`cursor-pointer hover:text-blue-400 transition-colors duration-300 ${
            toggleMenu ? "hidden" : "block"
          }`}
        />
      </div>

      {/* Mobile Navigation */}
      {toggleMenu && (
        <div className="fixed inset-0 bg-black/80 z-40 md:hidden">
          <div className="fixed top-0 right-0 w-4/5 max-w-sm h-screen bg-gray-900 border-l border-gray-800 shadow-2xl p-6 flex flex-col">
            <div className="flex justify-end mb-8">
              <AiOutlineClose
                fontSize={28}
                onClick={handleToggleMenu}
                className="cursor-pointer hover:text-blue-400 transition-colors duration-300"
              />
            </div>
            <ul className="flex flex-col gap-6">
              {["Market", "Exchange", "Wallets", "Tutorials"].map((item) => (
                <li key={item}>
                  <NavbarItem
                    title={item}
                    classProps="block py-3 px-4 text-lg hover:bg-gray-800 rounded-lg transition-colors duration-300 w-full"
                  />
                </li>
              ))}
            </ul>
            {!currentAccount && (
              <button
                onClick={() => {
                  connectWallet();
                  setToggleMenu(false);
                }}
                className="mt-10 w-full px-6 py-3 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold transition-all duration-300 shadow-md"
              >
                Login
              </button>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
