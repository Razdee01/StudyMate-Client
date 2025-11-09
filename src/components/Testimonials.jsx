import React from "react";

const Testimonials = () => {
  return (
    <section className="py-16 px-4 bg-white">
      <h2 className="text-3xl font-bold text-center mb-10">
        What Our Users Say
      </h2>
      <div className="max-w-5xl mx-auto grid gap-8 md:grid-cols-3">
        <div className="bg-gray-50 rounded-xl shadow-md p-6 text-center">
          <img
            src="https://i.pravatar.cc/150?img=5"
            alt="Sara Ahmed"
            className="w-20 h-20 rounded-full mb-4 mx-auto"
          />
          <p className="text-gray-700 mb-2">
            "StudyMate helped me find a partner for Physics. Now studying is
            fun!"
          </p>
          <p className="font-semibold">Sara Ahmed</p>
          <div className="text-yellow-400 mt-1">⭐⭐⭐⭐⭐</div>
        </div>

        <div className="bg-gray-50 rounded-xl shadow-md p-6 text-center">
          <img
            src="https://i.pravatar.cc/150?img=6"
            alt="Imran Khan"
            className="w-20 h-20 rounded-full mb-4 mx-auto"
          />
          <p className="text-gray-700 mb-2">
            "The matching system is excellent. I found someone with similar
            goals."
          </p>
          <p className="font-semibold">Imran Khan</p>
          <div className="text-yellow-400 mt-1">⭐⭐⭐⭐</div>
        </div>

        <div className="bg-gray-50 rounded-xl shadow-md p-6 text-center">
          <img
            src="https://i.pravatar.cc/150?img=7"
            alt="Nadia Rahman"
            className="w-20 h-20 rounded-full mb-4 mx-auto"
          />
          <p className="text-gray-700 mb-2">
            "I love how interactive and user-friendly the platform is."
          </p>
          <p className="font-semibold">Nadia Rahman</p>
          <div className="text-yellow-400 mt-1">⭐⭐⭐⭐⭐</div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
