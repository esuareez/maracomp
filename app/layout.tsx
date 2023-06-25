import "./globals.css";
import { Inter } from "next/font/google";
import { Metadata } from "next";
import Navbar from "@/components/navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "MaraComp | ",
  description: "Venta de computadoras y accesorios",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body>
        <div className="flex flex-col h-screen">
          <Navbar></Navbar>
          {children}
        </div>
      </body>
    </html>
  );
}
