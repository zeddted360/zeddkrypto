import Image from "next/image";
import Link from "next/link";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full py-8 gradient-bg-footer text-white">
      <div className="container mx-auto px-4">
        {/* Main Footer Content */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-8">
          {/* Logo Section */}
          <div className="mb-6 md:mb-0">
            <Image
              src="/tron-trx-logo.png"
              alt="Tron Logo"
              className="hover:opacity-80 transition-opacity"
              width={70}
              height={70}
              quality={100}
              priority
            />
          </div>

          {/* Navigation Links */}
          <div className="flex flex-wrap justify-center gap-6 mb-6 md:mb-0">
            <Link
              href="#markets"
              className="text-white hover:text-gray-300 transition-colors text-base font-medium"
            >
              Markets
            </Link>
            <Link
              href="#exchange"
              className="text-white hover:text-gray-300 transition-colors text-base font-medium"
            >
              Exchange
            </Link>
            <Link
              href="#tutorial"
              className="text-white hover:text-gray-300 transition-colors text-base font-medium"
            >
              Tutorial
            </Link>
            <Link
              href="#login"
              className="text-white hover:text-gray-300 transition-colors text-base font-medium"
            >
              Login
            </Link>
          </div>

          {/* Contact Info */}
          <div className="text-center md:text-right">
            <h3 className="text-lg font-semibold mb-2">Connect With Us</h3>
            <p className="text-gray-300 text-sm">info@zeddico.com</p>
          </div>
        </div>

        {/* Divider */}
        <div className="w-full h-[0.5px] bg-gray-400 my-6"></div>

        {/* Copyright Section */}
        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-300 text-sm mb-2 md:mb-0">
            &copy; {currentYear} zeddmastery. All rights reserved.
          </p>
          <div className="flex gap-4 text-sm text-gray-300">
            <Link href="#" className="hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <Link href="#" className="hover:text-white transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
