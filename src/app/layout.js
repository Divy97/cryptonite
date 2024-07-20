import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/header/NavigationBar";
import { StoreProvider } from "./StoreProvider";
import ErrorBoundary from "@/components/ErrorBoundary";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Cryptonite",
  description: "A crypto currency app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <StoreProvider>
          <Navbar />
          <ErrorBoundary>
            <div>{children}</div>
          </ErrorBoundary>
        </StoreProvider>
      </body>
    </html>
  );
}
