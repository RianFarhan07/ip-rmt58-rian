import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo-no-background.png";

const PublicNavbar = () => {
  return (
    <nav className="bg-white py-4 px-6 flex justify-between items-center shadow-sm">
      <Link to={"/"} className="flex items-center">
        <img
          src={logo}
          alt="logo Recipedia"
          className="h-8 w-auto mr-2 hover:cursor-pointer"
        />
      </Link>
      <div className="flex items-center gap-4">
        <Link
          to="/login"
          className="text-primary-light font-medium hover:text-primary-dark transition-colors"
        >
          Log in
        </Link>
        <Link
          to="/register"
          className="bg-primary hover:bg-primary-hover text-white font-medium py-2 px-4 rounded-button transition-colors"
        >
          Sign up free
        </Link>
      </div>
    </nav>
  );
};

export default PublicNavbar;
