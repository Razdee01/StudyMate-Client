import React, { use } from "react";
import { Link } from "react-router";

const TopStudyPartner = ({ topPartnersPromise }) => {
  const topPartnersData = use(topPartnersPromise);
 
  

  return (
    <>
      <div>
        <section className="py-8 px-4 bg-gray-50 ">
          <h2 className="text-2xl font-bold text-center mb-6">
            Top Study Partners
          </h2>
          <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
            {topPartnersData.map((partner) => (
              <div
                key={partner.id}
                className="bg-white rounded-xl shadow-md p-6 flex flex-col items-center text-center transform transition duration-300 hover:scale-105"
              >
                <img
                  src={partner.profileimage}
                  alt={partner.name}
                  className="w-24 h-24 rounded-full mb-4"
                />
                <h3 className="text-lg font-semibold mb-2">{partner.name}</h3>
                <p className="text-sm text-gray-600 mb-2">
                  Subjects: {partner.subject}
                </p>
                <p className="text-sm text-gray-600 mb-2">
                  Skill: {partner.experienceLevel}
                </p>
                <p className="text-yellow-500 font-semibold mb-4">
                  ⭐ {partner.rating}
                </p>
               
                  <Link
                    to={`/partners/${partner._id}`}
                    className="bg-primary text-white px-4 py-2 rounded hover:bg-primary-dark  transition-colors"
                  >
                    View Profile
                  </Link>
                
              </div>
            ))}
          </div>
        </section>
      </div>
    </>
  );
};

export default TopStudyPartner;
