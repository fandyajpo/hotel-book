import BlogList from "@/components/Blog/BlogList";
import Back from "@/components/Layout/Back";
import Layer from "@/components/Layout/Layer";
import { Metadata } from "next";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.eastlandbali.my.id/blog"),
  title: "Blog | East Land Bali",
  description:
    "East Land Bali, situated on the island's eastern shores, is a captivating destination boasting pristine white beaches, lush hills, and a rich cultural tapestry. Ideal for divers, its crystal-clear waters showcase vibrant marine life, while traditional villages offer insights into Bali's heritage through unique architecture and local traditions. Explore the beauty of nature and culture in this hidden gem, East Land Bali.",
  openGraph: {
    title: "Blog | East Land Bali",
    description:
      "East Land Bali, situated on the island's eastern shores, is a captivating destination boasting pristine white beaches, lush hills, and a rich cultural tapestry. Ideal for divers, its crystal-clear waters showcase vibrant marine life, while traditional villages offer insights into Bali's heritage through unique architecture and local traditions. Explore the beauty of nature and culture in this hidden gem, East Land Bali.",
  },
  twitter: {
    title: "Blog | East Land Bali",
    description:
      "East Land Bali, situated on the island's eastern shores, is a captivating destination boasting pristine white beaches, lush hills, and a rich cultural tapestry. Ideal for divers, its crystal-clear waters showcase vibrant marine life, while traditional villages offer insights into Bali's heritage through unique architecture and local traditions. Explore the beauty of nature and culture in this hidden gem, East Land Bali.",
  },
};

const Blogs = () => {
  return (
    <div className="flex justify-center w-full space-y-8">
      <Layer isMiddle>
        <div className="space-y-8">
          <Back />
          <BlogList />
        </div>
      </Layer>
    </div>
  );
};

export default Blogs;
