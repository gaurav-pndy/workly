"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FaSearch, FaBolt, FaRobot, FaShieldAlt } from "react-icons/fa";

gsap.registerPlugin(ScrollTrigger);

const Features = () => {
  const sectionRef = useRef(null);
  const cardRefs = useRef([]);

  useEffect(() => {
    gsap.fromTo(
      sectionRef.current,
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          toggleActions: "play none none none",
        },
      }
    );

    cardRefs.current.forEach((card, index) => {
      gsap.fromTo(
        card,
        { opacity: 0, scale: 0.9 },
        {
          opacity: 1,
          scale: 1,
          duration: 0.8,
          delay: index * 0.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: card,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        }
      );
    });
  }, []);

  const features = [
    {
      id: 1,
      icon: (
        <FaSearch className="text-blue-400 text-5xl transition-transform duration-300 group-hover:scale-125" />
      ),
      head: "Seamless Job Search",
      desc: "Job seekers can explore a wide range of job opportunities based on their skills, experience, and preferences. ",
    },
    {
      id: 2,
      icon: (
        <FaBolt className="text-yellow-400 text-5xl transition-transform duration-300 group-hover:scale-125" />
      ),
      head: "Effortless Job Posting",
      desc: "Recruiters can post job openings, manage applications, and update hiring statuses effortlessly. ",
    },
    {
      id: 3,
      icon: (
        <FaShieldAlt className="text-green-400 text-5xl transition-transform duration-300 group-hover:scale-125" />
      ),
      head: "Secure Hiring Process",
      desc: "Streamlined and secure job applications, ensuring a smooth and secure experience for both job seekers and recruiters.",
    },
  ];

  return (
    <section ref={sectionRef} className=" py-5 md:py-16 text-white">
      <div className="max-w-7xl mx-auto px-2 md:px-10 text-center">
        <h2 className="text-4xl sm:text-5xl font-bold gradient-title h-12 md:h-16">
          Why Choose Workly?
        </h2>
        <p className="text-gray-400 mt-4 text-lg">
          Workly offers seamless experiences for both job seekers and
          recruiters. Here’s how we make it easy:
        </p>
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-10">
          {features.map((feature, index) => (
            <div
              key={feature.id}
              ref={(el) => (cardRefs.current[index] = el)}
              className="group p-6 bg-gradient-to-br from-[#301934] via-[#060047] to-gray-950 rounded-2xl transform transition-all duration-300"
            >
              <div className="mb-4 flex justify-center">{feature.icon}</div>
              <h3 className="text-2xl font-semibold text-white">
                {feature.head}
              </h3>
              <p className="text-gray-400 mt-4">{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
