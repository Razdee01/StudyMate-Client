import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router";
import Loading from "../components/Loading";
import { Search, Filter, ArrowUpDown } from "lucide-react";

const FindPartners = () => {
  const [partners, setPartners] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("");
  const [selectedMode, setSelectedMode] = useState("");
  const [sortOrder, setSortOrder] = useState("desc"); // desc (expert) or asc (beginner)
  const [loading, setLoading] = useState(true);

  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8; // Shows exactly 2 rows on desktop (4 per row)

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

  useEffect(() => {
    let result = [...partners];

    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(
        (p) =>
          p.name?.toLowerCase().includes(term) ||
          p.subject?.toLowerCase().includes(term)
      );
    }

    if (selectedSubject)
      result = result.filter((p) => p.subject === selectedSubject);
    if (selectedMode)
      result = result.filter((p) => p.studyMode === selectedMode);

    const rank = { Beginner: 2, Intermediate: 1, Expert: 3 };
    result.sort((a, b) => {
      const aRank = rank[a.experienceLevel] || 0;
      const bRank = rank[b.experienceLevel] || 0;
      return sortOrder === "desc" ? bRank - aRank : aRank - bRank;
    });

    setFiltered(result);
    setCurrentPage(1); // Reset to page 1 when filters change
  }, [searchTerm, selectedSubject, selectedMode, sortOrder, partners]);

  // Logic for Pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filtered.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filtered.length / itemsPerPage);

  if (loading) return <Loading />;

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 min-h-screen">
      <div className="text-center mb-12">
        <h1 className="text-5xl font-black text-base-content mb-4 tracking-tight">
          Find Your <span className="text-primary">Study Mate</span>
        </h1>
        <p className="text-base-content/60 font-medium">
          Browse skilled partners ready to collaborate.
        </p>
      </div>

      {/* Filter Bar */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-12 bg-base-100 p-6 rounded-3xl shadow-sm border border-base-300">
        <div className="relative">
          <Search
            className="absolute left-3 top-3.5 text-base-content/40"
            size={18}
          />
          <input
            type="text"
            placeholder="Search by name or subject"
            className="input input-bordered w-full pl-10 rounded-2xl"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <select
          className="select select-bordered rounded-2xl font-bold"
          value={selectedSubject}
          onChange={(e) => setSelectedSubject(e.target.value)}
        >
          <option value="">All Subjects</option>
          {subjects.map((s) => (
            <option key={s}>{s}</option>
          ))}
        </select>

        <select
          className="select select-bordered rounded-2xl font-bold"
          value={selectedMode}
          onChange={(e) => setSelectedMode(e.target.value)}
        >
          <option value="">All Modes</option>
          {modes.map((m) => (
            <option key={m}>{m}</option>
          ))}
        </select>

        <select
          className="select select-bordered rounded-2xl font-bold text-primary"
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
        >
          <option value="desc">Exp: Low to High</option>
          <option value="asc">Exp: High to Low</option>
        </select>
      </div>

      {/* Listing Grid */}
      {currentItems.length === 0 ? (
        <div className="text-center py-20">
          <div className="bg-base-200 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
            <Filter size={32} className="opacity-20" />
          </div>
          <p className="text-xl font-bold opacity-40">
            No partners match your filters.
          </p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {currentItems.map((partner) => (
              <div
                key={partner._id}
                className="card bg-base-100 border border-base-300 shadow-sm hover:shadow-xl transition-all duration-300 rounded-[2rem] overflow-hidden group"
              >
                <figure className="pt-8 px-8">
                  <div className="avatar ring ring-primary ring-offset-base-100 ring-offset-4 rounded-full overflow-hidden w-24 h-24">
                    <img
                      src={
                        partner.profileimage ||
                        "https://i.ibb.co.com/Yc3Wm9n/default-avatar.png"
                      }
                      alt={partner.name}
                    />
                  </div>
                </figure>
                <div className="card-body p-6 text-center">
                  <h2 className="text-xl font-black truncate">
                    {partner.name}
                  </h2>
                  <div className="flex flex-col gap-1 my-3">
                    <span className="text-sm font-bold opacity-50 uppercase tracking-widest">
                      {partner.subject}
                    </span>
                    <span className="text-xs font-medium text-primary">
                      {partner.studyMode}
                    </span>
                  </div>
                  <div
                    className={`badge badge-outline font-bold mx-auto mb-4 ${
                      partner.experienceLevel === "Expert"
                        ? "text-warning"
                        : "text-success"
                    }`}
                  >
                    {partner.experienceLevel}
                  </div>
                  <div className="card-actions">
                    <Link
                      to={`/partners/${partner._id}`}
                      className="btn btn-primary btn-block rounded-2xl shadow-lg shadow-primary/20"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div className="flex justify-center mt-16">
              <div className="join bg-base-100 shadow-sm border border-base-300 rounded-2xl p-1">
                {[...Array(totalPages)].map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentPage(index + 1)}
                    className={`join-item btn btn-md border-none ${
                      currentPage === index + 1
                        ? "btn-primary rounded-xl"
                        : "btn-ghost rounded-xl opacity-50"
                    }`}
                  >
                    {index + 1}
                  </button>
                ))}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default FindPartners;
