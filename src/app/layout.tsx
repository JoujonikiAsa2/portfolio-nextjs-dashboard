import type { Metadata } from "next";
import "./globals.css";
import { sora } from "./font";
import { Toaster } from "sonner";
import ReduxProvider from "@/provider/ReduxProvider";

export const metadata: Metadata = {
  title: "Admin Dashboard | Joujoniki",
  description: "Portfolio data management",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${sora.className} antialiased`}>
        <ReduxProvider>
          <Toaster />
          {children}
        </ReduxProvider>
      </body>
    </html>
  );
}
