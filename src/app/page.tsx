import Background from "@/components/Landing/Background";
import Cta from "@/components/Landing/Cta";
import WhyUs from "@/components/Landing/WhyUs";
import TrustedBy from "@/components/Landing/TrustedBy";
import Testimo from "@/components/Landing/Testimo";
export default async function Home() {
  return (
    <main>
      <Background />
      <WhyUs />
      <Cta />
      <TrustedBy />
      <Testimo />
    </main>
  );
}
