import React from "react";
import {
  FaFacebookF,
  FaLinkedinIn,
  FaXTwitter,
  FaGithub,
} from "react-icons/fa6";
import { Link } from "react-router";

const Footer = () => {
  return (
    <footer
      className="text-slate-200 py-12 w-full relative overflow-hidden"
      style={{
        backgroundImage:
          "url('https://img.freepik.com/free-vector/blue-velvety-abstract-wavy-background-dark-background_134830-2226.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Dark overlay for better readability */}
      <div className="absolute inset-0 bg-slate-900/80"></div>

      {/* Main Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Left: Logo + Description */}
          <div className="text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-3 mb-4 ">
              <img
                className="h-12 w-12 rounded-xl hover:scale-105 transition-transform"
                src="https://i.ibb.co.com/Pv09Fmv3/Your-paragraph-text.png"
                alt="StudyMate Logo"
              />
              <h2 className="text-3xl font-bold text-sky-400">StudyMate</h2>
            </div>
            <p className="text-slate-300 leading-relaxed text-sm md:text-base max-w-md mx-auto md:mx-0">
              StudyMate helps students connect with ideal study partners based
              on subjects, learning preferences, and location — making learning
              collaborative, engaging, and goal-focused.
            </p>
          </div>

          {/* Middle: Quick Links */}
          <div className="text-center">
            <h3 className="text-sky-400 font-semibold text-xl mb-4">
              Quick Links
            </h3>
            <ul className="space-y-3 text-slate-300">
              <li>
                <Link to="/about" className="hover:text-sky-400 transition">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/terms" className="hover:text-sky-400 transition">
                  Legal Center
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-sky-400 transition">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Right: Social Media */}
          <div className="text-center md:text-right">
            <h3 className="text-sky-400 font-semibold text-xl mb-4">
              Follow Us
            </h3>
            <div className="flex justify-center md:justify-end gap-5 text-2xl">
            
              <a
                href="https://x.com/RahmanRazdee"
                target="_blank"
                rel="noreferrer"
                className="hover:text-sky-400 transition-transform transform hover:scale-110"
              >
                <FaXTwitter />
              </a>
              <a
                href="https://www.linkedin.com/in/walid-rahman-rajdee-029b08264/"
                target="_blank"
                rel="noreferrer"
                className="hover:text-sky-400 transition-transform transform hover:scale-110"
              >
                <FaLinkedinIn />
              </a>
              <a
                href="https://github.com/Razdee01"
                target="_blank"
                rel="noreferrer"
                className="hover:text-sky-400 transition-transform transform hover:scale-110"
              >
                <FaGithub />
              </a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-slate-700 mt-10 pt-6 text-center text-sm text-slate-400">
          © {new Date().getFullYear()}{" "}
          <span className="text-sky-400 font-semibold">StudyMate</span> — All
          Rights Reserved.
          <span className="block mt-2 text-xs">
            Made with ❤️ by Walid Rahman Rajdee
          </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
