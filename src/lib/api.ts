import { CMC_API_HOST } from "./constants";
import {
  CoinDetails,
  CryptoNewsAPI,
  GlobalMetricsAPI,
  LatestCrypto,
  LatestListings,
} from "./types";

export const getCoinsData = async (): Promise<LatestListings[] | undefined> => {
  try {
    const { data } = await fetch(
      `${CMC_API_HOST}/v1/cryptocurrency/listings/latest?limit=10`,
      {
        headers: {
          "X-CMC_PRO_API_KEY": process.env.CMC_KEY || "",
          // Below headers needed as mentioned in CMC docs
          // https://coinmarketcap.com/api/documentation/v1/#section/Standards-and-Conventions
          Accept: "application/json",
          "Accept-Encoding": "deflate, gzip",
        },
        // Uncomment below to revalidate every 100s
        // https://nextjs.org/docs/app/api-reference/functions/fetch
        // next: { revalidate: 100 },
      }
    ).then((res) => res.json());

    return data;
  } catch (e) {
    console.error(e);
  }
};

export const getCoinDataBySlug = async (
  slug: string
): Promise<LatestCrypto | undefined> => {
  try {
    const response = await fetch(
      `${CMC_API_HOST}/v1/cryptocurrency/quotes/latest?slug=${slug}`,
      {
        headers: {
          "X-CMC_PRO_API_KEY": process.env.CMC_KEY || "",
          Accept: "application/json",
          "Accept-Encoding": "deflate, gzip",
        },
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();

    return Object.values(result.data)[0] as unknown as LatestCrypto;
  } catch (e) {
    console.error(e);
  }
};

export const getCoinsLogo = async (
  id: number[]
): Promise<CoinDetails | undefined> => {
  try {
    const { data } = await fetch(
      `${CMC_API_HOST}/v2/cryptocurrency/info?id=${id.join(",")}`,
      {
        headers: {
          "X-CMC_PRO_API_KEY": process.env.CMC_KEY || "",
          Accept: "application/json",
          "Accept-Encoding": "deflate, gzip",
        },
      }
    ).then((res) => res.json());

    return data;
  } catch (e) {
    console.error(e);
  }
};

export const globalMarketData = async (): Promise<
  GlobalMetricsAPI | undefined
> => {
  try {
    const { data } = await fetch(
      `${CMC_API_HOST}/v1/global-metrics/quotes/latest`,
      {
        headers: {
          "X-CMC_PRO_API_KEY": process.env.CMC_KEY || "",
          Accept: "application/json",
          "Accept-Encoding": "deflate, gzip",
        },
        // Uncomment below to revalidate every 100s
        // https://nextjs.org/docs/app/api-reference/functions/fetch
        // next: { revalidate: 100 },
      }
    ).then((res) => res.json());
    return data;
  } catch (e) {
    console.error(e);
  }
};

export const getCryptoNews = async (
  nextPageString?: string
): Promise<CryptoNewsAPI | undefined> => {
  try {
    const url = `https://newsdata.io/api/1/latest?q=crypto&country=us&language=en&removeduplicate=1${
      nextPageString ? `&page=${nextPageString}` : ""
    }`;
    const res = await fetch(url, {
      headers: {
        "X-ACCESS-KEY": process.env.NEXT_PUBLIC_NEWS_DATA_KEY || "",
        Accept: "application/json",
        "Accept-Encoding": "deflate, gzip",
      },
      // Uncomment below to revalidate every 100s
      // https://nextjs.org/docs/app/api-reference/functions/fetch
      // next: { revalidate: 100 },
    }).then((res) => res.json());
    return { data: res.results, nextPageString: res.nextPage };
  } catch (err) {
    console.error(err);
  }
};
