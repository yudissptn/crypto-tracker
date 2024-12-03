import { getCryptoNews } from "@/lib/api"

const HeroSection = async () => {
    const newsList = await getCryptoNews()
    if (!newsList) {
        return <h2 className="text-white text-2xl pl-8 pt-14 font-bold">Oops.. Something went wrong</h2>
    }
    console.log(newsList)
    return <>{newsList.map((e) => <h2 key={e.title} className="text-white text-md pl-8 pt-14 font-bold">{e.title}</h2>)}</>
}

export default HeroSection