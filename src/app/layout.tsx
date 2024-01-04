import "./globals.css";
import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import Contact from "@/components/Backoffice/Contact";
import ReactQuery from "@/provider/TanstackQuery";
import Footer from "@/components/Layout/Footer";
import Announce from "@/components/Layout/Announce";
const inter = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.eastlandbali.my.id/"),
  title: "East Land Bali",
  description:
    "East Land Bali, situated on the island's eastern shores, is a captivating destination boasting pristine white beaches, lush hills, and a rich cultural tapestry. Ideal for divers, its crystal-clear waters showcase vibrant marine life, while traditional villages offer insights into Bali's heritage through unique architecture and local traditions. Explore the beauty of nature and culture in this hidden gem, East Land Bali.",
  openGraph: {
    title: "East Land Bali",
    description:
      "East Land Bali, situated on the island's eastern shores, is a captivating destination boasting pristine white beaches, lush hills, and a rich cultural tapestry. Ideal for divers, its crystal-clear waters showcase vibrant marine life, while traditional villages offer insights into Bali's heritage through unique architecture and local traditions. Explore the beauty of nature and culture in this hidden gem, East Land Bali.",
  },
  twitter: {
    title: "East Land Bali",
    description:
      "East Land Bali, situated on the island's eastern shores, is a captivating destination boasting pristine white beaches, lush hills, and a rich cultural tapestry. Ideal for divers, its crystal-clear waters showcase vibrant marine life, while traditional villages offer insights into Bali's heritage through unique architecture and local traditions. Explore the beauty of nature and culture in this hidden gem, East Land Bali.",
  },
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
