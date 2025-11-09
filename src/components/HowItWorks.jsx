import React from "react";

const HowItWorks = () => {
  return (
    <section className="py-16 px-4 bg-gray-100">
      <h2 className="text-3xl font-bold text-center mb-10">How It Works</h2>
      <div className="max-w-5xl mx-auto grid gap-8 md:grid-cols-3">
        <div className="bg-white rounded-xl shadow-md p-6 text-center">
          <div className="text-4xl mb-4">👤</div>
          <h3 className="text-xl font-semibold mb-2">
            Sign Up & Create Profile
          </h3>
          <p className="text-gray-600">
            Register and add your subjects, skills, and preferences.
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6 text-center">
          <div className="text-4xl mb-4">🔍</div>
          <h3 className="text-xl font-semibold mb-2">Find Study Partners</h3>
          <p className="text-gray-600">
            Search and match with partners based on subjects or location.
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6 text-center">
          <div className="text-4xl mb-4">🤝</div>
          <h3 className="text-xl font-semibold mb-2">Collaborate & Learn</h3>
          <p className="text-gray-600">
            Connect, schedule sessions, and achieve your learning goals.
          </p>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
