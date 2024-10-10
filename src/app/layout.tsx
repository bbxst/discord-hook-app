import type { Metadata } from "next";
import { Prompt } from "next/font/google";

import { Provider } from "@/components/provider";
import Header from "@/components/header";

import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const prompt = Prompt({
  subsets: ["thai"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "Heidi Guild",
  description: "Party management app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${prompt.className} antialiased`}>
        <Provider
          enableSystem
          attribute="class"
          defaultTheme="dark"
          disableTransitionOnChange
        >
          <Header />
          {children}
          <footer className="px-6 py-6 border-t bg-card">
            <p className="text-sm text-muted-foreground">
              © 2024 Heidi Guild. All rights reserved.
            </p>
          </footer>
          <Toaster />
        </Provider>
      </body>
    </html>
  );
}
