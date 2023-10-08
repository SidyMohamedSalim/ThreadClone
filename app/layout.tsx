import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { clsx } from "clsx";
import ThemeProviders from "../src/theme/ThemeProvider";
import Header from "@/src/feature/layout/Header";
import Footer from "@/src/feature/layout/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={clsx(inter.className, "bg-background h-full")}>
        <ThemeProviders attribute="class" defaultTheme="system" enableSystem>
          <div className="flex flex-col h-full">
            <Header />
            <div className="flex-1 max-w-lg m-auto py-12 w-full">
              {children}
            </div>
            <Footer />
          </div>
        </ThemeProviders>
      </body>
    </html>
  );
}