import React from "react";
import { UserPlus, Search, Users } from "lucide-react";

const HowItWorks = () => {
  return (
    
    <section className="py-20 px-4 bg-base-100 transition-colors duration-300">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-extrabold text-center mb-4 text-base-content">
          How <span className="text-primary">StudyMate</span> Works
        </h2>
        <p className="text-center text-base-content/60 mb-12 max-w-2xl mx-auto">
          Finding the perfect study partner is easy. Follow these three simple
          steps to start your collaborative learning journey.
        </p>

        <div className="grid gap-8 md:grid-cols-3">
          {/* Step 1 */}
          <div className="bg-base-200 rounded-2xl shadow-lg p-8 text-center border border-transparent hover:border-primary/30 transition-all group">
            <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 text-primary group-hover:bg-primary group-hover:text-white transition-colors">
              <UserPlus size={32} />
            </div>
            <h3 className="text-2xl font-bold mb-3 text-base-content">
              Sign Up & Create Profile
            </h3>
            <p className="text-base-content/70 leading-relaxed">
              Register and add your subjects, skills, and preferences to help
              others find you.
            </p>
          </div>

          {/* Step 2 */}
          <div className="bg-base-200 rounded-2xl shadow-lg p-8 text-center border border-transparent hover:border-primary/30 transition-all group">
            <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 text-primary group-hover:bg-primary group-hover:text-white transition-colors">
              <Search size={32} />
            </div>
            <h3 className="text-2xl font-bold mb-3 text-base-content">
              Find Study Partners
            </h3>
            <p className="text-base-content/70 leading-relaxed">
              Search and match with partners based on specific subjects, levels,
              or location.
            </p>
          </div>

          {/* Step 3 */}
          <div className="bg-base-200 rounded-2xl shadow-lg p-8 text-center border border-transparent hover:border-primary/30 transition-all group">
            <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 text-primary group-hover:bg-primary group-hover:text-white transition-colors">
              <Users size={32} />
            </div>
            <h3 className="text-2xl font-bold mb-3 text-base-content">
              Collaborate & Learn
            </h3>
            <p className="text-base-content/70 leading-relaxed">
              Connect, schedule sessions, and achieve your academic goals
              together.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
