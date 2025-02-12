"use client";

import React, { useEffect, useState, useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { FaQuoteLeft } from "react-icons/fa";

const testimonials = [
  {
    name: "Amit Sharma",
    role: "Software Engineer",
    text: "Finding relevant job postings has never been easier. The job recommendations are incredibly accurate, making my job search efficient and hassle-free. I was able to land multiple interviews within a week of using the platform.",
    image: "/amit.jpg", // Replace with actual image paths
  },
  {
    name: "Priya Verma",
    role: "Marketing Specialist",
    text: "The application process is seamless. I love how I can save job postings and track my applications in real time without any confusion. The instant notifications also ensure that I never miss an update on my applications.",
    image: "/priya.jpg",
  },
  {
    name: "Rahul Mehta",
    role: "Data Analyst",
    text: "The filtering options are top-notch. I was able to narrow down job searches with specific criteria, which saved me a lot of time. The platform’s ability to suggest jobs based on my previous searches has also been a game-changer.",
    image: "/rahul.jpg",
  },
  {
    name: "Sonia Kapoor",
    role: "HR Manager",
    text: "Managing job postings and reviewing applications is incredibly smooth. I can easily filter through candidates and shortlist the best matches in minutes. The ability to organize applications into different stages has made hiring more structured and efficient.",
    image: "/sonia.jpg",
  },
  {
    name: "Vikas Gupta",
    role: "Product Manager",
    text: "I appreciate the ability to directly communicate with candidates through the platform. It has streamlined the hiring process significantly for our team. The messaging system eliminates unnecessary back-and-forth emails and keeps everything in one place.",
    image: "/vikas.jpg",
  },
  {
    name: "Neha Reddy",
    role: "Customer Support Representative",
    text: "The real-time application status updates keep me informed. I never have to wonder if my application has been seen or processed. Knowing when recruiters review my application gives me confidence and helps me plan my next steps accordingly.",
    image: "/neha.jpg",
  },
];

const Testimonials = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [Autoplay()]);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    emblaApi.on("select", onSelect);
  }, [emblaApi, onSelect]);

  return (
    <section className="md:mt-20 py-8 md:py-16 bg-gradient-to-tl from-gray-950 to-[#0a002b] via-[#13014d] text-white rounded-3xl">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl sm:text-5xl font-bold gradient-title mb-3 md:mb-6 h-12 md:h-16">
          See What Our Users Say
        </h2>
        <div ref={emblaRef} className="overflow-hidden">
          <div className="flex">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="embla__slide flex-none w-full px-6">
                <div className="bg-[#020017]  p-6 rounded-lg shadow-lg">
                  <FaQuoteLeft className="text-blue-400 text-3xl mb-4" />
                  <p className="text-lg italic">"{testimonial.text}"</p>
                  <div className="mt-4 flex items-center justify-center">
                    <img
                      src={testimonial.image}
                      alt={testimonial.name}
                      className="w-16 h-16 rounded-full mr-3 border-2 border-blue-400"
                    />
                    <div>
                      <p className="font-semibold text-blue-400">
                        {testimonial.name}
                      </p>
                      <p className="text-sm text-gray-300">
                        {testimonial.role}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
