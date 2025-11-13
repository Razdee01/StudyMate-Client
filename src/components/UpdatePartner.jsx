import React, { useState } from "react";
import Swal from "sweetalert2";

const UpdatePartner = ({ request, onClose, onUpdate }) => {
  const [formData, setFormData] = useState({
    partnerName: request.partnerName || "",
    partnerSubject: request.partnerSubject || "",
    studyMode: request.studyMode || "",
    availabilityTime: request.availabilityTime || "",
    experienceLevel: request.experienceLevel || "",
  });

  // 🟢 Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // 🟢 Submit update
  const handleSubmit = (e) => {
    e.preventDefault();
    fetch(`http://localhost:3000/requests/${request._id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.modifiedCount > 0) {
          Swal.fire({
            title: "Updated!",
            text: "Request updated successfully!",
            icon: "success",
            timer: 1500,
            showConfirmButton: false,
          });
          onUpdate({ ...request, ...formData });
          onClose();
        } else {
          Swal.fire("No changes found!", "", "info");
        }
      })
      .catch((err) => {
        console.error(err);
        Swal.fire("Error!", "Something went wrong!", "error");
      });
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/40">
      <div className="bg-white p-6 rounded-lg w-[400px] shadow-lg">
        <h2 className="text-xl font-semibold mb-4">Update Partner Request</h2>
        <form onSubmit={handleSubmit} className="space-y-3">
          <div>
            <label className="block text-sm font-medium">Partner Name</label>
            <input
              type="text"
              name="partnerName"
              value={formData.partnerName}
              onChange={handleChange}
              className="border rounded w-full p-2"
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Subject</label>
            <input
              type="text"
              name="partnerSubject"
              value={formData.partnerSubject}
              onChange={handleChange}
              className="border rounded w-full p-2"
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Study Mode</label>
            <input
              type="text"
              name="studyMode"
              value={formData.studyMode}
              onChange={handleChange}
              className="border rounded w-full p-2"
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Availability</label>
            <input
              type="text"
              name="availabilityTime"
              value={formData.availabilityTime}
              onChange={handleChange}
              className="border rounded w-full p-2"
            />
          </div>

          <div>
            <label className="block text-sm font-medium">
              Experience Level
            </label>
            <input
              type="text"
              name="experienceLevel"
              value={formData.experienceLevel}
              onChange={handleChange}
              className="border rounded w-full p-2"
            />
          </div>

          <div className="flex justify-end space-x-2 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-300 px-4 py-2 rounded"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-green-500 text-white px-4 py-2 rounded"
            >
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdatePartner;
