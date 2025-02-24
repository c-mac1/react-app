import React from "react";
import type { Metadata } from "next";
import "./globals.css";
import "./styles/layout.css";
import { DataProvider } from "./context/DataContext";

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
    <body>
      <DataProvider>
      <header className="navbar">Price Data Dashboard</header>
      <main className="content">{children}</main>
      </DataProvider>
    </body>
  </html>
  );
}
