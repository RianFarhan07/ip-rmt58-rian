import React from "react";
import { FaUtensils, FaClock, FaExclamationCircle } from "react-icons/fa";

const NotFound = () => {
  return (
    <div className="w-full h-full min-h-64 flex flex-col items-center justify-center p-6 bg-background-card rounded-card shadow-card">
      <div className="text-accent mb-4">
        <FaUtensils size={48} />
      </div>

      <div className="flex items-center justify-center mb-3">
        <FaClock className="text-primary mr-2" size={24} />
        <h2 className="text-xl md:text-2xl font-semibold text-bold font-display">
          This Feature is Coming Soon
        </h2>
      </div>

      <p className="text-text-secondary text-center mb-6 max-w-md">
        We're cooking up something delicious!
      </p>

      <div className="bg-background-dark p-4 rounded-button mb-4 flex items-center text-secondary">
        <FaExclamationCircle size={20} className="mr-2 text-primary" />
        <span>This feature is currently under development</span>
      </div>

      <a
        href="/"
        className="inline-flex items-center justify-center px-6 py-2 bg-primary hover:bg-primary-hover text-text-light rounded-button shadow-button transition-colors duration-300"
      >
        Return to Home
      </a>
    </div>
  );
};

export default NotFound;
