import { API_HOST } from './constants';
import { CoinDetails, LatestListings } from './types';

export const getCoinsData = async (): Promise<LatestListings[] | undefined> => {
  try {
    const { data } = await fetch(
      `${API_HOST}/v1/cryptocurrency/listings/latest?limit=10`,
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
      `${API_HOST}/v2/cryptocurrency/info?id=${id.join(',')}`,
      {
        headers: {
          'X-CMC_PRO_API_KEY': process.env.CMC_KEY || '',
        },
      }
    ).then((res) => res.json());

    return data;
  } catch (e) {
    console.error(e);
  }
};
