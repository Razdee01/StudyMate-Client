import React, { useEffect, useState, useContext } from "react";
import Swal from "sweetalert2";
import { AuthContext } from "../contexts/AuthContext";
import UpdatePartner from "../components/UpdatePartner";

const MyConnections = () => {
  const { user } = useContext(AuthContext);
  const [requests, setRequests] = useState([]);
  const [editingRequest, setEditingRequest] = useState(null);

  useEffect(() => {
    if (!user?.email) return;
    fetch(`study-mate-server-ten.vercel.app/requests/sent/${user.email}`)
      .then((res) => res.json())
      .then((data) => setRequests(data));
  }, [user]);

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This request will be deleted.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#82A762",
      cancelButtonColor: "#2E2EFF",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`study-mate-server-ten.vercel.app/requests/${id}`, {
          method: "DELETE",
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.deletedCount > 0) {
              Swal.fire("Deleted!", "Request removed successfully!", "success");
              setRequests(requests.filter((r) => r._id !== id));
            }
          });
      }
    });
  };

  return (
    <div className="p-4 sm:p-6 bg-gray-50 min-h-screen">
      <h2 className="text-2xl sm:text-3xl font-semibold mb-6 text-(--color-primary)]">
        My Connections
      </h2>
      <div className="overflow-x-auto">
        <table className="w-full border border-(--color-primary) bg-white rounded-lg shadow-md text-sm sm:text-base">
          <thead className="bg-(--color-primary) text-white">
            <tr>
              <th className="px-3 sm:px-4 py-2 border">Partner Name</th>
              <th className="px-3 sm:px-4 py-2 border">Subject</th>
              <th className="px-3 sm:px-4 py-2 border">Study Mode</th>
              <th className="px-3 sm:px-4 py-2 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {requests.map((req) => (
              <tr key={req._id} className="text-center hover:bg-gray-100">
                <td className="border px-3 sm:px-4 py-2">{req.partnerName}</td>
                <td className="border px-3 sm:px-4 py-2">
                  {req.partnerSubject}
                </td>
                <td className="border px-3 sm:px-4 py-2">{req.studyMode}</td>
                <td className="border px-3 sm:px-4 py-2">
                  <button
                    onClick={() => setEditingRequest(req)}
                    className="bg-(--color-secondary) text-white px-2 sm:px-3 py-1 rounded mr-2"
                  >
                    Update
                  </button>
                  <button
                    onClick={() => handleDelete(req._id)}
                    className="bg-red-500 text-white px-2 sm:px-3 py-1 rounded"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

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
  );
};

export default MyConnections;
