import { getCoinsData, getCoinsLogo } from "@/lib/api"
import { LatestListings } from "@/lib/types"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "./ui/card"
import Image from 'next/image'

const CryptoList = async () => {
    const data = await getCoinsData()
    const logosData = await getCoinsLogo(data!.map((e) => e.id))
    return <div className="flex flex-wrap gap-2 mx-auto max-w-screen-xl p-3">
        {data && data.map((e: LatestListings) => {
            const price = (+e.quote["USD"].price.toPrecision(3)).toLocaleString('en-US')
            return <Card className={`min-w-60 border-l-4 ${e.quote["USD"].percent_change_24h >= 0 ? "border-cyan-400" : "border-rose-500"}`} key={e.id}>
                <CardContent>
                    <CardHeader className="pl-0">
                        <div className="flex gap-3">
                            {logosData ? <Image
                                alt={e.name}
                                src={logosData[e.id].logo}
                                width={40}
                                height={0}
                                className="w-10 h-auto"
                            /> : <div className="w-10 h-10 rounded-full bg-slate-400" />}
                            <div>
                                <CardTitle className="font-medium">{e.name}</CardTitle>
                                <CardDescription className="text-muted-foreground text-sm">{e.symbol}</CardDescription>
                            </div>
                        </div>
                    </CardHeader>
                    <div className="flex justify-between">
                        <div>
                            <div className="text-muted-foreground text-sm">Price</div>
                            <div className="font-medium">${price}</div>
                        </div>
                        <div>
                            <div className="text-muted-foreground text-sm">24H Change</div>
                            <div
                                className={`font-medium text-right ${e.quote["USD"].percent_change_24h >= 0 ? "text-green-500" : "text-red-500"
                                    }`}
                            >
                                {e.quote["USD"].percent_change_24h.toFixed(2)}%
                            </div>
                        </div>

                    </div>
                </CardContent>
            </Card>
        })}

    </div>
}

export default CryptoList