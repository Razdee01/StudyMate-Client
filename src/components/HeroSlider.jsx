import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router";
import { AuthContext } from "../contexts/AuthContext";

const slidesData = [
  {
    id: 1,
    title: "Find Your Perfect ",
    highlight: "Study Partner",
    description:
      "Connect with learners who share your goals and study interests.",
    buttonText: "Get Started",
    bgClass: "from-sky-700 to-indigo-900",
    path: "/find-partners",
  },
  {
    id: 2,
    title: "Collaborate. Learn. ",
    highlight: "Grow Together.",
    description: "Build motivation and accountability with peers.",
    buttonText: "Explore Partners",
    bgClass: "from-indigo-800 to-sky-900",
    path: "/my-connections",
  },
  {
    id: 3,
    title: "Build Knowledge, ",
    highlight: "Together",
    description: "Create your profile and achieve more with teamwork.",
    buttonText: "Join Now",
    bgClass: "from-sky-800 to-indigo-950",
    path: "/create-partner-profile",
  },
];

const HeroSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % slidesData.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const goToSlide = (index) => setCurrentIndex(index);

  const handleButtonClick = (path) => {
    if (user) {
      navigate(path); 
    } else {
      navigate("/login"); 
    }
  };

  return (
    <div className="w-full overflow-hidden relative">
      {/* Slider container */}
      <div
        className="flex transition-transform duration-700 ease-in-out"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {slidesData.map((slide) => (
          <div
            key={slide.id}
            className={`shrink-0 w-full h-[50vh] sm:h-[60vh] md:h-[80vh] flex justify-center items-center bg-linear-to-r ${slide.bgClass}`}
          >
            <div className="text-center px-4 sm:px-6 md:px-8 flex flex-col justify-center items-center">
              <h1 className="text-2xl sm:text-3xl md:text-5xl font-bold mb-3 sm:mb-4">
                {slide.title}
                <span className="text-sky-300">{slide.highlight}</span>
              </h1>
              <p className="text-sm sm:text-base md:text-lg mb-4 sm:mb-6 max-w-xl sm:max-w-2xl">
                {slide.description}
              </p>
              <div>
                <button
                  onClick={() => handleButtonClick(slide.path)}
                  className="btn btn-primary text-sm sm:text-base"
                >
                  {slide.buttonText}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Dots */}
      <div className="absolute bottom-3 sm:bottom-5 left-1/2 transform -translate-x-1/2 flex gap-2 sm:gap-3">
        {slidesData.map((_, idx) => (
          <button
            key={idx}
            onClick={() => goToSlide(idx)}
            className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full ${
              currentIndex === idx ? "bg-white" : "bg-gray-400"
            }`}
          ></button>
        ))}
      </div>

      {/* Prev/Next Arrows */}
      <div className="absolute top-1/2 left-2 sm:left-5 transform -translate-y-1/2">
        <button
          onClick={() =>
            goToSlide(
              (currentIndex - 1 + slidesData.length) % slidesData.length
            )
          }
          className="btn btn-circle btn-sm sm:btn-md"
        >
          ❮
        </button>
      </div>
      <div className="absolute top-1/2 right-2 sm:right-5 transform -translate-y-1/2">
        <button
          onClick={() => goToSlide((currentIndex + 1) % slidesData.length)}
          className="btn btn-circle btn-sm sm:btn-md"
        >
          ❯
        </button>
      </div>
    </div>
  );
};

export default HeroSlider;
