import React from "react";
import {
  FaFacebookF,
  FaLinkedinIn,
  FaInstagram,
  FaXTwitter,
} from "react-icons/fa6";

const Footer = () => {
  return (
    <footer className="bg-black/80 text-slate-200 py-10">
      {/* Container */}
      <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row justify-between gap-10 md:gap-20">
        {/* Left Section: Logo + Description */}
        <div className="flex-1 text-center md:text-left">
          <div className="flex items-center justify-center md:justify-start gap-3 mb-3">
            <img
              src="https://i.ibb.co.com/vbTrKzf/Study-Mate-logo.png"
              alt="StudyMate Logo"
              className="h-10 w-10 rounded-xl"
            />
            <h2 className="text-2xl font-bold text-sky-400">StudyMate</h2>
          </div>
          <p className="text-slate-400 leading-relaxed text-sm md:text-base">
            StudyMate helps students connect with ideal study partners based on
            subjects, learning preferences, and location — making learning
            collaborative, engaging, and goal-focused.
          </p>
        </div>

        {/* Social Media Section */}
        <div className="flex-1 text-center md:text-right">
          <h3 className="text-sky-400 font-semibold mb-3">Follow Us</h3>
          <div className="flex justify-center md:justify-end gap-4 text-lg">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noreferrer"
              className="hover:text-sky-400 transition-transform transform hover:scale-110"
            >
              <FaFacebookF />
            </a>
            <a
              href="https://x.com"
              target="_blank"
              rel="noreferrer"
              className="hover:text-sky-400 transition-transform transform hover:scale-110"
            >
              <FaXTwitter />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noreferrer"
              className="hover:text-sky-400 transition-transform transform hover:scale-110"
            >
              <FaLinkedinIn />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noreferrer"
              className="hover:text-sky-400 transition-transform transform hover:scale-110"
            >
              <FaInstagram />
            </a>
          </div>
        </div>
      </div>

      {/* Divider & Copyright */}
      <div className="border-t border-slate-700 mt-8 pt-4 text-center text-sm text-slate-500">
        © {new Date().getFullYear()}{" "}
        <span className="text-sky-400 font-semibold">StudyMate</span> — All
        Rights Reserved.
      </div>
    </footer>
  );
};

export default Footer;
