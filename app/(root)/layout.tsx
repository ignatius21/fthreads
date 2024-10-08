import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css";
import Topbar from "@/components/shared/Topbar";
import Bottombar from "@/components/shared/Bottombar";
import Leftsidebar from "@/components/shared/Leftsidebar";
import { ClerkProvider } from "@clerk/nextjs";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "F-Threads",
  description: "A chat app for family threads",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={inter.className}>
          <Topbar />
          <main className="flex flex-row">
            <Leftsidebar />
            <section className="main-container">
              <div className="w-full max-w-4xl">{children}</div>
            </section>
          </main>
          <Bottombar />
        </body>
      </html>
      </ClerkProvider>
  );
}
