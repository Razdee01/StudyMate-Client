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

    fetch("https://study-mate-server-ten.vercel.app/partners", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(partnerData),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          Swal.fire({
            icon: "success",
            title: "Profile Created!",
            text:
              data.message ||
              "Your partner profile has been successfully created.",
            confirmButtonText: "OK",
            confirmButtonColor: "#0ea5e9", // Matches your primary blue
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
    // Changed bg-gray-100 to bg-base-200 for dark mode support
    <div className="min-h-screen flex justify-center items-start bg-base-200 py-10 px-4">
      {/* Changed bg-white to bg-base-100 for dark mode support */}
      <div className="bg-base-100 p-8 rounded-2xl shadow-xl w-full max-w-xl">
        <h1 className="text-3xl font-bold mb-6 text-center text-primary">
          Create Partner Profile
        </h1>
        <p className="text-center text-base-content/70 mb-8">
          Share your details to connect with like-minded study partners.
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Name */}
          <div className="form-control">
            <label className="label">
              <span className="label-text font-semibold">Full Name</span>
            </label>
            <input
              type="text"
              name="name"
              placeholder="Your full name"
              className="input input-bordered focus:input-primary w-full"
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Profile Image */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-semibold">
                  Profile Image URL
                </span>
              </label>
              <input
                type="text"
                name="profileImage"
                placeholder="Image URL"
                className="input input-bordered focus:input-primary w-full"
                required
              />
            </div>

            {/* Subject */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-semibold">Subject</span>
              </label>
              <input
                type="text"
                name="subject"
                placeholder="e.g., Programming"
                className="input input-bordered focus:input-primary w-full"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Study Mode */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-semibold">Study Mode</span>
              </label>
              <select
                name="studyMode"
                className="select select-bordered focus:select-primary w-full"
              >
                <option>Online</option>
                <option>Offline</option>
              </select>
            </div>

            {/* Experience Level */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-semibold">
                  Experience Level
                </span>
              </label>
              <select
                name="experienceLevel"
                className="select select-bordered focus:select-primary w-full"
              >
                <option>Beginner</option>
                <option>Intermediate</option>
                <option>Advanced</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Availability */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-semibold">
                  Availability Time
                </span>
              </label>
              <input
                type="text"
                name="availability"
                placeholder="e.g., 6-9 PM"
                className="input input-bordered focus:input-primary w-full"
              />
            </div>

            {/* Location */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-semibold">Location</span>
              </label>
              <input
                type="text"
                name="location"
                placeholder="City or Area"
                className="input input-bordered focus:input-primary w-full"
              />
            </div>
          </div>

          {/* Email (Read Only) */}
          <div className="form-control">
            <label className="label">
              <span className="label-text font-semibold text-base-content/50">
                Your Registered Email
              </span>
            </label>
            <input
              type="email"
              name="email"
              value={user?.email || ""}
              className="input input-bordered bg-base-300 cursor-not-allowed w-full opacity-70"
              readOnly
            />
          </div>

          {/* Hidden/Default inputs to maintain functionality */}
          <input type="hidden" name="rating" value={0} />
          <input type="hidden" name="partnerCount" value={0} />

          {/* Submit Button */}
          <button
            type="submit"
            className="btn btn-primary w-full mt-6 text-white shadow-lg"
          >
            Create Profile
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreatePartnerProfile;
