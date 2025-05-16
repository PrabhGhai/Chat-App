import React, { useRef, useState } from "react";
import { FaCamera } from "react-icons/fa";
import { useAuthStore } from "../store/useAuthStore";

const ProfilePage = () => {
  const { authUser, updateProfilePic, isUpdatingProfile } = useAuthStore();
  const fileInputRef = useRef(null);
  const [profilePic, setprofilePic] = useState(null);

  const handleAvatarClick = () => {
    fileInputRef.current.click();
  };

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      setprofilePic(URL.createObjectURL(file));
      const formData = new FormData();
      formData.append("profilePic", file);

      await updateProfilePic(formData);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-100 to-purple-100 p-4">
      <div className="bg-white rounded-2xl shadow-xl p-6 md:p-10 w-full max-w-md text-center">
        <div className="relative w-32 h-32 mx-auto mb-6">
          <img
            src={
              profilePic ||
              (authUser?.profilePic ? authUser.profilePic : "/profile.png")
            }
            alt="User Avatar"
            className="w-full h-full object-cover rounded-full border-4 border-indigo-500 shadow-md"
          />

          <div
            onClick={handleAvatarClick}
            className="absolute bottom-1 right-1 bg-indigo-600 p-2 rounded-full text-white cursor-pointer hover:bg-indigo-700 transition"
            title="Change Profile Picture"
          >
            <FaCamera size={18} />
          </div>
          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            onChange={handleImageChange}
            className="hidden"
          />
        </div>
        <p className="mb-6 font-semibold text-zinc-700 text-sm">
          {isUpdatingProfile
            ? "Loading..."
            : "Click on camera to update the profile"}
        </p>
        {/* Info Fields */}
        <div className="space-y-4 text-left">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Full Name
            </label>
            <input
              type="text"
              value={authUser?.fullName || "Full Name"}
              readOnly
              className="w-full px-4 py-2 border border-gray-300 rounded-md bg-gray-100 text-gray-700 cursor-not-allowed"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email Address
            </label>
            <input
              type="email"
              value={authUser?.email || "email@example.com"}
              readOnly
              className="w-full px-4 py-2 border border-gray-300 rounded-md bg-gray-100 text-gray-700 cursor-not-allowed"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
