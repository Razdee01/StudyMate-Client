import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router";
import { AuthContext } from "../contexts/AuthContext";

const MyConnectionsDemo = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) navigate("/login"); // private route
  }, [user, navigate]);

  if (!user) return null; // prevent rendering before redirect

  // Static data for demo
  const connections = [
    {
      id: 1,
      name: "Alice Johnson",
      profileImage: "https://via.placeholder.com/40",
      subject: "English",
      studyMode: "Online",
    },
    {
      id: 2,
      name: "Bob Smith",
      profileImage: "https://via.placeholder.com/40",
      subject: "Math",
      studyMode: "Offline",
    },
    {
      id: 3,
      name: "Charlie Lee",
      profileImage: "https://via.placeholder.com/40",
      subject: "Programming",
      studyMode: "Online",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto bg-white shadow-md rounded-xl p-6">
        <h1 className="text-2xl font-bold mb-6 text-center">My Connections</h1>

        <div className="overflow-x-auto">
          <table className="table w-full">
            <thead>
              <tr>
                <th>Partner</th>
                <th>Subject</th>
                <th>Study Mode</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {connections.map((conn) => (
                <tr key={conn.id}>
                  <td className="flex items-center gap-3">
                    <img
                      src={conn.profileImage}
                      alt={conn.name}
                      className="w-10 h-10 rounded-full"
                    />
                    <span>{conn.name}</span>
                  </td>
                  <td>{conn.subject}</td>
                  <td>{conn.studyMode}</td>
                  <td className="flex gap-2">
                    <button className="btn btn-sm btn-warning">Update</button>
                    <button className="btn btn-sm btn-error">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default MyConnectionsDemo;
