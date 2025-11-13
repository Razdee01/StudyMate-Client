import React, { useEffect, useState, useContext } from "react";
import Swal from "sweetalert2";
import { AuthContext } from "../contexts/AuthContext";
import UpdatePartner from "../components/UpdatePartner";

const MyConnections = () => {
  const { user } = useContext(AuthContext);
  const [requests, setRequests] = useState([]);
  const [editingRequest, setEditingRequest] = useState(null);

  // 🟢 Fetch all requests SENT by the logged-in user
  useEffect(() => {
    if (!user?.email) return;
    fetch(`http://localhost:3000/requests/sent/${user.email}`)
      .then((res) => res.json())
      .then((data) => setRequests(data))
      .catch((err) => console.error("Error fetching sent requests:", err));
  }, [user]);

  // 🗑️ Delete request
  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`http://localhost:3000/requests/${id}`, {
          method: "DELETE",
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.deletedCount > 0) {
              Swal.fire(
                "Deleted!",
                "Your request has been deleted.",
                "success"
              );
              setRequests(requests.filter((req) => req._id !== id));
            }
          });
      }
    });
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">My Connections</h2>
      <table className="min-w-full border">
        <thead>
          <tr>
            <th className="border px-4 py-2">Partner Name</th>
            <th className="border px-4 py-2">Subject</th>
            <th className="border px-4 py-2">Study Mode</th>
            <th className="border px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {requests.map((req) => (
            <tr key={req._id}>
              <td className="border px-4 py-2">{req.partnerName}</td>
              <td className="border px-4 py-2">{req.partnerSubject}</td>
              <td className="border px-4 py-2">{req.studyMode}</td>
              <td className="border px-4 py-2">
                <button
                  className="bg-yellow-400 px-2 py-1 rounded mr-2"
                  onClick={() => setEditingRequest(req)}
                >
                  Update
                </button>
                <button
                  className="bg-red-500 text-white px-2 py-1 rounded"
                  onClick={() => handleDelete(req._id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* 🟢 Update modal */}
      {editingRequest && (
        <UpdatePartner
          request={editingRequest}
          onClose={() => setEditingRequest(null)}
          onUpdate={(updatedReq) => {
            setRequests((prev) =>
              prev.map((r) => (r._id === updatedReq._id ? updatedReq : r))
            );
          }}
        />
      )}
    </div>
  );
};

export default MyConnections;
