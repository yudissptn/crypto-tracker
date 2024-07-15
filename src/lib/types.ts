export type LatestListings = {
  id: number;
  name: string;
  symbol: string;
  quote: {
    USD: {
      price: number;
      percent_change_24h: number;
    };
  };
};

export type CoinDetails = {
  [id: string]: {
    logo: string;
  };
};
