import PlausibleProvider from "next-plausible";
import { Inter } from "next/font/google";
import Toaster from "@/components/toast";
import ReduxProvider from "@/redux/provider";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { generateSharedMetaData } from "./sharedMeta/sharedMeta";
import "react-toastify/dist/ReactToastify.css";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

const meta = {
  title: "DevResources",
  link: "https://www.devresources.info/",
  description: "One place information for all the events, across the globe",
};

export const metadata = generateSharedMetaData(meta);

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/images/favicon-devresources-16.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/images/favicon-devresources-32.png"
        />
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
