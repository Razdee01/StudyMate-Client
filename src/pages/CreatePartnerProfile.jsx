import React, { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import Swal from "sweetalert2";
import { useNavigate } from "react-router";

const CreatePartnerProfile = () => {
  const { user } = useContext(AuthContext);
  const navigation = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;

    const partnerData = {
      name: form.name.value,
      profileimage: form.profileImage.value,
      subject: form.subject.value,
      studyMode: form.studyMode.value,
      availabilityTime: form.availability.value,
      location: form.location.value,
      experienceLevel: form.experienceLevel.value,
      rating: parseFloat(form.rating.value),
      partnerCount: parseInt(form.partnerCount.value),
      email: form.email.value,
    };

    fetch("study-mate-server-ten.vercel.app/partners", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(partnerData),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("Partner added:", data);

        if (data.success) {
          Swal.fire({
            icon: "success",
            title: "Profile Created!",
            text:
              data.message ||
              "Your partner profile has been successfully created.",
            confirmButtonText: "OK",
            confirmButtonColor: "#1E40AF",
          });
          navigation("/find-partners");
        } else {
          Swal.fire({
            icon: "error",
            title: "Unable to create!",
            text: data.message || "A profile already exists with this email.",
            confirmButtonText: "Try Again",
            confirmButtonColor: "#DC2626",
          });
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        Swal.fire({
          icon: "error",
          title: "Something went wrong",
          text: "Please try again later.",
        });
      });
  };

  return (
    <div className="min-h-screen flex justify-center items-start bg-gray-100 py-10">
      <div className="bg-white p-6 rounded-xl shadow-md w-full max-w-xl">
        <h1 className="text-2xl font-bold mb-6 text-center">
          Create Partner Profile
        </h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name */}
          <div>
            <label className="block mb-1 font-medium">Full Name</label>
            <input
              type="text"
              name="name"
              placeholder="Your full name"
              className="input input-bordered w-full"
              required
            />
          </div>

          {/* Profile Image */}
          <div>
            <label className="block mb-1 font-medium">Profile Image URL</label>
            <input
              type="text"
              name="profileImage"
              placeholder="Image URL"
              className="input input-bordered w-full"
              required
            />
          </div>

          {/* Subject */}
          <div>
            <label className="block mb-1 font-medium">Subject</label>
            <input
              type="text"
              name="subject"
              placeholder="e.g., English, Math, Programming"
              className="input input-bordered w-full"
              required
            />
          </div>

          {/* Study Mode */}
          <div>
            <label className="block mb-1 font-medium">Study Mode</label>
            <select name="studyMode" className="select select-bordered w-full">
              <option>Online</option>
              <option>Offline</option>
            </select>
          </div>

          {/* Availability */}
          <div>
            <label className="block mb-1 font-medium">Availability Time</label>
            <input
              type="text"
              name="availability"
              placeholder="e.g., Evening 6-9 PM"
              className="input input-bordered w-full"
            />
          </div>

          {/* Location */}
          <div>
            <label className="block mb-1 font-medium">Location</label>
            <input
              type="text"
              name="location"
              placeholder="City or Area"
              className="input input-bordered w-full"
            />
          </div>

          {/* Experience Level */}
          <div>
            <label className="block mb-1 font-medium">Experience Level</label>
            <select
              name="experienceLevel"
              className="select select-bordered w-full"
            >
              <option>Beginner</option>
              <option>Intermediate</option>
              <option>Expert</option>
            </select>
          </div>

          {/* Rating */}
          <div>
            <label className="block mb-1 font-medium">Rating</label>
            <input
              type="number"
              name="rating"
              value={0}
              className="input input-bordered w-full"
              min={0}
              max={5}
              readOnly
            />
          </div>

          {/* Partner Count */}
          <div>
            <label className="block mb-1 font-medium">Partner Count</label>
            <input
              type="number"
              name="partnerCount"
              value={0}
              className="input input-bordered w-full"
              min={0}
              readOnly
            />
          </div>

          {/* Email */}
          <div>
            <label className="block mb-1 font-medium">Email</label>
            <input
              type="email"
              name="email"
              value={user?.email || ""}
              className="input input-bordered w-full"
              readOnly
            />
          </div>

          {/* Submit Button */}
          <button type="submit" className="btn btn-primary w-full mt-4">
            Create Profile
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreatePartnerProfile;
