import React, { use, useEffect, useState } from "react"; // Changed to 'use' for consistency
import { AuthContext } from "../contexts/AuthContext";
import Loading from "./Loading";
import {
  Mail,
  User as UserIcon,
  Camera,
  ShieldCheck,
  RefreshCw,
} from "lucide-react";

const Profile = () => {
  const { user } = use(AuthContext); 
  const [localLoading, setLocalLoading] = useState(false);

  useEffect(() => {
    if (user && !user.displayName) {
      setLocalLoading(true);
      user.reload().then(() => {
      
        setLocalLoading(false);
      });
    }
  }, [user]);

  if (!user && user !== null) return <Loading />;

  if (localLoading) return <Loading />;

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200 p-6 transition-colors duration-300">
      <div className="bg-base-100 shadow-2xl rounded-3xl p-8 max-w-md w-full border border-base-300 relative">
        {/* Decorative Header */}
        <div className="absolute top-0 left-0 w-full h-24 bg-linear-to-r from-sky-400 to-blue-600"></div>

        <div className="relative pt-8 text-center">
          <div className="avatar mb-4">
            <div className="w-28 h-28 rounded-full ring-4 ring-base-100 shadow-xl overflow-hidden bg-base-300">
              <img
                src={
                  user?.photoURL ||
                  "https://i.ibb.co.com/Yc3Wm9n/default-avatar.png"
                }
                alt="Avatar"
              />
            </div>
          </div>

          <h2 className="text-3xl font-black text-base-content flex items-center justify-center gap-2">
           
            {user?.displayName || "Member"}
            <ShieldCheck className="text-sky-500" size={24} />
          </h2>

          <p className="text-base-content/60 font-medium">{user?.email}</p>

          <div className="divider my-6 text-xs uppercase tracking-widest opacity-50 font-bold">
            Account Info
          </div>

          <div className="grid gap-3">
            <div className="flex items-center gap-4 bg-base-200 p-4 rounded-2xl border border-base-300">
              <UserIcon className="text-primary" size={20} />
              <div className="text-left text-sm">
                <p className="opacity-50 font-bold">Display Name</p>
                <p className="font-bold text-base-content">
                  {user?.displayName || "Not Set Yet"}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4 bg-base-200 p-4 rounded-2xl border border-base-300">
              <Mail className="text-primary" size={20} />
              <div className="text-left text-sm">
                <p className="opacity-50 font-bold">Email</p>
                <p className="font-bold text-base-content">{user?.email}</p>
              </div>
            </div>
          </div>

          <button
            onClick={() => window.location.reload()}
            className="btn btn-ghost btn-sm mt-6 text-primary gap-2"
          >
            <RefreshCw size={14} /> Sync Data
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
