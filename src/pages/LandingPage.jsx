import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import companies from "../data/companies.json";
import React from "react";
import { Link } from "react-router-dom";
import Autoplay from "embla-carousel-autoplay";

const LandingPage = () => {
  return (
    <main className="flex flex-col gap-10 sm:gap-16 pt-10 sm:pt-16 mt-4 md:mt-0">
      <section className="text-center">
        <h1 className="flex flex-col items-center justify-center gradient-title text-4xl font-bold sm:text-6xl lg:text-7xl tracking-tighter py-4 ">
          Connecting Talent and Opportunity
          <span className="flex items-center gap-2 sm:gap-4">
            with{" "}
            <img
              src="./logo1.png"
              alt="Workly"
              className="h-14 sm:h-24 lg:h-24"
            />
          </span>
        </h1>
        <p className="text-gray-300 sm:mt-4 text-xs md:text-xl px-4 sm:px-2">
          Discover the perfect match for your career or company, all in one
          seamless and intuitive platform.
        </p>
      </section>

      <div className="flex gap-6 justify-center ">
        <Link to="/jobs">
          <Button
            variant="outline"
            size="xl"
            className="border border-blue-500 bg-transparent hover:bg-blue-500 transition-all duration-300"
          >
            Find Jobs
          </Button>
        </Link>
        <Link to="/post-job">
          <Button
            variant="outline"
            size="xl"
            className="border border-yellow-700 bg-transparent hover:bg-yellow-700 transition-all duration-300"
          >
            Post a Job
          </Button>
        </Link>
      </div>

      <Carousel
        className="w-full py-10 -z-10"
        plugins={[Autoplay({ delay: 2000 })]}
      >
        <CarouselContent className="flex gap-5 sm:gap-20 items-center">
          {companies.map(({ name, id, path }) => {
            return (
              <CarouselItem key={id} className="basis-1/3 lg:basis-1/6">
                <img
                  src={path}
                  alt={name}
                  className="h-9 sm:h-14 object-contain"
                />
              </CarouselItem>
            );
          })}
        </CarouselContent>
      </Carousel>
    </main>
  );
};

export default LandingPage;
