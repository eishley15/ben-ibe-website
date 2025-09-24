import React, { useState, useEffect, useRef } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./ui/carousel";
import { Button } from "./ui/button";

const VideoCarouselSection = () => {
  const [api, setApi] = useState(null);
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);

  const videoRefs = useRef([]);

  useEffect(() => {
    if (!api) {
      return;
    }

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);

    api.on("select", () => {
      const prevIndex = api.previousScrollSnap();
      if (videoRefs.current[prevIndex]) {
        videoRefs.current[prevIndex].pause();
      }

      setCurrent(api.selectedScrollSnap() + 1);

      const newIndex = api.selectedScrollSnap();
      if (videoRefs.current[newIndex]) {
        videoRefs.current[newIndex].play();
      }
    });

    return () => {
      api.off("select");
    };
  }, [api]);

  const videoSources = [
    { type: "video", src: "/videos/video1.mp4", title: "Flower Shop Tour" },
    { type: "video", src: "/videos/video2.mp4", title: "Arrangement Process" },
    { type: "video", src: "/videos/video3.mp4", title: "Behind the Scenes" },
    { type: "video", src: "/videos/video4.mp4", title: "Behind the Scenes" },
  ];

  return (
    <section className="bg-[#FFF8F0] w-full h-screen py-20 px-6 md:px-16 lg:px-24 flex items-center justify-center">
      <div className="flex flex-col md:flex-row gap-12 items-center justify-center w-full max-w-7xl mx-auto">
        {/* Left Column: Text Content */}
        <div className="flex-1 md:pr-12 lg:pr-20 text-center md:text-left">
          <h2 className="text-[#9C322B] text-5xl md:text-6xl font-bold mb-6 tracking-tighter">
            Behind the Blooms
          </h2>
          <br />
          <p className="text-gray-800 text-lg leading-relaxed mb-4">
            Get a closer look at how our bouquets come to life, from the careful
            selection of flowers to the final elegant touches.
          </p>
          <br />
          <p className="text-gray-800 text-lg leading-relaxed mb-4">
            These videos highlight the passion, precision, and creativity that
            go into every arrangement we craft. Each clip is more than just a
            peek into our process—it's a reflection of the heart we put into
            every bouquet we make.
          </p>
          <br />
          <p className="text-gray-800 text-lg leading-relaxed mb-8">
            Whether it's for a gift or just because, our bouquets are made to
            leave a lasting impression.
          </p>
          <br />
          <h3 className="text-gray-800 text-xl font-semibold mb-2">
            See something you love?
          </h3>
          <p className="text-gray-700 text-base leading-relaxed mb-6">
            Visit us or send us a message through our social media pages to
            place an order or learn more. Let's make something beautiful
            together.
          </p>
          <br />
          <button className="bg-[#A89F53] text-[#FFF8F0] !px-6 !py-3 rounded-lg font-bold hover:bg-[#8f8746] transition">
            Shop Now
          </button>
        </div>
        {/* Right Column: Video Carousel */}
        <div className="relative flex-1 w-full max-w-md">
          <div className="flex flex-col items-center">
            <Carousel setApi={setApi} className="w-full">
              <CarouselContent>
                {videoSources.map((video, index) => (
                  <CarouselItem key={index} className="basis-full">
                    <div className="relative aspect-[9/16] w-full h-full rounded-lg overflow-hidden shadow-xl">
                      <video
                        ref={(el) => (videoRefs.current[index] = el)}
                        className="w-full h-full object-cover"
                        controls
                        src={video.src}
                        title={video.title}
                      ></video>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="-left-4 top-1/2 -translate-y-1/2" />
              <CarouselNext className="-right-4 top-1/2 -translate-y-1/2" />
            </Carousel>
            {/* The pagination div is now a sibling, not a child */}
            <div className="flex justify-center mt-4 mr-10 gap-1 self-end !pt-2">
              {Array.from({ length: count }).map((_, index) => (
                <div
                  key={index}
                  className={`h-2 w-2 rounded-full mx-1 cursor-pointer ${
                    current === index + 1 ? "bg-[#9C322B]" : "bg-gray-400"
                  }`}
                  onClick={() => api?.scrollTo(index)}
                ></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VideoCarouselSection;
