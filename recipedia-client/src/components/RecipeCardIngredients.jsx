import React from "react";
import { AiFillHeart } from "react-icons/ai";
import defaultImage from "../assets/logo-color.png";

const RecipeCardIngredients = ({ recipe }) => {
  const totalIngredients =
    recipe.usedIngredientCount + recipe.missedIngredientCount;
  const usedPercentage =
    totalIngredients > 0
      ? Math.round((recipe.usedIngredientCount / totalIngredients) * 100)
      : 0;

  const displayIngredients = [
    ...(recipe.usedIngredients || []),
    ...(recipe.missedIngredients || []),
  ].slice(0, 3);

  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden">
      <div className="relative h-48 overflow-hidden">
        <img
          src={recipe.image || defaultImage}
          alt={recipe.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-2 right-2">
          <button
            className="p-2 bg-white bg-opacity-80 rounded-full text-red-500 hover:text-red-700 transition-colors"
            aria-label="Like recipe"
          >
            <AiFillHeart
              className="h-5 w-5"
              fill={recipe.likes > 0 ? "red" : "gray"}
            />
          </button>
        </div>
        <div className="absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-black to-transparent">
          <div className="flex gap-2">
            {displayIngredients.map((ingredient, index) => (
              <span
                key={index}
                className="text-xs px-2 py-1 rounded-full text-white bg-green-600 truncate max-w-[100px]"
              >
                {ingredient.name}
              </span>
            ))}
          </div>
        </div>
      </div>
      <div className="p-4">
        <h3 className="font-semibold text-lg text-gray-800 mb-2 line-clamp-1">
          {recipe.title}
        </h3>
        <div className="flex justify-between items-center mb-3">
          <div className="flex items-center">
            <span className="text-amber-600 font-bold text-sm">
              ❤️ {recipe.likes || 0}
            </span>
          </div>
        </div>
        <div className="mt-3 bg-gray-100 rounded-full h-2.5">
          <div
            className="bg-green-600 h-2.5 rounded-full"
            style={{ width: `${usedPercentage}%` }}
            title={`You have ${recipe.usedIngredientCount} of ${totalIngredients} ingredients`}
          ></div>
        </div>
        <div className="flex justify-between items-center mt-2">
          <span className="text-xs px-2 py-1 bg-gray-100 rounded-full text-gray-700">
            {recipe.usedIngredientCount}/{totalIngredients} ingredients
          </span>
        </div>
      </div>
    </div>
  );
};

export default RecipeCardIngredients;
