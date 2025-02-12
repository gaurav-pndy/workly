"use client";

import { FaUserTie, FaBriefcase, FaCheckCircle } from "react-icons/fa";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const sections = [
  {
    id: "seeker",
    title: "For Job Seekers",
    icon: <FaBriefcase className="text-yellow-400 md:text-4xl" />,
    description:
      "Looking for your next opportunity? Workly makes job searching effortless with powerful features tailored for you.",
    points: [
      "Discover thousands of job listings across various industries.",
      "Bookmark interesting roles to apply at your convenience.",
      "Submit applications instantly with your saved resume.",
      "Track applications, saved jobs, and updates in one place.",
    ],
    image: "/job_seeker.jpg",
    highlight: "📌 Start applying today and take the next step in your career!",
    iconColor: "text-blue-400",
    reverse: false,
  },
  {
    id: "recruiter",
    title: "For Job Providers",
    icon: <FaUserTie className="text-blue-400 md:text-4xl" />,
    description:
      "Workly simplifies hiring by connecting you with qualified candidates quickly and efficiently.",
    points: [
      "Create and manage job listings in minutes.",
      "View, shortlist, and manage candidate applications seamlessly.",
      "Get matched with job seekers who fit your criteria.",
      "Showcase your company and attract top professionals.",
    ],
    image: "/recruiter.jpg",
    highlight: "📌 Find the perfect candidate and grow your team with Workly!",
    iconColor: "text-yellow-400",
    reverse: true,
  },
];

const ForCustomer = () => {
  const sectionRefs = useRef([]);

  useEffect(() => {
    sectionRefs.current.forEach((ref) => {
      if (ref) {
        gsap.fromTo(
          ref,
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: ref,
              start: "top 85%",
              toggleActions: "play none none none",
            },
          }
        );
      }
    });
  }, []);

  return (
    <section className="py-5 md:py-16 px-3 md:px-0 max-w-7xl flex flex-col gap-20 md:gap-40 mx-auto">
      {sections.map((section, index) => (
        <div
          key={section.id}
          ref={(el) => (sectionRefs.current[index] = el)}
          className={`group  flex  flex-col-reverse md:flex-row${
            section.reverse ? "-reverse" : ""
          } items-center gap-8 md:gap-12 transition-all duration-300 hover:transform hover:-translate-y-2`}
        >
          <div className="w-full  md:w-1/2 md:px-4 lg:pl-12">
            <h2 className="  flex flex-col text-3xl sm:text-5xl font-bold gradient-title  gap-1 md:gap-3">
              {section.icon}
              {section.title}
            </h2>
            <p className="text-gray-400 mt-2 md:mt-8 text-lg">
              {section.description}
            </p>
            <ul className=" mt-2 md:mt-4 space-y-1 md:space-y-3 text-gray-300">
              {section.points.map((point, i) => (
                <li key={i} className="flex  gap-2 md:text-lg ">
                  <IoMdCheckmarkCircleOutline className="text-green-400 text-2xl mt-1" />
                  {point}
                </li>
              ))}
            </ul>
            <p className="mt-2 md:mt-6 text-lg text-yellow-400 font-semibold">
              {section.highlight}
            </p>
          </div>
          <div className="w-full md:w-1/2 flex justify-center relative group-hover:scale-105 transition-transform duration-300 ">
            <div className="absolute inset-0 bg-purple-700 rounded-3xl transform  rotate-[10deg] md:rotate-3 opacity-20 group-hover:rotate-6 transition-transform duration-300"></div>
            <img
              src={section.image}
              alt={section.title}
              className="relative w-full max-w-lg h-72 md:h-[22rem] object-cover rounded-2xl shadow-xl"
            />
          </div>
        </div>
      ))}
    </section>
  );
};

export default ForCustomer;
