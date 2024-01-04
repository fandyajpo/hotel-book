"use client";
import Image from "next/image";
import WA from "../../../public/whatsapp.png";
import Link from "next/link";
const Contact = () => {
  return (
    <div className="fixed bottom-8 right-8">
      <div className="w-10 h-10">
        <Link
          href={`https://web.whatsapp.com/send/?phone=%2B6287759205806&text=Hello%2C%20I%20would%20like%20to%20ask&type=phone_number&app_absent=0
`}
        >
          <Image src={WA} alt="whatsapp_contact" />
        </Link>
      </div>
    </div>
  );
};

export default Contact;
