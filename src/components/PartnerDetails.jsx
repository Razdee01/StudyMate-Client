import React, { use, useState } from "react";
import { useLoaderData } from "react-router";
import Swal from "sweetalert2";
import { AuthContext } from "../contexts/AuthContext";

const PartnerDetails = () => {
  const{user}=use(AuthContext)
  const partner = useLoaderData();
 const[req,setReq]=useState(false);
  const handleRequest = () => {
    
    fetch("http://localhost:3000/requests", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        partnerId: partner._id,
        partnerName: partner.name,
        partnerSubject: partner.subject,
        studyMode: partner.studyMode,
        availabilityTime: partner.availabilityTime,
        experienceLevel: partner.experienceLevel,
        partnerCount: partner.partnerCount+1,
        sent_by: user?.email,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success){
          Swal.fire({
            title: `Partner Request Sent to ${partner.name}!`,
            icon: "success",
            draggable: true,
          });
          setReq(true);
          partner.partnerCount += 1;
        }
      
      })
      .catch((error) => {
        console.error("Error:", error);
      });

  };
  
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
        <button
          onClick={handleRequest}
         disabled={req}
          className={`w-full py-2 rounded-xl shadow-md transition duration-300 ${
            req
              ? "bg-gray-400 text-white  "
              : "bg-green-600 hover:bg-green-700 text-white"
          }`}
        >
          {req ? "Request Sent" : "Send Partner Request"}
        </button>
      </div>
    </div>
  );
};

export default PartnerDetails;
