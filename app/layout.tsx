import { ClerkProvider } from "@clerk/nextjs";
import { Inter } from "next/font/google";
import "./globals.css";

import Nav from "@/components/Nav/Nav";
import { ThemeProvider } from "@/components/theme-provider";
import Footer from "@/components/page/Footer";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html className="h-full" suppressHydrationWarning>
        <body
          className={`${inter.className} h-full bg-white dark:bg-gray-900 text-gray-900 dark:text-white`}
        >
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            themes={["light", "dark"]}
            enableSystem
            disableTransitionOnChange
          >
            <Nav />
            <main className="">{children}</main>
          </ThemeProvider>
          <Footer />
        </body>
      </html>
    </ClerkProvider>
  );
}
