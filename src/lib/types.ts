export type LatestListings = {
  id: number;
  name: string;
  symbol: string;
  slug: string;
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

export type CryptoNewsAPI = {
  data: NewsListType[];
  nextPageString: string;
};

export type NewsListType = {
  article_id: number;
  title: string;
  image_url: string;
  link: string;
};

export type GlobalMetricsAPI = {
  eth_dominance: number;
  btc_dominance: number;
  eth_dominance_yesterday: number;
  btc_dominance_yesterday: number;
  eth_dominance_24h_percentage_change: number;
  btc_dominance_24h_percentage_change: number;
};

export type LatestCrypto = {
  id: number;
  name: string;
  symbol: string;
  slug: string;
  num_market_pairs: number;
  date_added: string;
  tags: string[];
  max_supply: number;
  circulating_supply: number;
  total_supply: number;
  is_active: number;
  infinite_supply: boolean;
  platform: string | null;
  cmc_rank: number;
  is_fiat: number;
  self_reported_circulating_supply: string | null;
  self_reported_market_cap: string | null;
  tvl_ratio: string | null;
  last_updated: string;
  quote: {
    USD: {
      price: number;
      percent_change_24h: number;
    };
  };
};
