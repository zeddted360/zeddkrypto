"use client"
import { useState, useEffect } from "react";
import {
  Loader,
  Navbar,
  Services,
  Transactions,
  Welcome,
  Footer,
} from "../components";

const App = () => {
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="h-screen w-full flex flex-col justify-center items-center bg-gradient-to-b from-gray-900 to-black">
        <Loader size="large" color="blue" />
        <p className="text-white mt-6 text-xl font-light">
          Initializing Krypto...
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <div className="gradient-bg-welcome flex-1">
        <Navbar />
        <div className="md:pt-20 pt-25">
          {/* Add padding top to account for fixed navbar */}
          <Welcome />
        </div>
      </div>

      <section
        id="services"
        className="w-full py-16 bg-gradient-to-b from-gray-900 to-black"
      >
        <Services />
      </section>

      <section id="transactions" className="w-full py-16 bg-black">
        <Transactions />
      </section>

      <Footer />
    </div>
  );
};

export default App;
