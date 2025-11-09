import React, { useEffect } from "react";

const HeroSlider = () => {
    useEffect(() => {
      const slides = document.querySelectorAll(".carousel-item");
      let index = 0;
      const interval = setInterval(() => {
        index = (index + 1) % slides.length;
        slides[index].scrollIntoView({ behavior: "smooth" });
      }, 4000);
      return () => clearInterval(interval);
    }, []);
      
  return (
    <div className="w-full h-[80vh] carousel rounded-none overflow-hidden">
      {/* Slide 1 */}
      <div id="slide1" className="carousel-item relative w-full">
        <div className="w-full h-[80vh] bg-gradient-to-r from-sky-700 to-indigo-900 flex flex-col justify-center items-center text-white text-center px-6">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Find Your Perfect{" "}
            <span className="text-sky-300">Study Partner</span>
          </h1>
          <p className="text-lg mb-6 max-w-2xl">
            Connect with learners who share your goals and study interests.
          </p>
          <button className="btn btn-primary">Get Started</button>
        </div>
        <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
          <a href="#slide3" className="btn btn-circle">
            ❮
          </a>
          <a href="#slide2" className="btn btn-circle">
            ❯
          </a>
        </div>
      </div>

      {/* Slide 2 */}
      <div id="slide2" className="carousel-item relative w-full">
        <div className="w-full h-[80vh] bg-gradient-to-r from-indigo-800 to-sky-900 flex flex-col justify-center items-center text-white text-center px-6">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Collaborate. Learn.{" "}
            <span className="text-sky-300">Grow Together.</span>
          </h1>
          <p className="text-lg mb-6 max-w-2xl">
            Build motivation and accountability with peers.
          </p>
          <button className="btn btn-primary">Explore Partners</button>
        </div>
        <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
          <a href="#slide1" className="btn btn-circle">
            ❮
          </a>
          <a href="#slide3" className="btn btn-circle">
            ❯
          </a>
        </div>
      </div>

      {/* Slide 3 */}
      <div id="slide3" className="carousel-item relative w-full">
        <div className="w-full h-[80vh] bg-gradient-to-r from-sky-800 to-indigo-950 flex flex-col justify-center items-center text-white text-center px-6">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Build Knowledge, <span className="text-sky-300">Together</span>
          </h1>
          <p className="text-lg mb-6 max-w-2xl">
            Create your profile and achieve more with teamwork.
          </p>
          <button className="btn btn-primary">Join Now</button>
        </div>
        <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
          <a href="#slide2" className="btn btn-circle">
            ❮
          </a>
          <a href="#slide1" className="btn btn-circle">
            ❯
          </a>
        </div>
      </div>
    </div>
  );
};

export default HeroSlider;
