import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { TypographyH2 } from "@/components/ui/typography"

type LatestListings = {
  id: string;
  name: string;
  symbol: string;
  quote: {
    "USD": {
      price: number
    }
  }
}

const getCoinsData = async () => {
  try {
    const { data } = await fetch('https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest?limit=10', {
      headers: {
        'X-CMC_PRO_API_KEY': process.env.CMC_KEY || '',
      },
    }).then((res) => res.json())

    return data
  } catch (e) {
    console.error(e)
  }
}

export default async function Home() {
  const data = await getCoinsData()
  return (
    <>
      <header>
        <nav className="border-b bg-slate-50">
          <div className="mx-auto max-w-5xl px-2 sm:px-6 lg:px-8">
            <div className="relative flex h-16 items-center justify-between">
              <TypographyH2>Crypto Price</TypographyH2>
            </div>
          </div>
        </nav>
      </header>
      <main>
        <div className="flex flex-wrap gap-2 max-w-screen-xl p-3">
          {data.map((e: LatestListings) => {
            const price = (+e.quote["USD"].price.toPrecision(3)).toLocaleString('en-US')
            return <Card className="w-[350px]" key={e.id}>
              <CardHeader>
                <CardTitle>{e.name}</CardTitle>
                <CardDescription>{e.symbol}</CardDescription>
              </CardHeader>
              <CardContent>
                <TypographyH2>${price}</TypographyH2>
              </CardContent>
            </Card>
          })}

        </div>
      </main>
    </>
  );
}
