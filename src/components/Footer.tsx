"use client";
import Image from "next/image";
import Link from "next/link";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full py-12 bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white border-t border-gray-800">
      <div className="container mx-auto px-6 max-w-7xl">
        {/* Main Footer Content */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-12 mb-10">
          {/* Logo Section */}
          <div className="flex items-center space-x-4">
            <Image
              src="/tron-trx-logo.png"
              alt="Zeddico Logo"
              width={60}
              height={60}
              quality={100}
              priority
              className="rounded-full hover:opacity-90 transition-opacity duration-300"
            />
            <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
              Zeddico
            </span>
          </div>

          {/* Navigation Links */}
          <div className="flex flex-wrap justify-center gap-8">
            {[
              { href: "#markets", label: "Markets" },
              { href: "#exchange", label: "Exchange" },
              { href: "#tutorial", label: "Tutorial" },
              { href: "#login", label: "Login" },
            ].map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className="text-gray-300 hover:text-blue-400 transition-colors duration-300 text-base font-medium"
              >
                {label}
              </Link>
            ))}
          </div>

          {/* Contact Info */}
          <div className="text-center md:text-right">
            <h3 className="text-lg font-semibold text-white mb-3">
              Connect With Us
            </h3>
            <p className="text-gray-400 text-sm hover:text-gray-300 transition-colors duration-300 cursor-pointer">
              info@zeddico.com
            </p>
          </div>
        </div>

        {/* Divider */}
        <div className="w-full h-px bg-gradient-to-r from-transparent via-gray-700 to-transparent my-8" />

        {/* Copyright Section */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 text-sm">
          <p className="text-gray-400">
            © {currentYear} Zeddico. All rights reserved.
          </p>
          <div className="flex gap-6">
            <Link
              href="#"
              className="text-gray-400 hover:text-blue-400 transition-colors duration-300"
            >
              Privacy Policy
            </Link>
            <Link
              href="#"
              className="text-gray-400 hover:text-blue-400 transition-colors duration-300"
            >
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
