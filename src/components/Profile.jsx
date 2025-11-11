import React, { useContext, } from "react";

import { AuthContext } from "../contexts/AuthContext";

const Profile = () => {
  const { user } = useContext(AuthContext);

  return (
    <div className="flex flex-col items-center justify-center  bg-gray-100 p-4">
      <div className="bg-white shadow-md rounded-xl p-6 max-w-sm w-full text-center">
        <img
          src={user.photoURL || "https://via.placeholder.com/150"}
          alt="Profile"
          className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
        />
        <h2 className="text-2xl font-semibold mb-2">{user.displayName}</h2>
        <p className="text-gray-600 mb-4">{user.email}</p>
        
      </div>
    </div>
  );
};

export default Profile;
