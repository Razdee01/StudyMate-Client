import React, { useEffect, useState, useContext } from "react";
import Swal from "sweetalert2";
import { AuthContext } from "../contexts/AuthContext";
import UpdatePartner from "../components/UpdatePartner";
import { Trash2, Link as LinkIcon } from "lucide-react";

const MyConnections = () => {
  const { user } = useContext(AuthContext);
  const [requests, setRequests] = useState([]);
  const [editingRequest, setEditingRequest] = useState(null);

  useEffect(() => {
    if (!user?.email) return;

    fetch(
      `https://study-mate-server-ten.vercel.app/requests/sent/${user.email}`
    )
      .then((res) => res.json())
      .then((data) => {
        setRequests(Array.isArray(data) ? data : data.requests || []);
      })
      .catch((err) => {
        console.error("Error fetching requests:", err);
      });
  }, [user]);

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This request will be deleted.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#0ea5e9", // Primary blue
      cancelButtonColor: "#ef4444", // Red
      confirmButtonText: "Yes, delete it!",
      background:
        document.documentElement.getAttribute("data-theme") === "dark"
          ? "#1d232a"
          : "#fff",
      color:
        document.documentElement.getAttribute("data-theme") === "dark"
          ? "#fff"
          : "#000",
    }).then((result) => {
      if (!result.isConfirmed) return;

      fetch(`https://study-mate-server-ten.vercel.app/requests/${id}`, {
        method: "DELETE",
      })
        .then((res) => {
          if (res.ok) {
            Swal.fire("Deleted!", "Request removed successfully!", "success");
            setRequests((prev) => prev.filter((r) => r._id !== id));
          } else {
            Swal.fire("Error!", "Failed to delete request", "error");
          }
        })
        .catch((err) => {
          console.error("Delete error:", err);
          Swal.fire("Error!", "Something went wrong", "error");
        });
    });
  };

  return (
    // Changed bg-gray-50 to bg-base-200
    <div className="p-4 sm:p-10 bg-base-200 min-h-screen">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center gap-3 mb-8">
          <LinkIcon className="text-primary w-8 h-8" />
          <h2 className="text-3xl font-bold text-base-content">
            My Connections
          </h2>
        </div>

        {requests.length === 0 ? (
          <div className="card bg-base-100 shadow-xl p-10 text-center">
            <p className="text-base-content/60 text-lg">
              You have no sent partner requests yet.
            </p>
          </div>
        ) : (
          <div className="card bg-base-100 shadow-xl overflow-hidden">
            <div className="overflow-x-auto">
              {/* Added DaisyUI table classes */}
              <table className="table w-full">
                {/* Table head uses base-300 for a subtle dark/light contrast */}
                <thead className="bg-base-300 text-base-content">
                  <tr>
                    <th className="py-4">Partner Name</th>
                    <th>Subject</th>
                    <th>Study Mode</th>
                    <th className="text-center">Actions</th>
                  </tr>
                </thead>
                <tbody className="text-base-content">
                  {requests.map((req) => (
                    <tr
                      key={req._id}
                      className="hover:bg-base-200 transition-colors"
                    >
                      <td className="font-medium">{req.partnerName}</td>
                      <td>
                        <span className="badge badge-ghost">
                          {req.partnerSubject}
                        </span>
                      </td>
                      <td>
                        <div
                          className={`badge ${
                            req.studyMode === "Online"
                              ? "badge-primary"
                              : "badge-secondary"
                          } badge-outline`}
                        >
                          {req.studyMode}
                        </div>
                      </td>
                      <td className="text-center">
                        <button
                          onClick={() => handleDelete(req._id)}
                          className="btn btn-error btn-sm btn-outline gap-2 hover:text-white"
                        >
                          <Trash2 size={16} />
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {editingRequest && (
          <UpdatePartner
            request={editingRequest}
            onClose={() => setEditingRequest(null)}
            onUpdate={(updatedReq) =>
              setRequests((prev) =>
                prev.map((r) => (r._id === updatedReq._id ? updatedReq : r))
              )
            }
          />
        )}
      </div>
    </div>
  );
};

export default MyConnections;
