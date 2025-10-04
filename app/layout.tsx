import { Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";
import { Inter } from "next/font/google";
import "./globals.css";

import Nav from "@/components/Nav/Nav";
import { ThemeProvider } from "@/components/theme-provider";
import Footer from "@/components/page/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "D.P.F.L.G",
  description: "DISTRICT PREFECTORAL DE FOOTBALL LOME-GOLFE",
  icons: "/LOGO.png",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html className="h-full" suppressHydrationWarning>
      <body
          className={`${inter.className} flex flex-col min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white`}
        >
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            themes={["light", "dark"]}
            enableSystem
            disableTransitionOnChange
          >
            <Nav />
            <main className="flex-1">{children}</main>
            <Footer />
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
