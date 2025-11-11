import React from "react";
import { useNavigate } from "react-router";

const ErrorPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-linear-to-r from-sky-700 to-indigo-900 text-white px-4">
      <h1 className="text-6xl font-extrabold mb-4">404</h1>
      <h2 className="text-3xl sm:text-4xl font-semibold mb-6 text-center">
        Oops! Page Not Found
      </h2>
      <p className="text-center text-lg sm:text-xl mb-8 max-w-lg">
        The page you are looking for doesn't exist or has been moved. Let's get
        you back to StudyMate!
      </p>
      <button onClick={() => navigate("/")} className="btn btn-primary btn-lg">
        Go to Home
      </button>
      <div className="mt-10 text-center text-sky-200">
        © {new Date().getFullYear()} StudyMate
      </div>
    </div>
  );
};

export default ErrorPage;
