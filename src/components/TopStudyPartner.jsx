import React, { use } from "react";
import { Link } from "react-router";
import { Star, ArrowRight } from "lucide-react";

const TopStudyPartner = ({ topPartnersPromise }) => {
  const topPartnersData = use(topPartnersPromise);

  return (
    <section className="py-12 px-4 bg-base-200">
      <div className="container mx-auto">
        <h2 className="text-3xl font-extrabold text-center mb-10 text-base-content">
          Top <span className="text-primary">Study Partners</span>
        </h2>

        <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3">
          {topPartnersData.map((partner) => (
            <div
              key={partner._id}
              // Swapped bg-white for bg-base-100
              className="bg-base-100 rounded-2xl shadow-xl p-8 flex flex-col items-center text-center border border-base-300 hover:border-primary/50 transform transition duration-300 hover:-translate-y-2"
            >
              <div className="avatar mb-4">
                <div className="w-24 h-24 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                  <img
                    src={
                      partner.profileimage ||
                      "https://i.ibb.co/Yc3Wm9n/default-avatar.png"
                    }
                    alt={partner.name}
                  />
                </div>
              </div>

              <h3 className="text-xl font-bold mb-1 text-base-content">
                {partner.name}
              </h3>

              <div className="badge badge-primary badge-outline mb-4">
                {partner.subject}
              </div>

              <div className="space-y-1 mb-4">
                <p className="text-sm text-base-content/70">
                  <span className="font-semibold">Skill:</span>{" "}
                  {partner.experienceLevel}
                </p>
                <div className="flex items-center justify-center gap-1 text-orange-400 font-bold">
                  <Star size={16} fill="currentColor" />
                  <span>{partner.rating}</span>
                </div>
              </div>

              <Link
                to={`/partners/${partner._id}`}
                className="btn btn-primary btn-block gap-2 group"
              >
                View Profile
                <ArrowRight
                  size={18}
                  className="transition-transform group-hover:translate-x-1"
                />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TopStudyPartner;
