import React from "react";
import { MdEmail, MdPerson } from "react-icons/md";
import {
  FaGenderless,
  FaRulerVertical,
  FaWeight,
  FaBolt,
  FaUtensils,
  FaExclamationTriangle,
} from "react-icons/fa";

const UserProfileCard = ({ user }) => {
  if (!user) return null;

  const getActivityLevelText = (level) => {
    const levels = {
      low: "Sedentary (little or no exercise)",
      light: "Light (exercise 1-3 times/week)",
      moderate: "Moderate (exercise 3-5 times/week)",
      high: "Active (exercise 6-7 times/week)",
      very_high: "Very Active (hard exercise daily)",
    };
    return levels[level] || level;
  };

  const capitalize = (str) => {
    if (!str) return "";
    return str
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  return (
    <div className="bg-white rounded-lg shadow-md px-6 border border-gray-100">
      <div className="flex flex-col md:flex-row md:items-center">
        <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full flex items-center justify-center shadow-md">
          {user.avatar ? (
            <img
              src={user.avatar}
              alt={`${user.username}'s avatar`}
              className="w-18 h-18 rounded-full object-cover"
            />
          ) : (
            <span className="text-3xl font-bold text-white">
              {user.username?.charAt(0)?.toUpperCase() || "R"}
            </span>
          )}
        </div>
        <div className="mt-4 md:mt-0 md:ml-6">
          <h2 className="text-2xl font-bold text-gray-800">{user.username}</h2>
          <p className="text-sm text-gray-500 flex items-center">
            <MdEmail className="w-4 h-4 mr-1" />
            {user.email}
          </p>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-gray-50 p-4 rounded-lg border border-gray-100 transition-all hover:shadow-md">
          <div className="flex items-center mb-2">
            <MdPerson className="w-5 h-5 text-blue-500 mr-2" />
            <p className="text-sm font-medium text-gray-500">Age</p>
          </div>
          <p className="text-lg font-semibold text-gray-800 ml-7">
            {user.age || "N/A"}
          </p>
        </div>

        <div className="bg-gray-50 p-4 rounded-lg border border-gray-100 transition-all hover:shadow-md">
          <div className="flex items-center mb-2">
            <FaGenderless className="w-5 h-5 text-purple-500 mr-2" />
            <p className="text-sm font-medium text-gray-500">Gender</p>
          </div>
          <p className="text-lg font-semibold text-gray-800 ml-7">
            {capitalize(user.gender) || "N/A"}
          </p>
        </div>

        <div className="bg-gray-50 p-4 rounded-lg border border-gray-100 transition-all hover:shadow-md">
          <div className="flex items-center mb-2">
            <FaRulerVertical className="w-5 h-5 text-green-500 mr-2" />
            <p className="text-sm font-medium text-gray-500">Height</p>
          </div>
          <p className="text-lg font-semibold text-gray-800 ml-7">
            {user.height ? `${user.height} cm` : "N/A"}
          </p>
        </div>

        <div className="bg-gray-50 p-4 rounded-lg border border-gray-100 transition-all hover:shadow-md">
          <div className="flex items-center mb-2">
            <FaWeight className="w-5 h-5 text-yellow-500 mr-2" />
            <p className="text-sm font-medium text-gray-500">Weight</p>
          </div>
          <p className="text-lg font-semibold text-gray-800 ml-7">
            {user.weight ? `${user.weight} kg` : "N/A"}
          </p>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
        {user.activity_level && (
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-4 rounded-lg border border-blue-100">
            <div className="flex items-center mb-2">
              <FaBolt className="w-5 h-5 text-blue-600 mr-2" />
              <h3 className="text-md font-semibold text-gray-700">
                Activity Level
              </h3>
            </div>
            <p className="text-md text-blue-800 ml-7">
              {getActivityLevelText(user.activity_level)}
            </p>
          </div>
        )}

        {user.diet && (
          <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-4 rounded-lg border border-green-100">
            <div className="flex items-center mb-2">
              <FaUtensils className="w-5 h-5 text-green-600 mr-2" />
              <h3 className="text-md font-semibold text-gray-700">
                Diet Preference
              </h3>
            </div>
            <p className="text-md text-green-800 ml-7">
              {capitalize(user.diet)}
            </p>
          </div>
        )}
      </div>

      {user.allergies && user.allergies.length > 0 && (
        <div className="mt-4 bg-gradient-to-r from-red-50 to-orange-50 p-4 rounded-lg border border-red-100">
          <div className="flex items-center mb-2">
            <FaExclamationTriangle className="w-5 h-5 text-red-500 mr-2" />
            <h3 className="text-md font-semibold text-gray-700">
              Food Allergies
            </h3>
          </div>
          <div className="ml-7 flex flex-wrap gap-2">
            {user.allergies.length === 0 ? (
              <p className="text-green-700">No allergies reported</p>
            ) : (
              user.allergies.map((allergy, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-white text-red-700 rounded-full text-sm border border-red-200"
                >
                  {allergy}
                </span>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default UserProfileCard;
