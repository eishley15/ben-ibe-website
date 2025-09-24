import React, { useState, useEffect } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./ui/carousel";

const CarouselSection = () => {
  const [api, setApi] = useState(null);
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!api) {
      return;
    }

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  const carouselImages = [
    "/carousel1.png",
    "/carousel2.png",
    "/carousel3.png",
    "/carousel4.png",
    "/carousel5.png",
    "/carousel6.png",
    "/carousel7.png",
    "/carousel8.png",
    "/carousel9.png",
  ];

  return (
    <section className="bg-[#FFF8F0] w-full h-screen flex items-center justify-center relative overflow-hidden">
      <img
        src="/carouselBg.png"
        alt="pink-bouquet-flowers"
        className="absolute inset-0 w-full h-screen object-cover"
      />
      <div className="absolute inset-0 bg-[#9C322B]/60"></div>
      <div className="relative w-full max-w-5xl mx-auto py-12">
        <Carousel setApi={setApi} className="w-full">
          <CarouselContent className="-mx-4">
            {carouselImages.map((imageSrc, index) => (
              <CarouselItem key={index} className="!pl-6 basis-1/2">
                <div className="flex justify-center items-center rounded-lg shadow-lg">
                  <img
                    src={imageSrc}
                    alt={`Carousel page ${index + 1}`}
                    className="w-full h-auto object-cover rounded-lg"
                  />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="-left-4" />
          <CarouselNext className="-right-4" />
        </Carousel>
        <br />
        <div className="flex justify-center mt-4 gap-1">
          {Array.from({ length: count }).map((_, index) => (
            <div
              key={index}
              className={`h-2 w-2 rounded-full mx-1 cursor-pointer ${
                current === index + 1 ? "bg-[#610000]" : "bg-gray-300"
              }`}
              onClick={() => api?.scrollTo(index)}
            ></div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CarouselSection;
