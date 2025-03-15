import type { Metadata } from "next";
import "./globals.css";
import { ReactNode } from "react";
import Provider from "@/components/Provider";
import MetaMaskMobileGuide from "@/components/MetamaskMobileGuide";

export const metadata: Metadata = {
  title: "Zedd Krypto",
  description: "Send crypto transactions with ease.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <Provider>
        <body className={`antialiased`}>
          {children}
          <MetaMaskMobileGuide />
        </body>
      </Provider>
    </html>
  );
}
