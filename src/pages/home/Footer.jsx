const Footer = () => {
  return (
    <footer className="bg-[#0f0132] rounded-t-3xl text-gray-300 py-2">
      <div className=" mx-auto px-4 md:px-6 ">
        <div className="flex flex-col md:flex-row gap-3 md:gap-6 pt-2 md:pt-3">
          {/* Logo & About Section */}
          <div className="md:w-1/3">
            <h2 className="md:text-2xl font-bold text-white">Workly</h2>
            <p className=" mt-1 md:mt-2 text-xs md:text-sm">
              Your trusted job search platform, helping candidates find the
              right opportunities and recruiters connect with top talent.
            </p>
          </div>

          {/* Quick Links */}
          <div className="flex justify-between md:justify-around md:w-2/3 ">
            <div>
              <h3 className=" text-sm md:text-lg font-semibold text-white">
                Quick Links
              </h3>
              <ul className="mt-1 md:mt-2 text-xs md:text-base space-y-1 md:space-y-2">
                <li>
                  <a
                    href="/jobs"
                    className="hover:text-white transition duration-300"
                  >
                    Browse Jobs
                  </a>
                </li>
                <li>
                  <a
                    href="/post-job"
                    className="hover:text-white transition duration-300"
                  >
                    Post a Job
                  </a>
                </li>
                <li>
                  <a
                    href="#faq"
                    className="hover:text-white transition duration-300"
                  >
                    FAQs
                  </a>
                </li>
              </ul>
            </div>

            {/* Contact Section */}
            <div>
              <h3 className=" text-sm md:text-lg font-semibold text-white">
                Contact
              </h3>
              <p className="mt-1 md:mt-2 text-xs md:text-sm">
                Email: support@workly.com
              </p>
              <p className="text-xs md:text-sm">Phone: +91 98765 43210</p>
              <p className="text-xs md:text-sm">Address: Noida, India</p>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-2 md:mt-4 border-t border-gray-700 pt-2 text-center">
          <p className="text-xs md:text-sm">
            &copy; {new Date().getFullYear()} Workly. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
