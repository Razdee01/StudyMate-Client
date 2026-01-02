import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { useNavigate } from "react-router";
import { LogOut, BarChart3, User, Users } from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import Loading from "./Loading";
import axios from "axios";

const DashBoard = () => {
//   const { user, loading: authLoading, LogOut } = useContext(AuthContext);
const {user,loading:authLoading}=useContext(AuthContext)
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("overview");
  const [profile, setProfile] = useState(null);
  const [connections, setConnections] = useState([]);
  const [dashLoading, setDashLoading] = useState(true);

  // 1. Redirect if not logged in (only after auth loading is done)
  useEffect(() => {
    if (!authLoading && !user) {
      navigate("/login");
    }
  }, [user, authLoading, navigate]);

  // 2. Fetch user data only when logged in
  useEffect(() => {
    if (user?.email) {
      setDashLoading(true);

      // Fetch profile
      axios
        .get(
          `https://study-mate-server-ten.vercel.app/my-profile?email=${user.email}`
        )
        .then((res) => setProfile(res.data))
        .catch(() => setProfile(null));

      // Fetch connections
      axios
        .get(
          `https://study-mate-server-ten.vercel.app/requests/sent/${user.email}`
        )
        .then((res) => {
          const reqs = Array.isArray(res.data)
            ? res.data
            : res.data.requests || [];
          setConnections(reqs);
          setDashLoading(false);
        })
        .catch(() => {
          setConnections([]);
          setDashLoading(false);
        });
    }
  }, [user]);

  // EARLY RETURNS — in correct order
  if (authLoading) {
    return <Loading />;
  }

  if (!user) {
    return null; // redirect already handled
  }

  if (dashLoading) {
    return <Loading />;
  }

  // Calculate stats from real connections
  const totalConnections = connections.filter(
    (c) => c.status === "Accepted"
  ).length;
  const pendingRequests = connections.filter(
    (c) => c.status === "Pending"
  ).length;

  const chartData = [
    { month: "Jan", connections: 2 },
    { month: "Feb", connections: 5 },
    { month: "Mar", connections: 8 },
    { month: "Apr", connections: 12 },
    { month: "May", connections: 15 },
    { month: "Jun", connections: 20 },
  ];
  



  return (
    <div className="min-h-screen bg-base-200">
      <div className="drawer lg:drawer-open">
        <input
          id="dashboard-drawer"
          type="checkbox"
          className="drawer-toggle"
        />

        <div className="drawer-content flex flex-col">
          {/* Top Navbar */}
          <div className="navbar bg-base-100 shadow-md px-6">
            <div className="flex-1">
              <h1 className="text-2xl font-bold text-primary">My Dashboard</h1>
            </div>
            <div className="flex items-center gap-4">
              <div className="avatar online">
                <div className="w-10 rounded-full">
                  <img
                    src={
                      user.photoURL ||
                      "https://i.ibb.co.com/Yc3Wm9n/default-avatar.png"
                    }
                    alt="User"
                  />
                </div>
              </div>
              <span className="hidden sm:block font-medium">
                {user.displayName || user.email}
              </span>
            </div>
          </div>

          {/* Main Content */}
          <div className="p-6 lg:p-10">
            {activeTab === "overview" && (
              <>
                {/* Stats Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
                  <div className="stat bg-base-100 shadow-lg rounded-xl">
                    <div className="stat-figure text-primary">
                      <Users className="w-8 h-8" />
                    </div>
                    <div className="stat-title">Total Connections</div>
                    <div className="stat-value text-primary">
                      {totalConnections}
                    </div>
                  </div>
                  <div className="stat bg-base-100 shadow-lg rounded-xl">
                    <div className="stat-figure text-warning">
                      <BarChart3 className="w-8 h-8" />
                    </div>
                    <div className="stat-title">Pending Requests</div>
                    <div className="stat-value text-warning">
                      {pendingRequests}
                    </div>
                  </div>
                  <div className="stat bg-base-100 shadow-lg rounded-xl">
                    <div className="stat-figure text-success">
                      <User className="w-8 h-8" />
                    </div>
                    <div className="stat-title">Subjects</div>
                    <div className="stat-value text-success">
                      {profile?.subjects?.length || 0}
                    </div>
                  </div>
                  <div className="stat bg-base-100 shadow-lg rounded-xl">
                    <div className="stat-figure text-info">
                      <BarChart3 className="w-8 h-8" />
                    </div>
                    <div className="stat-title">Activity Score</div>
                    <div className="stat-value text-info">
                      {totalConnections + pendingRequests}
                    </div>
                  </div>
                </div>

                {/* Chart */}
                <div className="card bg-base-100 shadow-xl mb-10">
                  <div className="card-body">
                    <h2 className="card-title text-2xl">Connection Growth</h2>
                    <ResponsiveContainer width="100%" height={300}>
                      <LineChart data={chartData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis />
                        <Tooltip />
                        <Line
                          type="monotone"
                          dataKey="connections"
                          stroke="#0ea5e9"
                          strokeWidth={3}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                {/* Table */}
                <div className="card bg-base-100 shadow-xl">
                  <div className="card-body">
                    <h2 className="card-title text-2xl">My Connections</h2>
                    <div className="overflow-x-auto">
                      <table className="table table-zebra w-full">
                        <thead>
                          <tr>
                            <th>Partner Name</th>
                            <th>Subject</th>
                            <th>Status</th>
                            <th>Date</th>
                          </tr>
                        </thead>
                        <tbody>
                          {connections.length === 0 ? (
                            <tr>
                              <td colSpan="4" className="text-center py-8">
                                No connections yet. Go find study partners!
                              </td>
                            </tr>
                          ) : (
                            connections.map((conn, i) => (
                              <tr key={i}>
                                <td className="font-medium">
                                  {conn.name || conn.partnerName}
                                </td>
                                <td>{conn.subject}</td>
                                <td>
                                  <div
                                    className={`badge ${
                                      conn.status === "Accepted"
                                        ? "badge-success"
                                        : "badge-warning"
                                    }`}
                                  >
                                    {conn.status}
                                  </div>
                                </td>
                                <td>
                                  {new Date(conn.date).toLocaleDateString()}
                                </td>
                              </tr>
                            ))
                          )}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </>
            )}

            {/* Profile Tab */}
            {activeTab === "profile" && (
              <div className="card bg-base-100 shadow-xl p-10">
                <h2 className="text-3xl font-bold mb-8 text-center">
                  My Profile
                </h2>
                <div className="flex flex-col md:flex-row items-center gap-10">
                  <div className="avatar">
                    <div className="w-48 rounded-xl ring ring-primary ring-offset-base-100 ring-offset-2">
                      <img
                        src={
                          user.photoURL ||
                          "https://i.ibb.co.com/Yc3Wm9n/default-avatar.png"
                        }
                      />
                    </div>
                  </div>
                  <div className="text-left space-y-3">
                    <p>
                      <strong>Name:</strong>{" "}
                      {profile?.name || user.displayName || "Not set"}
                    </p>
                    <p>
                      <strong>Email:</strong> {user.email}
                    </p>
                    <p>
                      <strong>Subjects:</strong>{" "}
                      {profile?.subjects?.join(", ") || "Not set"}
                    </p>
                    <p>
                      <strong>Experience Level:</strong>{" "}
                      {profile?.experienceLevel || "Not set"}
                    </p>
                    <p>
                      <strong>Study Mode:</strong>{" "}
                      {profile?.studyMode || "Not set"}
                    </p>
                  </div>
                </div>
                <div className="text-center mt-8">
                  <button className="btn btn-primary btn-lg">
                    Edit Profile
                  </button>
                </div>
              </div>
            )}

            {/* Connections Tab */}
            {activeTab === "connections" && (
              <div className="card bg-base-100 shadow-xl p-10 text-center">
                <h2 className="text-3xl font-bold mb-6">All My Connections</h2>
                <p className="text-lg text-gray-600">
                  Detailed list with messaging coming soon...
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Sidebar */}
        <div className="drawer-side">
          <label htmlFor="dashboard-drawer" className="drawer-overlay"></label>
          <ul className="menu p-4 w-80 h-full bg-base-100 text-base-content">
            <li className="menu-title text-xl font-bold text-primary mb-6">
              Dashboard
            </li>
            <li>
              <button
                onClick={() => setActiveTab("overview")}
                className={
                  activeTab === "overview" ? "active bg-primary text-white" : ""
                }
              >
                <BarChart3 className="w-5 h-5" /> Overview
              </button>
            </li>
            <li>
              <button
                onClick={() => setActiveTab("profile")}
                className={
                  activeTab === "profile" ? "active bg-primary text-white" : ""
                }
              >
                <User className="w-5 h-5" /> My Profile
              </button>
            </li>
            <li>
              <button
                onClick={() => setActiveTab("connections")}
                className={
                  activeTab === "connections"
                    ? "active bg-primary text-white"
                    : ""
                }
              >
                <Users className="w-5 h-5" /> My Connections
              </button>
            </li>
            <li className="mt-auto">
              <button
              
                className="text-error hover:bg-error hover:text-white"
              >
                <LogOut className="w-5 h-5" /> Logout
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default DashBoard;
