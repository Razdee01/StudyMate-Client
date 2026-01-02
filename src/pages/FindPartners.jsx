import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router";
import Loading from "../components/Loading";

const FindPartners = () => {
  const [partners, setPartners] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("");
  const [selectedMode, setSelectedMode] = useState("");
  const [sortOrder, setSortOrder] = useState("expert"); // expert or beginner
  const [loading, setLoading] = useState(true);

  // Get unique options
  const subjects = [...new Set(partners.map((p) => p.subject))];
  const modes = [...new Set(partners.map((p) => p.studyMode))];

  useEffect(() => {
    axios
      .get("https://study-mate-server-ten.vercel.app/partners")
      .then((res) => {
        setPartners(res.data);
        setFiltered(res.data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  // Apply search + filters + sort (real-time)
  useEffect(() => {
    let result = [...partners];

    // Search
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(
        (p) =>
          p.name?.toLowerCase().includes(term) ||
          p.subject?.toLowerCase().includes(term)
      );
    }

    // Filter: Subject
    if (selectedSubject) {
      result = result.filter((p) => p.subject === selectedSubject);
    }

    // Filter: Study Mode
    if (selectedMode) {
      result = result.filter((p) => p.studyMode === selectedMode);
    }

    // Sort: Experience
    // Sort: Experience
    const rank = { Beginner: 2, Intermediate: 1, Expert: 3 }; // Higher = more experienced

    result.sort((a, b) => {
      const aRank = rank[a.experienceLevel] || 0;
      const bRank = rank[b.experienceLevel] || 0;

      if (sortOrder === "expert") {
        return bRank - aRank; // Descending: Expert (3) first
      } else {
        return aRank - bRank; // Ascending: Beginner (1) first
      }
    });

    setFiltered(result);
  }, [searchTerm, selectedSubject, selectedMode, sortOrder, partners]);

  if (loading) return <Loading />;

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <h1 className="text-4xl font-bold text-center mb-8 text-primary">
        Find Study Partners
      </h1>

      {/* Search + Filters */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
        <input
          type="text"
          placeholder="Search by name or subject..."
          className="input input-bordered"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <select
          className="select select-bordered"
          value={selectedSubject}
          onChange={(e) => setSelectedSubject(e.target.value)}
        >
          <option value="">All Subjects</option>
          {subjects.map((s) => (
            <option key={s}>{s}</option>
          ))}
        </select>

        <select
          className="select select-bordered"
          value={selectedMode}
          onChange={(e) => setSelectedMode(e.target.value)}
        >
          <option value="">All Study Modes</option>
          {modes.map((m) => (
            <option key={m}>{m}</option>
          ))}
        </select>

        <select
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
        >
          <option value="expert">Beginners First</option>
          <option value="beginner">Most Experienced First</option>
        </select>
      </div>

      {/* Cards */}
      {filtered.length === 0 ? (
        <p className="text-center text-xl text-gray-500 py-20">
          No partners found. Try changing filters!
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {filtered.map((partner) => (
            <div
              key={partner._id}
              className="card bg-base-100 shadow-xl hover:shadow-2xl transition h-full flex flex-col"
            >
              <figure className="px-6 pt-6">
                <img
                  src={
                    partner.profileimage ||
                    "https://i.ibb.co.com/Yc3Wm9n/default-avatar.png"
                  }
                  alt={partner.name}
                  className="rounded-full w-32 h-32 object-cover"
                />
              </figure>
              <div className="card-body text-center flex-1">
                <h2 className="card-title justify-center">{partner.name}</h2>
                <p>
                  <strong>Subject:</strong> {partner.subject}
                </p>
                <p>
                  <strong>Mode:</strong> {partner.studyMode}
                </p>
                <div className="badge badge-primary mt-2">
                  {partner.experienceLevel}
                </div>
                <div className="card-actions mt-4">
                  <Link
                    to={`/partners/${partner._id}`}
                    className="btn btn-primary w-full"
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
