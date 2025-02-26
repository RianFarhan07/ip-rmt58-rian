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
            <svg
              className="w-4 h-4 mr-1"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
              <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
            </svg>
            {user.email}
          </p>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-gray-50 p-4 rounded-lg border border-gray-100 transition-all hover:shadow-md">
          <div className="flex items-center mb-2">
            <svg
              className="w-5 h-5 text-blue-500 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
              />
            </svg>
            <p className="text-sm font-medium text-gray-500">Age</p>
          </div>
          <p className="text-lg font-semibold text-gray-800 ml-7">
            {user.age || "N/A"}
          </p>
        </div>

        <div className="bg-gray-50 p-4 rounded-lg border border-gray-100 transition-all hover:shadow-md">
          <div className="flex items-center mb-2">
            <svg
              className="w-5 h-5 text-purple-500 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 6v6m0 0v6m0-6h6m-6 0H6"
              />
            </svg>
            <p className="text-sm font-medium text-gray-500">Gender</p>
          </div>
          <p className="text-lg font-semibold text-gray-800 ml-7">
            {capitalize(user.gender) || "N/A"}
          </p>
        </div>

        <div className="bg-gray-50 p-4 rounded-lg border border-gray-100 transition-all hover:shadow-md">
          <div className="flex items-center mb-2">
            <svg
              className="w-5 h-5 text-green-500 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 11l7-7 7 7M5 19l7-7 7 7"
              />
            </svg>
            <p className="text-sm font-medium text-gray-500">Height</p>
          </div>
          <p className="text-lg font-semibold text-gray-800 ml-7">
            {user.height ? `${user.height} cm` : "N/A"}
          </p>
        </div>

        <div className="bg-gray-50 p-4 rounded-lg border border-gray-100 transition-all hover:shadow-md">
          <div className="flex items-center mb-2">
            <svg
              className="w-5 h-5 text-yellow-500 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3"
              />
            </svg>
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
              <svg
                className="w-5 h-5 text-blue-600 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                />
              </svg>
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
              <svg
                className="w-5 h-5 text-green-600 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
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
            <svg
              className="w-5 h-5 text-red-500 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
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
