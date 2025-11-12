import React from "react";
import { useLoaderData } from "react-router";

const PartnerDetails = () => {
  const partner = useLoaderData();
 
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-lg transform transition duration-300 hover:scale-105">
        {/* Profile Section */}
        <div className="flex flex-col items-center text-center mb-6">
          <img
            src={partner.profileimage}
            alt={partner.name}
            className="w-32 h-32 rounded-full border-4 border-green-500 shadow-md mb-4 object-cover"
          />
          <h2 className="text-2xl font-bold text-gray-800 mb-1">
            {partner.name}
          </h2>
          <p className="text-yellow-500 mb-2">⭐ {partner.rating}</p>
          <p className="text-gray-500 text-sm">{partner.location}</p>
        </div>

        {/* Details Section */}
        <div className="bg-gray-50 p-4 rounded-xl space-y-2 mb-6">
          <p>
            <span className="font-semibold text-gray-700">Subject:</span>{" "}
            {partner.subject}
          </p>
          <p>
            <span className="font-semibold text-gray-700">Study Mode:</span>{" "}
            {partner.studyMode}
          </p>
          <p>
            <span className="font-semibold text-gray-700">Availability:</span>{" "}
            {partner.availabilityTime}
          </p>
          <p>
            <span className="font-semibold text-gray-700">
              Experience Level:
            </span>{" "}
            {partner.experienceLevel}
          </p>
          <p>
            <span className="font-semibold text-gray-700">Partner Count:</span>{" "}
            {partner.partnerCount}
          </p>
        </div>

        {/* Action Button */}
        <button className="w-full bg-green-600 text-white py-2 rounded-xl shadow-md hover:bg-green-700 transition duration-300">
          Send Partner Request
        </button>
      </div>
    </div>
  );
};

export default PartnerDetails;
