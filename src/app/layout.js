import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navbar";
import ReduxProvider from "@/redux/provider";
import Footer from "@/components/footer";
import "react-toastify/dist/ReactToastify.css";
import Toaster from "@/components/toast";
import PlausibleProvider from "next-plausible";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "DevResources",
  description: "One place information for all the events, across the globe",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <PlausibleProvider domain="devresources.info" />
      </head>
      <body className={inter.className}>
        <ReduxProvider>
          <Navbar />
          <Toaster />
          <div className="min-h-screen p-5 sm:p-10 pb-[15px] sm:pb-[20px] pt-[46px] sm:pt-[51px] lg:p-[80px] lg:pb-[50px] overflow-hidden">
            {children}
          </div>
          <Footer />
        </ReduxProvider>
      </body>
    </html>
  );
}
