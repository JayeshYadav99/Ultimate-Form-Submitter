import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from  "@clerk/nextjs"
const inter = Inter({ subsets: ["latin"] });
import { Toaster } from "@/components/ui/toaster";
export const metadata: Metadata = {
  title: "Ai Tools App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
    <html lang="en">
      <body className={inter.className}>{children}
      <Toaster />
      </body>
    </html>
    
    </ClerkProvider>
  );
}
