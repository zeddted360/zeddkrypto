"use client"
import { HiMenuAlt4 } from "react-icons/hi";
import { AiOutlineClose } from "react-icons/ai";
import { JSX, useState, useEffect } from "react";
import Image from "next/image";

const Navbar = () => {
  const [toggleMenu, setToggleMenu] = useState<boolean>(false);
  const [activeItem, setActiveItem] = useState<string>("Market");

  const NavbarItem = ({
    title,
    classProps,
  }: {
    title: string;
    classProps: string;
  }): JSX.Element => {
    const isActive = activeItem === title;
    return (
      <li
        className={`cursor-pointer mx-4 hover:text-blue-400 transition-colors duration-200 ${classProps} ${
          isActive ? "text-blue-400" : ""
        }`}
        onClick={() => setActiveItem(title)}
      >
        {title}
      </li>
    );
  };

  const handleToggleMenu = () => {
    setToggleMenu(!toggleMenu);
  };

  // Prevent body scrolling when mobile menu is open
  useEffect(() => {
    if (toggleMenu) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [toggleMenu]);

  return (
    <nav className="p-4 fixed w-full z-50 flex md:justify-around justify-between items-center text-white bg-gray-900">
      <div className="flex justify-start items-center">
        <Image
          src="/tron-trx-logo.png"
          alt="logo"
          className="cursor-pointer"
          width={70}
          height={70}
          quality={100}
          priority
        />
        <span className="ml-2 text-xl font-bold">Zeddkrypto</span>
      </div>

      {/* desktop nav */}
      <ul className="hidden md:flex justify-center items-center gap-2">
        {["Market", "Exchange", "Wallets", "Tutorials"].map((item, index) => (
          <NavbarItem key={item + index} title={item} classProps="" />
        ))}
        <li className="bg-blue-600 hover:bg-blue-700 text-blue-100 px-6 py-2 rounded-lg cursor-pointer ml-6 transition-colors duration-200">
          Login
        </li>
      </ul>

      {/* Mobile menu button */}
      <div className="md:hidden relative z-50">
        {!toggleMenu && (
          <HiMenuAlt4
            fontSize={28}
            onClick={handleToggleMenu}
            className="cursor-pointer text-white hover:text-blue-400 transition-colors duration-200"
          />
        )}
      </div>

      {/* mobile nav */}
      {toggleMenu && (
        <div className="fixed md:hidden inset-0 bg-black/80 z-40">
          <ul
            className="fixed top-0 right-0 p-6 w-[70vw] h-screen
              flex flex-col items-start justify-start gap-6 
              shadow-2xl text-white
              bg-gray-900 border-l border-gray-800
              "
          >
            <li className="w-full flex justify-end mb-6">
              <AiOutlineClose
                fontSize={28}
                className="cursor-pointer hover:text-blue-400 transition-colors duration-200"
                onClick={handleToggleMenu}
              />
            </li>

            {["Market", "Exchange", "Wallets", "Tutorials"].map(
              (item, index) => (
                <NavbarItem
                  key={item + index}
                  title={item}
                  classProps="my-2 text-lg w-full p-2 hover:bg-gray-800 rounded-md"
                />
              )
            )}

            <li className="bg-blue-600 hover:bg-blue-700 text-blue-100 px-4 py-3 rounded-lg cursor-pointer w-full text-center mt-8 transition-colors duration-200">
              Login
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
