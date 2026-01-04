import React, { useContext, useEffect, useState, useMemo } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { useNavigate, Link } from "react-router";
import {
  BarChart3,
  User,
  Users,
  Menu,
  LogOut,
  LayoutDashboard,
  Mail,
  MapPin,
  Briefcase,
  Clock,
  Calendar,
} from "lucide-react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import Loading from "./Loading";
import axios from "axios";
import Swal from "sweetalert2";

const DashBoard = () => {
  const {
    user,
    loading: authLoading,
    LogOut: handleLogOut,
  } = useContext(AuthContext);
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("overview");
  const [profile, setProfile] = useState(null);
  const [connections, setConnections] = useState([]);
  const [dashLoading, setDashLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
 
  const [profileLoading, setProfileLoading] = useState(true); 


  useEffect(() => {
    if (user?.email) {
      setProfileLoading(true);
      axios
        .get(
          `https://study-mate-server-ten.vercel.app/my-profile?email=${user.email}`
        )
        .then((res) => {
          setProfile(res.data);
          setProfileLoading(false);
        })
        .catch((err) => {
          console.error("Profile fetch error:", err);
          setProfileLoading(false); // Stop loading even if it fails
        });
    }
  }, [user]);
  useEffect(() => {
    if (!authLoading && !user) navigate("/login");
  }, [user, authLoading, navigate]);
  useEffect(() => {
    // Wait until BOTH Firebase (loading) and your MongoDB (profileLoading) are done
    if (!authLoading && !user) {
      navigate("/login");
      return;
    }

    // ONLY redirect if we are sure the user is logged in AND
    // the database check is finished and returned nothing.
    if (!authLoading && user && profile === null && !profileLoading) {
      Swal.fire({
        title: "Profile Required",
        text: "Please set up your partner profile first!",
        icon: "info",
      });
      navigate("/create-partner-profile");
    }
  }, [user, profile, authLoading, navigate, profileLoading]);
  useEffect(() => {
    if (user?.email) {
      setDashLoading(true);
      const fetchProfile = axios.get(
        `https://study-mate-server-ten.vercel.app/my-profile?email=${user.email}`
      );
      const fetchRequests = axios.get(
        `https://study-mate-server-ten.vercel.app/requests/sent/${user.email}`
      );

      Promise.all([fetchProfile, fetchRequests])
        .then(([profRes, connRes]) => {
          setProfile(profRes.data);
          setConnections(Array.isArray(connRes.data) ? connRes.data : []);
        })
        .finally(() => setDashLoading(false));
    }
  }, [user]);

  const chartData = useMemo(() => {
    if (!connections.length)
      return [
        { month: "Jan", connections: 0 },
        { month: "Feb", connections: 0 },
      ];
    const monthlyCount = {};
    connections.forEach((conn) => {
      const date = conn.date ? new Date(conn.date) : new Date();
      const monthKey = date.toLocaleString("default", { month: "short" });
      monthlyCount[monthKey] = (monthlyCount[monthKey] || 0) + 1;
    });
    let cumulative = 0;
    return Object.keys(monthlyCount).map((month) => {
      cumulative += monthlyCount[month];
      return { month, connections: cumulative };
    });
  }, [connections]);

  if (authLoading || dashLoading) return <Loading />;
  if (!user) return null;
  const handleUpdateProfile = async (e) => {
    e.preventDefault();

    // Collect data from form fields
    const updatedData = {
      name: e.target.name.value,
      subject: e.target.subject.value,
      location: e.target.location.value,
      experienceLevel: e.target.experience.value, // Map form 'experience' to DB 'experienceLevel'
    };

    try {
      const res = await axios.patch(
        `https://study-mate-server-ten.vercel.app/update-profile?email=${user.email}`,
        updatedData
      );

      if (res.data.modifiedCount > 0) {
        // 1. Refresh the local state so the UI updates immediately
        setProfile({ ...profile, ...updatedData });
        // 2. Close the edit form
        setIsEditing(false);
        // 3. Show success message
        Swal.fire({
          icon: "success",
          title: "Profile Updated",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    } catch (error) {
      console.error("Update failed", error);
      Swal.fire(
        "Error",
        "Failed to update profile. Please try again.",
        "error"
      );
    }
  };
  return (
    <div className="min-h-screen bg-base-200">
      <div className="drawer lg:drawer-open">
        <input
          id="dashboard-drawer"
          type="checkbox"
          className="drawer-toggle"
        />

        <div className="drawer-content flex flex-col">
          {/* Top Nav */}
          <div className="navbar bg-base-100 border-b border-base-300 px-6 sticky top-0 z-10">
            <div className="flex-1">
              <label
                htmlFor="dashboard-drawer"
                className="btn btn-ghost lg:hidden mr-2"
              >
                <Menu />
              </label>
              <h1 className="text-xl font-black text-primary uppercase tracking-tighter">
                Dashboard
              </h1>
            </div>
            <div className="flex items-center gap-3">
              <span className="hidden md:block font-bold text-sm opacity-70">
                {profile?.name || user?.displayName || "New Student"}
              </span>
              <div className="avatar">
                <div className="w-10 rounded-full ring ring-primary ring-offset-2">
                  <img
                    src={
                      profile?.profileimage ||
                      user?.photoURL ||
                      "https://i.ibb.co/Yc3Wm9n/default-avatar.png"
                    }
                    alt="Avatar"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="p-6 lg:p-10 space-y-8">
            {/* OVERVIEW TAB */}
            {activeTab === "overview" && (
              <div>
              {!profile && (
                <div className="alert alert-info shadow-lg mb-8 rounded-2xl border-none bg-primary text-white">
                  <div>
                    <h3 className="font-bold">Welcome to StudyMate!</h3>
                    <div className="text-xs opacity-90">You haven't created your Study Partner profile yet. Complete it to start connecting!</div>
                  </div>
                  <div className="flex-none">
                    <Link to="/create-partner-profile" className="btn btn-sm btn-ghost bg-white/20 hover:bg-white/40 border-none text-white uppercase font-black">
                      Complete Profile
                    </Link>
                  </div>
                </div>
              )}
              <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
                  <div className="stat bg-base-100 shadow-sm border border-base-300 rounded-2xl">
                    <div className="stat-title font-bold text-xs uppercase">
                      Total Sent
                    </div>
                    <div className="stat-value text-primary text-3xl">
                      {connections.length}
                    </div>
                    <div className="stat-desc text-success">
                      Active Requests
                    </div>
                  </div>
                  <div className="stat bg-base-100 shadow-sm border border-base-300 rounded-2xl">
                    <div className="stat-title font-bold text-xs uppercase">
                      Status
                    </div>
                    <div className="stat-value text-warning text-3xl">
                      Pending
                    </div>
                  </div>
                  <div className="stat bg-base-100 shadow-sm border border-base-300 rounded-2xl overflow-hidden">
                    <div className="stat-title font-bold text-xs uppercase">
                      Subject
                    </div>
                    <div
                      className="stat-value text-success text-2xl truncate"
                      title={profile?.subject}
                    >
                      {profile?.subject || "N/A"}
                    </div>
                  </div>
                  <div className="stat bg-base-100 shadow-sm border border-base-300 rounded-2xl">
                    <div className="stat-title font-bold text-xs uppercase">
                      Growth
                    </div>
                    <div className="stat-value text-info text-3xl">
                      {connections.length > 0 ? "+100%" : "0%"}
                    </div>
                  </div>
                </div>

                <div className="card bg-base-100 shadow-sm border border-base-300 mb-10">
                  <div className="card-body">
                    <h2 className="card-title font-black mb-4">
                      Connection Trends
                    </h2>
                    <div className="h-[300px]">
                      <ResponsiveContainer width="99%" height="100%">
                        <AreaChart data={chartData}>
                          <defs>
                            <linearGradient
                              id="colorC"
                              x1="0"
                              y1="0"
                              x2="0"
                              y2="1"
                            >
                              <stop
                                offset="5%"
                                stopColor="#0ea5e9"
                                stopOpacity={0.3}
                              />
                              <stop
                                offset="95%"
                                stopColor="#0ea5e9"
                                stopOpacity={0}
                              />
                            </linearGradient>
                          </defs>
                          <CartesianGrid
                            strokeDasharray="3 3"
                            vertical={false}
                            strokeOpacity={0.1}
                          />
                          <XAxis
                            dataKey="month"
                            axisLine={false}
                            tickLine={false}
                          />
                          <YAxis hide />
                          <Tooltip
                            contentStyle={{
                              borderRadius: "12px",
                              border: "none",
                            }}
                          />
                          <Area
                            type="monotone"
                            dataKey="connections"
                            stroke="#0ea5e9"
                            strokeWidth={3}
                            fill="url(#colorC)"
                          />
                        </AreaChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                </div>
                {/* Dynamic Data Table */}
                <div className="card bg-base-100 shadow-sm border border-base-300">
                  <div className="card-body p-0 overflow-hidden">
                    <div className="p-6 border-b border-base-300">
                      <h2 className="text-xl font-black">
                        Recent Activity Log
                      </h2>
                    </div>
                    <div className="overflow-x-auto">
                      <table className="table w-full">
                        <thead className="bg-base-200/50">
                          <tr className="text-base-content/60 uppercase text-xs">
                            <th>Partner</th>
                            <th>Subject</th>
                            <th>Study Mode</th>
                            <th>Status</th>
                          </tr>
                        </thead>
                        <tbody>
                          {connections.length > 0 ? (
                            connections.slice(0, 5).map((conn, i) => (
                              <tr key={i} className="hover:bg-base-200/40">
                                <td className="font-bold">
                                  {conn.partnerName}
                                </td>
                                <td>
                                  <span className="badge badge-ghost font-medium">
                                    {conn.partnerSubject}
                                  </span>
                                </td>
                                <td>{conn.studyMode}</td>
                                <td>
                                  <div className="badge badge-warning badge-sm font-bold uppercase">
                                    Pending
                                  </div>
                                </td>
                              </tr>
                            ))
                          ) : (
                            <tr>
                              <td
                                colSpan="4"
                                className="text-center py-10 opacity-50 italic"
                              >
                                No data found.
                              </td>
                            </tr>
                          )}
                        </tbody>
                      </table>
                    </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* PROFILE TAB - Now Full and Rich */}
            {activeTab === "profile" && (
              <div className="animate-in fade-in duration-500 max-w-4xl mx-auto">
                <div className="bg-base-100 rounded-3xl shadow-sm border border-base-300 overflow-hidden">
                  {/* Decorative Header */}
                  <div className="h-32 bg-linear-to-r from-primary to-blue-600"></div>

                  <div className="px-8 pb-8">
                    <div className="relative -mt-16 mb-6 flex justify-between items-end">
                      <div className="avatar ring-8 ring-base-100 rounded-3xl">
                        <div className="w-32 h-32 rounded-2xl bg-base-300">
                          <img
                            src={
                              profile?.profileimage ||
                              user.photoURL ||
                              "https://i.ibb.co/Yc3Wm9n/default-avatar.png"
                            }
                            alt="Avatar"
                          />
                        </div>
                      </div>

                      {/* Toggle Button for Editing */}
                      <button
                        onClick={() => setIsEditing(!isEditing)}
                        className={`btn btn-sm rounded-xl px-6 ${
                          isEditing
                            ? "btn-ghost border-base-300"
                            : "btn-primary shadow-lg shadow-primary/20"
                        }`}
                      >
                        {isEditing ? "Cancel" : "Edit Profile"}
                      </button>
                    </div>

                    {isEditing ? (
                      <div className="animate-in zoom-in-95 duration-200">
                        <h3 className="text-xl font-black mb-6">
                          Update Your Information
                        </h3>
                        <form
                          onSubmit={handleUpdateProfile}
                          className="grid grid-cols-1 md:grid-cols-2 gap-6"
                        >
                          <div className="form-control">
                            <label className="label text-xs font-black uppercase opacity-40">
                              Full Name
                            </label>
                            <input
                              name="name"
                              type="text"
                              defaultValue={profile?.name || user.displayName}
                              className="input input-bordered rounded-xl font-bold"
                              required
                            />
                          </div>
                          <div className="form-control">
                            <label className="label text-xs font-black uppercase opacity-40">
                              Major / Subject
                            </label>
                            <input
                              name="subject"
                              type="text"
                              defaultValue={profile?.subject}
                              className="input input-bordered rounded-xl font-bold"
                              required
                            />
                          </div>
                          <div className="form-control">
                            <label className="label text-xs font-black uppercase opacity-40">
                              Location
                            </label>
                            <input
                              name="location"
                              type="text"
                              defaultValue={profile?.location}
                              className="input input-bordered rounded-xl font-bold"
                              required
                            />
                          </div>
                          <div className="form-control">
                            <label className="label text-xs font-black uppercase opacity-40">
                              Experience Level
                            </label>
                            <select
                              name="experience"
                              defaultValue={
                                profile?.experienceLevel || "Beginner"
                              }
                              className="select select-bordered rounded-xl font-bold"
                            >
                              <option value="Beginner">Beginner</option>
                              <option value="Intermediate">Intermediate</option>
                              <option value="Advanced">Advanced</option>
                            </select>
                          </div>
                          <div className="md:col-span-2">
                            <button
                              type="submit"
                              className="btn btn-primary btn-block rounded-xl shadow-xl shadow-primary/20 mt-4"
                            >
                              Save Changes
                            </button>
                          </div>
                        </form>
                      </div>
                    ) : (
                      /* --- VIEW MODE: The Display (Your Original Design) --- */
                      <div className="animate-in slide-in-from-top-2">
                        <div className="mb-8">
                          <h2 className="text-3xl font-black">
                            {profile?.name || user.displayName}
                          </h2>
                          <p className="flex items-center gap-2 opacity-60 font-bold mt-1">
                            <Mail size={16} /> {user.email}
                          </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="p-5 bg-base-200/50 border border-base-300/50 rounded-2xl flex items-center gap-4">
                            <div className="bg-primary/10 p-3 rounded-xl text-primary">
                              <Briefcase size={20} />
                            </div>
                            <div>
                              <p className="text-[10px] uppercase font-black opacity-40">
                                Major/Subject
                              </p>
                              <p className="font-bold">
                                {profile?.subject || "Not Specified"}
                              </p>
                            </div>
                          </div>
                          <div className="p-5 bg-base-200/50 border border-base-300/50 rounded-2xl flex items-center gap-4">
                            <div className="bg-primary/10 p-3 rounded-xl text-primary">
                              <MapPin size={20} />
                            </div>
                            <div>
                              <p className="text-[10px] uppercase font-black opacity-40">
                                Location
                              </p>
                              <p className="font-bold">
                                {profile?.location || "Global"}
                              </p>
                            </div>
                          </div>
                          <div className="p-5 bg-base-200/50 border border-base-300/50 rounded-2xl flex items-center gap-4">
                            <div className="bg-primary/10 p-3 rounded-xl text-primary">
                              <Clock size={20} />
                            </div>
                            <div>
                              <p className="text-[10px] uppercase font-black opacity-40">
                                Availability
                              </p>
                              <p className="font-bold">
                                {profile?.availabilityTime || "Flexible"}
                              </p>
                            </div>
                          </div>
                          <div className="p-5 bg-base-200/50 border border-base-300/50 rounded-2xl flex items-center gap-4">
                            <div className="bg-primary/10 p-3 rounded-xl text-primary">
                              <Calendar size={20} />
                            </div>
                            <div>
                              <p className="text-[10px] uppercase font-black opacity-40">
                                Experience
                              </p>
                              <p className="font-bold">
                                {profile?.experienceLevel || "Beginner"}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* ACCEPTED REQUESTS - Proper Empty State */}
            {activeTab === "connections" && (
              <div className="card bg-base-100 shadow-sm border border-base-300 p-12 text-center animate-in zoom-in duration-300">
                <div className="max-w-md mx-auto">
                  <div className="bg-base-200 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 text-primary">
                    <Users size={40} />
                  </div>
                  <h2 className="text-2xl font-black mb-2">
                    No Accepted Connections
                  </h2>
                  <p className="opacity-60 mb-6 font-medium">
                    You haven't accepted any study partner requests yet. Once
                    someone accepts your request, they will appear here.
                  </p>
                  <Link
                    to="/find-partners"
                    className="btn btn-primary rounded-xl px-8"
                  >
                    Browse Partners
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Sidebar */}
        <div className="drawer-side">
          <label htmlFor="dashboard-drawer" className="drawer-overlay"></label>
          <ul className="menu p-6 w-80 h-full bg-base-100 border-r border-base-300 space-y-2">
            <li className="mb-10 text-2xl font-black tracking-tighter text-primary px-4">
              STUDYMATE
            </li>
            <li>
              <button
                onClick={() => setActiveTab("overview")}
                className={`p-4 rounded-2xl font-bold ${
                  activeTab === "overview"
                    ? "bg-primary text-white"
                    : "hover:bg-base-200"
                }`}
              >
                <BarChart3 size={20} /> Overview
              </button>
            </li>
            <li>
              <button
                onClick={() => setActiveTab("profile")}
                className={`p-4 rounded-2xl font-bold ${
                  activeTab === "profile"
                    ? "bg-primary text-white"
                    : "hover:bg-base-200"
                }`}
              >
                <User size={20} /> My Profile
              </button>
            </li>
            <li>
              <button
                onClick={() => setActiveTab("connections")}
                className={`p-4 rounded-2xl font-bold ${
                  activeTab === "connections"
                    ? "bg-primary text-white"
                    : "hover:bg-base-200"
                }`}
              >
                <Users size={20} /> Accepted
              </button>
            </li>
            <div className="divider opacity-10"></div>
            <li>
              <button
                onClick={handleLogOut}
                className="p-4 rounded-2xl font-bold text-error hover:bg-error/10"
              >
                <LogOut size={20} /> Logout
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default DashBoard;
