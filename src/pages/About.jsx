import React from "react";
import { Users, Target, Rocket, ShieldCheck } from "lucide-react";
import { Link } from "react-router"

const About = () => {
  return (
    <div className="min-h-screen bg-base-200">
      {/* Hero Section */}
      <div className="hero bg-base-100 py-16">
        <div className="hero-content text-center">
          <div className="max-w-3xl">
            <h1 className="text-5xl font-extrabold text-primary mb-6">
              About StudyMate
            </h1>
            <p className="text-lg text-base-content/80 leading-relaxed">
              We believe that learning is a collaborative journey. StudyMate was
              built to bridge the gap between ambitious learners, making it
              easier than ever to find the perfect study partner based on your
              subjects, goals, and schedule.
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-16">
        {/* Mission & Vision */}
        <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
          <div>
            <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
              <Target className="text-primary w-8 h-8" /> Our Mission
            </h2>
            <p className="text-base-content/70 text-lg mb-4">
              To empower students and professionals worldwide by providing a
              platform where knowledge sharing is just a click away. Whether
              you're tackling a complex coding project or preparing for finals,
              StudyMate helps you find your tribe.
            </p>
            <ul className="space-y-3">
              <li className="flex items-center gap-2">
                <ShieldCheck className="text-success w-5 h-5" />
                Verified user community
              </li>
              <li className="flex items-center gap-2">
                <ShieldCheck className="text-success w-5 h-5" />
                Subject-specific matching
              </li>
            </ul>
          </div>
          <div className="card bg-primary text-primary-content shadow-2xl p-8 rotate-1">
            <h2 className="text-3xl font-bold mb-4">Why StudyMate?</h2>
            <p className="opacity-90 italic">
              "Studying alone can be tough. StudyMate transformed my learning
              experience by connecting me with a peer who was just as passionate
              about Calculus as I am. We kept each other accountable!"
            </p>
            <div className="divider divider-neutral"></div>
            <p className="font-semibold">
              — Sarah J., Computer Science Student
            </p>
          </div>
        </div>

        {/* Features / How it Works */}
        <h2 className="text-4xl font-bold text-center mb-12">How It Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="card bg-base-100 shadow-xl border-t-4 border-primary hover:translate-y-[-5px] transition-transform">
            <div className="card-body items-center text-center">
              <div className="bg-primary/10 p-4 rounded-full mb-4 text-primary">
                <User className="w-8 h-8" />
              </div>
              <h3 className="card-title text-2xl">Create Profile</h3>
              <p>
                Set up your preferences, subjects you're mastering, and subjects
                you need help with.
              </p>
            </div>
          </div>

          <div className="card bg-base-100 shadow-xl border-t-4 border-primary hover:translate-y-[-5px] transition-transform">
            <div className="card-body items-center text-center">
              <div className="bg-primary/10 p-4 rounded-full mb-4 text-primary">
                <Users className="w-8 h-8" />
              </div>
              <h3 className="card-title text-2xl">Discover Partners</h3>
              <p>
                Filter through a community of learners based on mode
                (online/offline) and skill level.
              </p>
            </div>
          </div>

          <div className="card bg-base-100 shadow-xl border-t-4 border-primary hover:translate-y-[-5px] transition-transform">
            <div className="card-body items-center text-center">
              <div className="bg-primary/10 p-4 rounded-full mb-4 text-primary">
                <Rocket className="w-8 h-8" />
              </div>
              <h3 className="card-title text-2xl">Connect & Grow</h3>
              <p>
                Send requests, start studying together, and achieve your
                academic goals faster.
              </p>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-20 card bg-base-100 shadow-2xl overflow-hidden">
          <div className="flex flex-col lg:flex-row">
            <div className="bg-primary/70 p-12 lg:w-1/3 flex flex-col justify-center items-center text-primary-content text-center">
              <h2 className="text-4xl font-bold mb-4">Join Us Today</h2>
              <p className="mb-6 opacity-90">
                Start your journey toward collaborative success.
              </p>
              <Link
                to="/create-partner-profile"
                className="btn btn-primary btn-wide border-none"
              >
                Get Started
              </Link>
            </div>
            <div className="p-12 lg:w-2/3">
              <h3 className="text-2xl font-bold mb-4">A Note from the Team</h3>
              <p className="text-base-content/70">
                StudyMate was designed with the student's struggle in mind. We
                know that isolation can be the biggest barrier to learning. Our
                platform is continuously evolving to bring you features like
                study groups, resource sharing, and more. Thank you for being
                part of our community!
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Simple icon for the "How it Works" section
const User = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    className={className}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
    />
  </svg>
);

export default About;
