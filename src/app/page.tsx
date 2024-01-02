import Background from "@/components/Landing/Background";
import Cta from "@/components/Landing/Cta";
import WhyUs from "@/components/Landing/WhyUs";
export default async function Home() {
  return (
    <main>
      <Background />

      <WhyUs />
      <Cta />
    </main>
  );
}
