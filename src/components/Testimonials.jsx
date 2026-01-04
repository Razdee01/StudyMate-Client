import React from "react";
import { Quote } from "lucide-react";

const Testimonials = () => {
  const reviews = [
    {
      name: "Sara Ahmed",
      img: "https://i.pravatar.cc/150?img=5",
      text: "StudyMate helped me find a partner for Physics. Now studying is fun!",
      rating: 5,
    },
    {
      name: "Imran Khan",
      img: "https://i.pravatar.cc/150?img=6",
      text: "The matching system is excellent. I found someone with similar goals.",
      rating: 4,
    },
    {
      name: "Nadia Rahman",
      img: "https://i.pravatar.cc/150?img=7",
      text: "I love how interactive and user-friendly the platform is.",
      rating: 5,
    },
  ];

  return (
    // Changed bg-white to bg-base-100
    <section className="py-20 px-4 bg-base-100 transition-colors duration-300">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-extrabold text-center mb-12 text-base-content">
          What Our <span className="text-primary">Users Say</span>
        </h2>

        <div className="grid gap-8 md:grid-cols-3">
          {reviews.map((review, index) => (
            // Changed bg-gray-50 to bg-base-200
            <div
              key={index}
              className="bg-base-200 rounded-3xl p-8 shadow-lg relative group border border-transparent hover:border-primary/20 transition-all"
            >
              {/* Decorative Quote Icon */}
              <div className="absolute top-4 right-6 text-primary/10 group-hover:text-primary/30 transition-colors">
                <Quote size={40} />
              </div>

              <div className="flex flex-col items-center text-center">
                <div className="avatar mb-4">
                  <div className="w-20 h-20 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                    <img src={review.img} alt={review.name} />
                  </div>
                </div>

                <p className="text-base-content/80 italic mb-6 leading-relaxed">
                  "{review.text}"
                </p>

                <div className="mt-auto">
                  <p className="font-bold text-lg text-base-content">
                    {review.name}
                  </p>
                  <div className="rating rating-sm mt-2">
                    {[...Array(5)].map((_, i) => (
                      <input
                        key={i}
                        type="radio"
                        className={`mask mask-star-2 ${
                          i < review.rating ? "bg-orange-400" : "bg-base-300"
                        }`}
                        disabled
                        checked={i === review.rating - 1}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
