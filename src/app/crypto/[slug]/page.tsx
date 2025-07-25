import { getCoinDataBySlug, getCoinsLogo } from "@/lib/api";
import { LatestCrypto, LatestListings } from "@/lib/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const slug = (await params).slug;
  const coinData: LatestCrypto | undefined = await getCoinDataBySlug(slug);

  console.log("Coin data for slug:", slug, coinData);
  console.log("Coin data for slug quote:", slug, coinData?.quote);

  if (!coinData) {
    return (
      <div className="container mx-auto py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold">Coin not found</h1>
          <Link href="/" className="text-blue-500 hover:underline">
            Back to home
          </Link>
        </div>
      </div>
    );
  }

  const logoData = await getCoinsLogo([coinData.id]);
  const price = coinData.quote.USD.price;
  const percentChange24h = coinData.quote.USD.percent_change_24h;

  return (
    <div className="container mx-auto py-8">
      <Link
        href="/"
        className="text-blue-500 hover:underline mb-4 inline-block"
      >
        ← Back to home
      </Link>

      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <div className="flex items-center gap-4">
            {logoData ? (
              <Image
                src={logoData[coinData.id].logo}
                alt={coinData.name}
                width={60}
                height={60}
                className="rounded-full"
              />
            ) : (
              <div className="w-12 h-12 rounded-full bg-slate-400" />
            )}
            <div>
              <CardTitle className="text-2xl">
                {coinData.name} ({coinData.symbol.toUpperCase()})
              </CardTitle>
              <p className="text-muted-foreground">Rank #{coinData.id}</p>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold mb-2">Price Information</h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Current Price:</span>
                  <span className="font-medium">
                    $
                    {price.toLocaleString(undefined, {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">24h Change:</span>
                  <span
                    className={`font-medium ${
                      percentChange24h >= 0 ? "text-green-500" : "text-red-500"
                    }`}
                  >
                    {percentChange24h >= 0 ? "+" : ""}
                    {percentChange24h.toFixed(2)}%
                  </span>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-2">Market Information</h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Slug:</span>
                  <span className="font-medium">{coinData.slug}</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
