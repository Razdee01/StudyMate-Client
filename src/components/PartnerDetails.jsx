import React, { use, useState } from "react";
import { useLoaderData } from "react-router";
import Swal from "sweetalert2";
import { AuthContext } from "../contexts/AuthContext";
import { MapPin, BookOpen, Clock, Award, Users, Star } from "lucide-react";

const PartnerDetails = () => {
  const { user } = use(AuthContext);
  const partner = useLoaderData();
  const [req, setReq] = useState(false);

  const handleRequest = () => {
    if (user?.email === partner.email) {
      Swal.fire({
        icon: "warning",
        title: "Action Not Allowed",
        text: "You cannot send a request to yourself!",
        confirmButtonColor: "#0ea5e9",
      });
      return;
    }

    fetch("https://study-mate-server-ten.vercel.app/requests", {
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
        partnerCount: partner.partnerCount + 1,
        sent_by: user?.email,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          Swal.fire({
            title: `Success!`,
            text: `Partner Request Sent to ${partner.name}`,
            icon: "success",
            confirmButtonColor: "#0ea5e9",
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
    // Changed bg-gray-100 to bg-base-200
    <div className="min-h-screen flex items-center justify-center bg-base-200 p-4 transition-colors duration-300">
      {/* Changed bg-white to bg-base-100 */}
      <div className="bg-base-100 shadow-2xl rounded-3xl p-8 w-full max-w-lg border border-base-300">
        {/* Profile Section */}
        <div className="flex flex-col items-center text-center mb-8">
          <div className="avatar mb-4">
            <div className="w-32 h-32 rounded-full ring ring-primary ring-offset-base-100 ring-offset-4">
              <img
                src={partner.profileimage}
                alt={partner.name}
                className="object-cover"
              />
            </div>
          </div>
          <h2 className="text-3xl font-bold text-base-content mb-1">
            {partner.name}
          </h2>
          <div className="flex items-center gap-2 text-orange-400 font-bold mb-2">
            <Star size={18} fill="currentColor" />
            <span>{partner.rating} / 5.0</span>
          </div>
          <p className="flex items-center justify-center gap-1 text-base-content/60 text-sm italic">
            <MapPin size={14} /> {partner.location}
          </p>
        </div>

        {/* Details Section - Changed bg-gray-50 to bg-base-200 */}
        <div className="bg-base-200 p-6 rounded-2xl space-y-4 mb-8">
          <div className="flex items-center justify-between border-b border-base-300 pb-2">
            <span className="flex items-center gap-2 font-semibold text-base-content/70">
              <BookOpen size={18} className="text-primary" /> Subject
            </span>
            <span className="text-base-content font-medium">
              {partner.subject}
            </span>
          </div>

          <div className="flex items-center justify-between border-b border-base-300 pb-2">
            <span className="flex items-center gap-2 font-semibold text-base-content/70">
              <Users size={18} className="text-primary" /> Mode
            </span>
            <span
              className={`badge ${
                partner.studyMode === "Online"
                  ? "badge-primary"
                  : "badge-secondary"
              } badge-outline`}
            >
              {partner.studyMode}
            </span>
          </div>

          <div className="flex items-center justify-between border-b border-base-300 pb-2">
            <span className="flex items-center gap-2 font-semibold text-base-content/70">
              <Clock size={18} className="text-primary" /> Availability
            </span>
            <span className="text-base-content">
              {partner.availabilityTime}
            </span>
          </div>

          <div className="flex items-center justify-between border-b border-base-300 pb-2">
            <span className="flex items-center gap-2 font-semibold text-base-content/70">
              <Award size={18} className="text-primary" /> Level
            </span>
            <span className="text-base-content">{partner.experienceLevel}</span>
          </div>

          <div className="flex items-center justify-between">
            <span className="flex items-center gap-2 font-semibold text-base-content/70">
              <Users size={18} className="text-primary" /> Total Partners
            </span>
            <span className="text-base-content font-bold">
              {partner.partnerCount}
            </span>
          </div>
        </div>

        {/* Action Button - Changed green-600 to btn-primary */}
        <button
          onClick={handleRequest}
          disabled={req}
          className={`btn btn-block btn-lg rounded-2xl transition-all duration-300 ${
            req
              ? "btn-disabled bg-base-300 text-base-content/30"
              : "btn-primary text-white shadow-lg hover:shadow-primary/40"
          }`}
        >
          {req ? (
            <span className="flex items-center gap-2">✓ Request Sent</span>
          ) : (
            "Send Partner Request"
          )}
        </button>
      </div>
    </div>
  );
};

export default PartnerDetails;
