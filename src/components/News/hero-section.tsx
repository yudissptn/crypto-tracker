import { getCryptoNews } from "@/lib/api";
import Hero from "./hero";

const HeroSection = async () => {
  const newsData = await getCryptoNews();
  if (!newsData) {
    return (
      <h2 className="text-white text-2xl pl-8 pt-14 font-bold">
        Oops.. Something went wrong
      </h2>
    );
  }

  return <Hero newsData={newsData} />;
};

export default HeroSection;
