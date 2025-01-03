import CryptoList from "./crypto-list";
import HeroSection from "./hero-section";

export const MainPage: React.FC<{}> = async () => {
    return <main>
        <div className="bg-slate-700 h-60">
            <h2 className="text-white text-2xl pl-8 pt-14 font-bold">Bitcoin Market -- Hero section</h2>
            <HeroSection />
        </div>
        <CryptoList />
    </main>
}