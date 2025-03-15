import type { Metadata } from "next";
import "./globals.css";
import { ReactNode } from "react";
import Provider from "@/components/Provider";

export const metadata: Metadata = {
  title: "Zedd Krypto",
  description: "Send crypto transactions with ease.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <Provider>
        <body className={`antialiased`}>{children}</body>
      </Provider>
    </html>
  );
}
