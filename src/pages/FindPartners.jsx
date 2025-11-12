import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router";
import Loading from "../components/Loading";

const FindPartners = () => {
  const [partners, setPartners] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("asc"); 
  const [loading, setLoading] = useState(true);

 
  const experienceRank = {
    Beginner: 3,
    Intermediate: 2,
    Expert: 1,
  };

  useEffect(() => {
    axios
      .get("http://localhost:3000/partners")
      .then((res) => {
        setPartners(res.data);
        setLoading(false);
      })
      .catch(() => {
      
        setLoading(false);
      });
  }, []);

  // --- Filter + Sort Logic ---

  
  const filteredPartners = partners
    // 1️⃣ Search filter
    .filter((p) => {
      
      const term = searchTerm.toLowerCase();

      
      if (!searchTerm) {
        return partners;
      }

     
      const nameMatch = p.name?.toLowerCase().includes(term);
      const subjectMatch = p.subject?.toLowerCase().includes(term);

      
      return nameMatch || subjectMatch;
    })

   
    .sort((a, b) => {
   
      const aRank = experienceRank[a.experienceLevel] || 0;
      const bRank = experienceRank[b.experienceLevel] || 0;

      if (sortOrder === "asc") {
        return aRank - bRank;
      } else {
        return bRank - aRank;
      }
    });

  if (loading) return <Loading />;

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-3">
        {/* Sort Dropdown */}
        <div className="flex items-center gap-2">
          <label className="font-semibold">Sort by Experience:</label>
          <select
            className="select select-bordered select-sm"
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
          >
            <option value="asc"> High → Low</option>
            <option value="desc">Low → High </option>
          </select>
        </div>

        {/* Search Input */}
        <div className="flex items-center gap-2">
          <input
            type="text"
            placeholder="Search by name or subject..."
            className="input input-bordered input-sm w-64"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button
            className="btn btn-primary btn-sm"
            onClick={() => setSearchTerm(searchTerm.trim())}
          >
            Search
          </button>
        </div>
      </div>

      {/* Partner Cards Grid */}
      {filteredPartners.length === 0 ? (
        <p className="text-center text-gray-500 mt-10">
          😕 No partners found matching your search.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {filteredPartners.map((partner) => (
            <div
              key={partner.id || partner._id}
              className="card bg-base-100 shadow-md hover:shadow-lg transition duration-300 rounded-2xl overflow-hidden"
            >
              <figure className="px-4 pt-4">
                <img
                  src={partner.profileimage}
                  alt={partner.name}
                  className="rounded-xl w-32 h-32 object-cover"
                />
              </figure>
              <div className="card-body items-center text-center">
                <h2 className="card-title text-lg font-semibold">
                  {partner.name}
                </h2>
                <p className="text-sm text-gray-600">
                  <strong>Subject:</strong> {partner.subject}
                </p>
                <p className="text-sm text-gray-600">
                  <strong>Study Mode:</strong> {partner.studyMode}
                </p>
                <p className="text-sm text-gray-600">
                  <strong>Experience:</strong> {partner.experienceLevel}
                </p>
                <div className="card-actions mt-3">
                  <Link
                    to={`/partners/${partner._id}`}
                    className="btn btn-sm btn-outline btn-primary"
                  >
                    View Profile
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FindPartners;
