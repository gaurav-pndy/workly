import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import companies from "../data/companies.json";
import React, { useRef } from "react";
import { Link } from "react-router-dom";
import Autoplay from "embla-carousel-autoplay";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { TextPlugin } from "gsap/all";

gsap.registerPlugin(TextPlugin);

const LandingPage = () => {
  const mainRef = useRef();
  const headTextRef = useRef();
  const connectRef = useRef();
  const starsRef = useRef([]);
  const andRef = useRef();
  const logoRef = useRef();

  useGSAP(
    () => {
      gsap.from(".key-text", {
        opacity: 0,
        stagger: 0.8,
        duration: 4,
        ease: "back.out",
      });
    },
    { scope: headTextRef }
  );

  useGSAP(() => {
    gsap.to(connectRef.current, {
      delay: 1.5,
      duration: 0.7,
      text: "Connecting",
      ease: "steps(10)",
    });
  });

  useGSAP(() => {
    gsap.to(andRef.current, {
      delay: 2.3,
      duration: 0.6,
      text: "and",
      ease: "steps(3)",
    });
  });

  useGSAP(() => {
    gsap.from(logoRef.current, {
      opacity: 0,
      scale: 1.3,
      filter: "blur(10px)",
      delay: 2.8,
      duration: 1,
      ease: "power1.out",
    });
  });

  useGSAP(
    () => {
      gsap.from(".blur-anim", {
        opacity: 0,
        scale: 0.5,
        filter: "blur(10px)",
        delay: 3.5,
        stagger: 0.3,
        duration: 0.8,
        ease: "power1.out",
      });
    },
    { scope: mainRef }
  );

  useGSAP(() => {
    starsRef.current.forEach((star, index) => {
      gsap.to(star, {
        opacity: 0.3,
        scale: 1.5,
        duration: 0.8,
        repeat: -1,
        yoyo: true,
        ease: "power1.inOut",
        delay: index * 0.3,
      });
    });
  });

  return (
    <main
      ref={mainRef}
      className="flex flex-col gap-20 sm:gap-16 pt-5 sm:pt-16 justify-between md:h-full"
    >
      <section className="text-center flex flex-col gap-10">
        <h1
          ref={headTextRef}
          className="flex flex-col md:gap-4 items-center justify-center text-[2.5rem] font-bold sm:text-6xl lg:text-7xl leading-snug tracking-tighter  pt-4 relative "
          style={{ wordSpacing: "1rem" }}
        >
          <span className="">
            <span ref={connectRef}> </span>{" "}
            <span className=" shining-text key-text">
              Talent
              {[
                { top: "20%", left: "100%", size: "0.4rem" },
                { top: "30%", left: "80%", size: "0.6rem" },
                { top: "27%", left: "87%", size: "0.3rem" },
                { top: "5%", left: "90%", size: "1.4rem" },
                { top: "25%", left: "105%", size: "0.8rem" },
                { top: "35%", left: "100%", size: "0.3rem" },
              ].map((sty, i) => (
                <span
                  key={i}
                  ref={(el) => (starsRef.current[i] = el)}
                  className="twinkle-star"
                  style={{ top: sty.top, left: sty.left, fontSize: sty.size }}
                >
                  ✦
                </span>
              ))}
            </span>
            {"  "}
            <span ref={andRef}></span>{" "}
            <span className="shimmer-text key-text">Opportunity</span>
          </span>
          <span ref={logoRef} className=" flex items-center gap-2 sm:gap-4 ">
            with
            <img
              src="./logo1.png"
              alt="Workly"
              className="h-16 sm:h-24 lg:h-24 "
            />
          </span>
        </h1>
        <p className="blur-anim text-gray-300 text-lg md:text-xl px-4 sm:px-2 leading-relaxed">
          Discover the perfect match for your career or company, all in one
          seamless and intuitive platform.
        </p>
        <div className=" blur-anim flex gap-6 flex-col md:flex-row justify-center">
          <Link to="/jobs">
            <Button
              variant="outline"
              size="xl"
              className="border w-[90vw] md:w-full border-blue-500 bg-transparent hover:bg-blue-500 transition-all duration-300"
            >
              Find Jobs
            </Button>
          </Link>
          <Link to="/post-job">
            <Button
              variant="outline"
              size="xl"
              className="border w-[90vw] md:w-full border-yellow-700 bg-transparent hover:bg-yellow-700 transition-all duration-300"
            >
              Post a Job
            </Button>
          </Link>
        </div>
      </section>

      <Carousel
        className="w-full md:py-10 -z-10 blur-anim"
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
