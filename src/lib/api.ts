import { headers } from 'next/headers';
import { CMC_API_HOST } from './constants';
import { CoinDetails, LatestListings } from './types';

export const getCoinsData = async (): Promise<LatestListings[] | undefined> => {
  try {
    const { data } = await fetch(
      `${CMC_API_HOST}/v1/cryptocurrency/listings/latest?limit=10`,
      {
        headers: {
          'X-CMC_PRO_API_KEY': process.env.CMC_KEY || '',
          // Below headers needed as mentioned in CMC docs
          // https://coinmarketcap.com/api/documentation/v1/#section/Standards-and-Conventions
          Accept: 'application/json',
          'Accept-Encoding': 'deflate, gzip',
        },
        // Uncomment below to revalidate every 100s
        // https://nextjs.org/docs/app/api-reference/functions/fetch
        next: { revalidate: 100 },
      }
    ).then((res) => res.json());

    return data;
  } catch (e) {
    console.error(e);
  }
};

export const getCoinsLogo = async (
  id: number[]
): Promise<CoinDetails | undefined> => {
  try {
    const { data } = await fetch(
      `${CMC_API_HOST}/v2/cryptocurrency/info?id=${id.join(',')}`,
      {
        headers: {
          'X-CMC_PRO_API_KEY': process.env.CMC_KEY || '',
          Accept: 'application/json',
          'Accept-Encoding': 'deflate, gzip',
        },
      }
    ).then((res) => res.json());

    return data;
  } catch (e) {
    console.error(e);
  }
};

export const getCryptoNews = async (): Promise<any[] | undefined> => {
  try {
    const { results } = await fetch(
      'https://newsdata.io/api/1/news?q=crypto&country=us',
      {
        headers: {
          'X-ACCESS-KEY': process.env.NEWS_DATA_KEY || '',
          Accept: 'application/json',
          'Accept-Encoding': 'deflate, gzip',
        },
      }
    ).then((res) => res.json());
    return results;
  } catch (err) {
    console.error(err);
  }
};
