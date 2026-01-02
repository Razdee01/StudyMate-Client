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
    bgImage:
      "https://t3.ftcdn.net/jpg/08/11/23/44/360_F_811234427_vfS11iibOLTz5OIGzabIJxNEVSbhhAqr.jpg", // Energetic blue rays
    path: "/find-partners",
  },
  {
    id: 2,
    title: "Collaborate. Learn. ",
    highlight: "Grow Together.",
    description: "Build motivation and accountability with peers.",
    buttonText: "Explore Partners",
    bgImage:
      "https://media.istockphoto.com/id/626008940/photo/multiracial-young-people-doing-group-study-at-library.jpg?s=612x612&w=0&k=20&c=FptcA4vi2FvdiX32pR_eqy0FTZ6df9xW_UBQv4qfMJM=", // Soft glowing particles
    path: "/my-connections",
  },
  {
    id: 3,
    title: "Build Knowledge, ",
    highlight: "Together",
    description: "Create your profile and achieve more with teamwork.",
    buttonText: "Join Now",
    bgImage:
      "https://media.istockphoto.com/id/842920176/photo/happy-students-working-on-college-project-in-library.jpg?s=612x612&w=0&k=20&c=K744FPr1QxBKzUA-Os7YdCWGyVROx6s762QhDmMsB5k=", // Deep blue flow
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
    }, 5000); // Slightly slower for image impact
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
      <div
        className="flex transition-transform duration-1000 ease-in-out"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {slidesData.map((slide) => (
          <div
            key={slide.id}
            className="shrink-0 w-full h-[50vh] sm:h-[60vh] md:h-[80vh] flex justify-center items-center relative"
            style={{
              backgroundImage: `url(${slide.bgImage})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            {/* Dark overlay for text readability */}
            <div className="absolute inset-0 bg-black/50"></div>

            <div className="relative z-10 text-center px-4 sm:px-6 md:px-8 flex flex-col justify-center items-center text-white">
              <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold mb-4 drop-shadow-lg">
                {slide.title}
                <span className="text-sky-300 drop-shadow-xl">
                  {slide.highlight}
                </span>
              </h1>
              <p className="text-base sm:text-lg md:text-xl mb-8 max-w-2xl drop-shadow-md">
                {slide.description}
              </p>
              <button
                onClick={() => handleButtonClick(slide.path)}
                className="btn btn-primary btn-lg shadow-xl"
              >
                {slide.buttonText}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Dots & Arrows remain the same */}
      <div className="absolute bottom-5 left-1/2 transform -translate-x-1/2 flex gap-3">
        {slidesData.map((_, idx) => (
          <button
            key={idx}
            onClick={() => goToSlide(idx)}
            className={`w-3 h-3 rounded-full transition-all ${
              currentIndex === idx ? "bg-white scale-125" : "bg-white/50"
            }`}
          />
        ))}
      </div>

      {/* Arrows */}
      <button
        onClick={() =>
          goToSlide((currentIndex - 1 + slidesData.length) % slidesData.length)
        }
        className="absolute top-1/2 left-5 transform -translate-y-1/2 btn btn-circle btn-ghost text-white text-3xl"
      >
        ❮
      </button>
      <button
        onClick={() => goToSlide((currentIndex + 1) % slidesData.length)}
        className="absolute top-1/2 right-5 transform -translate-y-1/2 btn btn-circle btn-ghost text-white text-3xl"
      >
        ❯
      </button>
    </div>
  );
};

export default HeroSlider;
