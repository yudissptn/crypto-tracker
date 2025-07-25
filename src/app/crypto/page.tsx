import BtcDominance from "@/components/MarketOverview/btc-dominance";
import { globalMarketData } from "@/lib/api";

export default async function Page() {
  const globalMarket = await globalMarketData();
  console.log(globalMarket);
  if (!globalMarket) return null;
  return <BtcDominance {...globalMarket} />;
}
