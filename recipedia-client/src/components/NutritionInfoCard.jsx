const NutritionInfoCard = ({ nutritionInfo }) => {
  const { bmi, bmiCategory, dailyCalories, macronutrients, caloriesPerMeal } =
    nutritionInfo;

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">
        Your Nutrition Summary
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-semibold text-gray-700">
              BMI Analysis
            </h3>
            <div className="flex items-center mt-2">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                <span className="text-xl font-bold text-blue-600">
                  {bmi.toFixed(1)}
                </span>
              </div>
              <div className="ml-4">
                <p className="text-sm text-gray-500">Your BMI</p>
                <p
                  className={`text-lg font-medium ${
                    bmiCategory === "Underweight"
                      ? "text-yellow-500"
                      : bmiCategory === "Normal weight"
                      ? "text-green-500"
                      : bmiCategory === "Overweight"
                      ? "text-orange-500"
                      : "text-red-500"
                  }`}
                >
                  {bmiCategory}
                </p>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-700">
              Daily Calories
            </h3>
            <div className="mt-2 flex items-center">
              <svg
                className="w-8 h-8 text-orange-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                ></path>
              </svg>
              <div className="ml-3">
                <p className="text-sm text-gray-500">Recommended intake</p>
                <p className="text-2xl font-bold text-gray-800">
                  {dailyCalories} kcal
                </p>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-700">Per Meal</h3>
            <div className="bg-gray-100 p-3 rounded-lg mt-2">
              <p className="text-sm text-gray-600">
                Calories per meal:{" "}
                <span className="font-medium">
                  {caloriesPerMeal.min} - {caloriesPerMeal.max} kcal
                </span>
              </p>
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-gray-700 mb-3">
            Macronutrient Breakdown
          </h3>

          <div className="space-y-4">
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm font-medium text-green-600">
                  Carbs ({macronutrients.carbs.percentage}%)
                </span>
                <span className="text-sm font-medium text-gray-700">
                  {macronutrients.carbs.grams}g
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div
                  className="bg-green-600 h-2.5 rounded-full"
                  style={{ width: `${macronutrients.carbs.percentage}%` }}
                ></div>
              </div>
              <div className="mt-1 text-xs text-gray-500">
                {macronutrients.carbs.perMeal.min}-
                {macronutrients.carbs.perMeal.max}g per meal
              </div>
            </div>

            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm font-medium text-blue-600">
                  Protein ({macronutrients.protein.percentage}%)
                </span>
                <span className="text-sm font-medium text-gray-700">
                  {macronutrients.protein.grams}g
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div
                  className="bg-blue-600 h-2.5 rounded-full"
                  style={{ width: `${macronutrients.protein.percentage}%` }}
                ></div>
              </div>
              <div className="mt-1 text-xs text-gray-500">
                {macronutrients.protein.perMeal.min}-
                {macronutrients.protein.perMeal.max}g per meal
              </div>
            </div>

            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm font-medium text-yellow-600">
                  Fat ({macronutrients.fat.percentage}%)
                </span>
                <span className="text-sm font-medium text-gray-700">
                  {macronutrients.fat.grams}g
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div
                  className="bg-yellow-500 h-2.5 rounded-full"
                  style={{ width: `${macronutrients.fat.percentage}%` }}
                ></div>
              </div>
              <div className="mt-1 text-xs text-gray-500">
                {macronutrients.fat.perMeal.min}-
                {macronutrients.fat.perMeal.max}g per meal
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NutritionInfoCard;
