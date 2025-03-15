import { BsShieldFillCheck } from "react-icons/bs";
import { BiSearchAlt } from "react-icons/bi";
import { RiHeart2Fill } from "react-icons/ri";
import { JSX } from "react";

interface IServiceprops {
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
  }: IServiceprops): JSX.Element => {
    return (
      <div className="flex-row flex justify-start items-center p-6 rounded-2xl bg-white/5 backdrop-blur-sm hover:bg-white/10 transition-all duration-300 ease-in-out hover:scale-105 cursor-pointer">
        <div
          className={`w-12 h-12 rounded-full flex justify-center items-center ${color} shadow-lg`}
        >
          {icon}
        </div>
        <div className="ml-6 flex flex-col flex-1">
          <h1 className="text-white text-xl font-semibold">{title}</h1>
          <p className="mt-2 text-gray-300 text-base leading-relaxed">
            {subtitle}
          </p>
        </div>
      </div>
    );
  };

  return (
    <div className="flex justify-center flex-col md:flex-row items-center w-full gradient-bg-services py-20">
      <div className="flex flex-col items-center justify-between md:p-20 md:flex-row py-12 px-4">
        <div className="flex flex-col flex-1 justify-start items-start">
          <h1 className="text-white text-4xl sm:text-6xl font-bold py-2 text-gradient leading-tight">
            Services that we
            <br />
            continue to improve
          </h1>
          <p className="mt-6 text-gray-300 text-lg max-w-xl">
            Experience the best of our services with enhanced security,
            competitive rates, and lightning-fast transactions.
          </p>
        </div>
      </div>
      <div className="flex-1 flex flex-col justify-start items-center space-y-6 px-4 md:px-0">
        <ServiceCard
          title="Security Guaranteed"
          subtitle="Your security is our top priority. We implement state-of-the-art encryption and security measures to protect your assets and transactions."
          color="bg-[#2952E3]"
          icon={<BsShieldFillCheck fontSize={24} className="text-white" />}
        />
        <ServiceCard
          title="Best Exchange Rates"
          subtitle="Get the most competitive rates in the market. We continuously monitor and update our rates to ensure you get the best value for your transactions."
          color="bg-[#8945F8]"
          icon={<BiSearchAlt fontSize={24} className="text-white" />}
        />
        <ServiceCard
          title="Fastest Transactions"
          subtitle="Experience lightning-fast transactions with our optimized network. Your transfers are processed in seconds, not hours."
          color="bg-[#F84550]"
          icon={<RiHeart2Fill fontSize={24} className="text-white" />}
        />
      </div>
    </div>
  );
};

export default Services;
