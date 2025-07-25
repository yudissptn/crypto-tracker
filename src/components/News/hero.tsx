"use client";
import { CryptoNewsAPI } from "@/lib/types";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "../ui/carousel";
import { useEffect, useState } from "react";
import { getCryptoNews } from "@/lib/api";

const Hero = (props: { newsData: CryptoNewsAPI }) => {
  const [newsData, setNewsData] = useState<CryptoNewsAPI>(props.newsData);
  const [currentIndex, setCurrentIndex] = useState(0);

  const { data: newsList, nextPageString } = newsData;

  useEffect(() => {
    const refetchNews = async () => {
      if (
        currentIndex === newsList.length - 2 &&
        nextPageString &&
        newsList.length < 20
      ) {
        const additionalNews = await getCryptoNews(nextPageString);
        if (additionalNews) {
          setNewsData(({ data }) => ({
            data: [...data, ...additionalNews.data],
            nextPageString: additionalNews.nextPageString,
          }));
        }
      }
    };
    refetchNews();
  }, [currentIndex, newsList, nextPageString]);

  return (
    <Carousel
      className="max-w-screen-lg mx-auto"
      onSlideChange={(index) => setCurrentIndex(index)}
    >
      <CarouselContent className="w-full mx-auto">
        {newsList.map((news) => (
          <CarouselItem key={news.article_id}>
            <a href={news.link} target="_blank">
              <div
                className="bg-cover bg-center w-full h-96 flex items-center justify-center"
                style={{ backgroundImage: `url(${news.image_url})` }}
              >
                <div className="bg-black bg-opacity-50 p-2">
                  <h3 className="text-white font-semibold">{news.title}</h3>
                </div>
              </div>
            </a>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
};

export default Hero;
