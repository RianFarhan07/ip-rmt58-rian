import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import logo from "../assets/logo-no-background.png";
import { useDispatch } from "react-redux";
import { signOut } from "../features/userSlice";

const Navbar = () => {
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const toggleProfileMenu = () => {
    setIsProfileMenuOpen(!isProfileMenuOpen);
  };

  const isActiveRoute = (path) => {
    return location.pathname === path;
  };

  const handleLogout = () => {
    dispatch(signOut());
    navigate("/public");
  };

  return (
    <nav className="bg-white py-4 px-6 flex justify-between items-center shadow-sm">
      <div className="flex items-center gap-6">
        <Link to="/" className="flex items-center">
          <img
            src={logo}
            alt="logo Recipedia"
            className="h-8 w-auto mr-2 hover:cursor-pointer"
          />
        </Link>
        <div className="hidden md:flex items-center gap-6">
          <Link
            to="/"
            className={`font-medium hover:text-primary transition-colors ${
              isActiveRoute("/")
                ? "text-primary border-b-2 border-primary pb-1"
                : "text-gray-700"
            }`}
          >
            Home
          </Link>
          <Link
            to="/search"
            className={`font-medium hover:text-primary transition-colors ${
              isActiveRoute("/search")
                ? "text-primary border-b-2 border-primary pb-1"
                : "text-gray-700"
            }`}
          >
            Search
          </Link>
          <Link
            to="/nutrition"
            className={`font-medium hover:text-primary transition-colors ${
              isActiveRoute("/nutrition")
                ? "text-primary border-b-2 border-primary pb-1"
                : "text-gray-700"
            }`}
          >
            Nutrition
          </Link>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <Link
          to="/saved-recipe"
          className={`font-medium hover:text-primary transition-colors ${
            location.pathname.includes("/saved")
              ? "text-primary"
              : "text-gray-700"
          }`}
        >
          <div className="flex items-center gap-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
              />
            </svg>
            <span className="hidden md:inline">Saved</span>
          </div>
        </Link>

        <div className="relative">
          <button
            onClick={toggleProfileMenu}
            className="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 rounded-full p-2 transition-colors"
          >
            <div className="h-8 w-8 rounded-full bg-gray-300 flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-gray-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
            </div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-gray-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </button>

          {isProfileMenuOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10">
              <Link
                to="/profile"
                className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                onClick={() => setIsProfileMenuOpen(false)}
              >
                Profile
              </Link>
              <Link
                to="/settings"
                className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                onClick={() => setIsProfileMenuOpen(false)}
              >
                Settings
              </Link>
              <div className="border-t border-gray-100 my-1"></div>
              <button
                className="block px-4 py-2 text-red-600 hover:bg-gray-100"
                onClick={handleLogout}
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
