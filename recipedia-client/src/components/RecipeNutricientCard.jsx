const RecipeNutricientCard = ({ recipe }) => {
  if (!recipe) {
    return (
      <div className="bg-white rounded-lg shadow-md p-4">
        Recipe data not available
      </div>
    );
  }

  const nutrients = recipe.nutrition?.nutrients || [];

  const calories = nutrients.find((n) => n?.name === "Calories")?.amount || 0;
  const protein = nutrients.find((n) => n?.name === "Protein")?.amount || 0;
  const carbs = nutrients.find((n) => n?.name === "Carbohydrates")?.amount || 0;
  const fat = nutrients.find((n) => n?.name === "Fat")?.amount || 0;

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <div className="relative h-48">
        {recipe.image ? (
          <img
            src={recipe.image}
            alt={recipe.title || "Recipe image"}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full bg-gray-200 flex items-center justify-center">
            <span className="text-gray-400">No image available</span>
          </div>
        )}
        <div className="absolute top-2 right-2">
          <span className="px-2 py-1 bg-blue-500 text-white text-xs font-bold rounded-full">
            {Math.round(calories)} kcal
          </span>
        </div>
      </div>
      <div className="p-4">
        <h3 className="font-semibold text-lg text-gray-800 mb-3 line-clamp-1">
          {recipe.title || "Untitled Recipe"}
        </h3>

        <div className="flex space-x-2 mb-3">
          <div className="flex-1 bg-green-100 p-2 rounded-md text-center">
            <p className="text-xs text-gray-600">Carbs</p>
            <p className="text-sm font-medium text-gray-800">
              {Math.round(carbs)}g
            </p>
          </div>
          <div className="flex-1 bg-blue-100 p-2 rounded-md text-center">
            <p className="text-xs text-gray-600">Protein</p>
            <p className="text-sm font-medium text-gray-800">
              {Math.round(protein)}g
            </p>
          </div>
          <div className="flex-1 bg-yellow-100 p-2 rounded-md text-center">
            <p className="text-xs text-gray-600">Fat</p>
            <p className="text-sm font-medium text-gray-800">
              {Math.round(fat)}g
            </p>
          </div>
        </div>

        <button className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors">
          View Recipe
        </button>
      </div>
    </div>
  );
};

export default RecipeNutricientCard;
