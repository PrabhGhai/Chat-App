import React, { useState } from "react";
import { FaUser, FaCog, FaSignOutAlt } from "react-icons/fa";
import { IoChatbubblesOutline } from "react-icons/io5";
import { HiMenu, HiX } from "react-icons/hi";
import { Link } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";

const Navbar = () => {
  const { authUser, logout } = useAuthStore();
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  const handleLogout = () => {
    logout();
  };

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-2">
          <IoChatbubblesOutline className="text-3xl text-indigo-600 drop-shadow-md" />
          <span className="text-2xl font-extrabold bg-gradient-to-r from-indigo-600 to-pink-500 text-transparent bg-clip-text tracking-wide">
            Chatter
          </span>
        </Link>

        <div className="hidden md:flex space-x-6 text-gray-700 font-medium">
          {authUser ? (
            <>
              <NavLink icon={<FaUser />} to="/profile" label="Profile" />
              <NavLink
                icon={<FaSignOutAlt />}
                label="Logout"
                onClick={handleLogout}
              />
            </>
          ) : (
            <NavLink icon={<FaUser />} to="/login" label="Get Started" />
          )}
        </div>

        <div className="md:hidden">
          <button
            onClick={toggleMenu}
            className="text-gray-700 focus:outline-none text-2xl"
          >
            {isOpen ? <HiX /> : <HiMenu />}
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden px-4 pb-4 space-y-3">
          {authUser ? (
            <>
              <MobileLink icon={<FaUser />} to="/profile" label="Profile" />
              <MobileLink
                icon={<FaSignOutAlt />}
                label="Logout"
                onClick={handleLogout}
              />
            </>
          ) : (
            <MobileLink icon={<FaUser />} to="/login" label="Get Started" />
          )}
        </div>
      )}
    </nav>
  );
};

const NavLink = ({ icon, to, label, onClick }) => {
  if (onClick) {
    return (
      <button
        onClick={onClick}
        className="flex items-center gap-2 hover:text-indigo-600 transition duration-300 transform hover:-translate-y-1"
      >
        {icon}
        <span>{label}</span>
      </button>
    );
  }

  return (
    <Link
      to={to}
      className="flex items-center gap-2 hover:text-indigo-600 transition duration-300 transform hover:-translate-y-1"
    >
      {icon}
      <span>{label}</span>
    </Link>
  );
};

const MobileLink = ({ icon, to, label, onClick }) => {
  if (onClick) {
    return (
      <button
        onClick={onClick}
        className="flex w-full items-center gap-3 px-2 py-2 rounded-md hover:bg-indigo-100 transition"
      >
        {icon}
        <span>{label}</span>
      </button>
    );
  }

  return (
    <Link
      to={to}
      className="flex items-center gap-3 px-2 py-2 rounded-md hover:bg-indigo-100 transition"
    >
      {icon}
      <span>{label}</span>
    </Link>
  );
};

export default Navbar;
