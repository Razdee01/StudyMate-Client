import React from "react";

const TopStudyPartner = () => {
    const topPartners = [
      {
        id: 1,
        name: "Alice Johnson",
        profileImg: "https://i.pravatar.cc/150?img=1",
        subjects: ["Math", "Physics"],
        skill: "Expert",
        rating: 4.8,
      },
      {
        id: 2,
        name: "Bob Smith",
        profileImg: "https://i.pravatar.cc/150?img=2",
        subjects: ["Chemistry", "Biology"],
        skill: "Intermediate",
        rating: 4.5,
      },
      {
        id: 3,
        name: "Carol Lee",
        profileImg: "https://i.pravatar.cc/150?img=3",
        subjects: ["English", "History"],
        skill: "Advanced",
        rating: 4.9,
      },
    ];
  return (
    <div>
      <section className="py-8 px-4 bg-gray-50">
        <h2 className="text-2xl font-bold text-center mb-6">
          Top Study Partners
        </h2>
        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
          {topPartners.map((partner) => (
            <div
              key={partner.id}
              className="bg-white rounded-xl shadow-md p-6 flex flex-col items-center text-center hover:shadow-xl transition-shadow duration-300"
            >
              <img
                src={partner.profileImg}
                alt={partner.name}
                className="w-24 h-24 rounded-full mb-4"
              />
              <h3 className="text-lg font-semibold mb-2">{partner.name}</h3>
              <p className="text-sm text-gray-600 mb-2">
                Subjects: {partner.subjects.join(", ")}
              </p>
              <p className="text-sm text-gray-600 mb-2">
                Skill: {partner.skill}
              </p>
              <p className="text-yellow-500 font-semibold mb-4">
                ⭐ {partner.rating}
              </p>
              <button className="bg-primary text-white px-4 py-2 rounded hover:bg-primary-dark transition-colors">
                View Profile
              </button>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default TopStudyPartner;
