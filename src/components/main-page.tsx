import CryptoList from "./crypto-list";
import HeroSection from "./News/hero-section";

export const MainPage: React.FC<{}> = async () => {
  return (
    <main>
      <div className="bg-slate-700 p-5">
        <HeroSection />
      </div>
      <CryptoList />
    </main>
  );
};
