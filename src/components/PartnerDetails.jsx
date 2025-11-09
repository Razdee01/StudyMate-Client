import React from 'react';
import { useLoaderData } from 'react-router';

const PartnerDetails = () => {
    const partner=useLoaderData()
    console.log(partner);
    
    return (
      <div className="max-w-md mx-auto bg-white shadow-lg rounded-2xl p-6 transform transition duration-300 hover:scale-105">
        <div className="flex flex-col items-center text-center ">
          <img
            src={partner.profileimage}
            alt={partner.name}
            className="w-32 h-32 rounded-full border-4 border-green-500 shadow-md mb-4 object-cover"
          />

          <h2 className="text-2xl font-bold text-gray-800 mb-1">
            {partner.name}
          </h2>
          <p className="text-gray-500 text-sm mb-4">{partner.location}</p>

          <div className="w-full bg-gray-50 p-4 rounded-xl mb-4 text-left space-y-1">
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
              <span className="font-semibold text-gray-700">Experience:</span>{" "}
              {partner.experienceLevel}
            </p>
            <p>
              <span className="font-semibold text-gray-700">Rating:</span> ⭐{" "}
              {partner.rating}
            </p>
            <p>
              <span className="font-semibold text-gray-700">
                Partner Count:
              </span>{" "}
              {partner.partnerCount}
            </p>
          </div>

          <a
           
            className="bg-green-600 text-white px-6 py-2 rounded-xl shadow-md hover:bg-green-700 transition duration-300"
          >
            Contact Partner
          </a>
        </div>
      </div>
    );
};

export default PartnerDetails;