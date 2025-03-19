"use client";
import { BsShieldFillCheck } from "react-icons/bs";
import { BiSearchAlt } from "react-icons/bi";
import { RiHeart2Fill } from "react-icons/ri";
import { JSX } from "react";

interface IServiceProps {
  title: string;
  subtitle: string;
  color: string;
  icon: JSX.Element;
}

const Services = () => {
  const ServiceCard = ({
    title,
    subtitle,
    color,
    icon,
  }: IServiceProps): JSX.Element => {
    return (
      <div className="flex flex-row items-center p-6 rounded-2xl bg-white/10 backdrop-blur-md border border-gray-800 hover:bg-white/20 hover:shadow-xl transition-all duration-300 ease-in-out transform hover:scale-105 cursor-pointer max-w-lg w-full">
        <div
          className={`w-14 h-14 rounded-full flex justify-center items-center ${color} shadow-lg`}
        >
          {icon}
        </div>
        <div className="ml-6 flex flex-col flex-1">
          <h1 className="text-white text-xl font-semibold tracking-tight">
            {title}
          </h1>
          <p className="mt-2 text-gray-400 text-base leading-relaxed line-clamp-3">
            {subtitle}
          </p>
        </div>
      </div>
    );
  };

  return (
    <div className="flex flex-col md:flex-row items-center justify-center w-full bg-gradient-to-br from-gray-900 via-black to-gray-800 py-16 px-6">
      <div className="flex flex-col md:flex-row items-center justify-between max-w-7xl w-full gap-12">
        {/* Left Section */}
        <div className="flex flex-col flex-1 items-start text-center md:text-left">
          <h1 className="text-white text-4xl sm:text-5xl md:text-6xl font-extrabold py-2 leading-tight">
            Services We
            <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500">
              Continuously Improve
            </span>
          </h1>
          <p className="mt-6 text-gray-300 text-lg md:text-xl max-w-md">
            Discover top-tier services with cutting-edge security, unbeatable
            rates, and instant transactions.
          </p>
        </div>

        {/* Right Section - Service Cards */}
        <div className="flex-1 flex flex-col justify-start items-center gap-6 w-full">
          <ServiceCard
            title="Security Guaranteed"
            subtitle="Your assets are safe with us. We use advanced encryption and robust security protocols to protect every transaction."
            color="bg-gradient-to-br from-blue-600 to-blue-400"
            icon={<BsShieldFillCheck fontSize={28} className="text-white" />}
          />
          <ServiceCard
            title="Best Exchange Rates"
            subtitle="Enjoy the most competitive rates available. Our system optimizes exchange values in real-time for maximum benefit."
            color="bg-gradient-to-br from-purple-600 to-purple-400"
            icon={<BiSearchAlt fontSize={28} className="text-white" />}
          />
          <ServiceCard
            title="Fastest Transactions"
            subtitle="Send and receive crypto in seconds. Our optimized network ensures lightning-fast processing times."
            color="bg-gradient-to-br from-red-600 to-red-400"
            icon={<RiHeart2Fill fontSize={28} className="text-white" />}
          />
        </div>
      </div>
    </div>
  );
};

export default Services;
