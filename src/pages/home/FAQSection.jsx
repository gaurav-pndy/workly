"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FaChevronDown } from "react-icons/fa";

gsap.registerPlugin(ScrollTrigger);

const faqs = [
  {
    question: "What is Workly?",
    answer:
      "Workly is a job portal designed to streamline the hiring process for both job seekers and recruiters. Job seekers can browse listings, apply for jobs, and track their application status in real time. Recruiters can create job postings, filter applicants, and communicate with candidates directly on the platform. With advanced search filters and a user-friendly interface, Workly makes job searching and hiring more efficient and hassle-free.",
  },
  {
    question: "How do I apply for jobs on the platform?",
    answer:
      "You can search for jobs using filters such as location, job type, and experience level. Once you find a job that matches your interest, you can save it for later or apply instantly by uploading your resume and submitting your application directly through the platform.",
  },
  {
    question: "Can I track my job applications?",
    answer:
      "Yes! You can view the status of all your applications in one place, including whether they have been viewed by recruiters or are still under review. Additionally, you will receive real-time updates when recruiters take action on your application.",
  },
  {
    question: "How can recruiters find the right candidates?",
    answer:
      "Recruiters can create job postings, set specific filters such as skills, experience level, and location, and then easily shortlist candidates who best match their requirements. They can also review applications, manage candidates efficiently, and communicate directly with potential hires.",
  },
  {
    question: "Is the platform free for job seekers?",
    answer:
      "Yes, job seekers can create a profile, browse job listings, and apply for positions without any cost. There are no hidden charges, ensuring a seamless and accessible job search experience for everyone.",
  },
];

const FAQSection = () => {
  const faqRef = useRef(null);
  const [openIndex, setOpenIndex] = useState(null);

  useEffect(() => {
    if (faqRef.current) {
      gsap.fromTo(
        faqRef.current.children,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: faqRef.current,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        }
      );
    }
  }, []);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-5 md:py-16 px-2 md:px-6   text-white ">
      <div className="mx-auto">
        <h2 className="text-3xl sm:text-5xl font-bold gradient-title h-12 md:h-16 w-fit mx-auto mb-8 hidden md:block">
          Frequently Asked Questions
        </h2>
        <h2 className="text-3xl sm:text-5xl font-bold gradient-title h-12 md:h-16 w-fit mx-auto mb-4 md:mb-8 md:hidden">
          FAQs
        </h2>
        <div ref={faqRef} className="space-y-4 ">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="border-2 border-[#0e0138] p-3 md:p-5 rounded-lg shadow-lg cursor-pointer transition-all duration-300"
              onClick={() => toggleFAQ(index)}
            >
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold">{faq.question}</h3>
                <FaChevronDown
                  className={`transition-transform duration-300 ${
                    openIndex === index ? "rotate-180" : ""
                  }`}
                />
              </div>
              <div
                className={`overflow-hidden transition-all duration-300 ${
                  openIndex === index
                    ? "max-h-60 mt-5 opacity-100"
                    : "max-h-0 opacity-0"
                }`}
              >
                <p className="text-gray-300">{faq.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
