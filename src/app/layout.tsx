import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import Contact from "@/components/Backoffice/Contact";
import ReactQuery from "@/provider/TanstackQuery";
import Footer from "@/components/Layout/Footer";
const inter = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});
import Announce from "@/components/Layout/Announce";

export const metadata: Metadata = {
  title: "East Land Bali",
  description: "East Land Bali Website",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ReactQuery>
          <Announce />
          <Contact />
          {children}
          <Footer />
        </ReactQuery>
      </body>
    </html>
  );
}
