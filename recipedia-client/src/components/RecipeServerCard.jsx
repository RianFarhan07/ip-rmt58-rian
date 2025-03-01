import { useState } from "react";
import { FiClock, FiHeart, FiXCircle } from "react-icons/fi";
import defaultImage from "../assets/logo-color.png";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToMyRecipe } from "../features/myRecipe/myRecipe";
import Swal from "sweetalert2";

const RecipeServerCard = ({ recipe }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const dishTypes = recipe.dish_types ? JSON.parse(recipe.dish_types) : [];
  const ingredients = recipe.ingredients ? JSON.parse(recipe.ingredients) : [];

  const tags = dishTypes.slice(0, 3);

  const getDifficulty = (minutes) => {
    if (minutes <= 15) return "Easy";
    if (minutes <= 30) return "Medium";
    return "Hard";
  };

  const handleAdd = async (id) => {
    try {
      await dispatch(addToMyRecipe(id));
      navigate("/saved-recipe");
    } catch (error) {
      console.log(error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: error.response?.data.message || error,
      });
    }
  };

  return (
    <div className="bg-background-card rounded-card shadow-card hover:shadow-hover transition-shadow duration-300 overflow-hidden relative">
      {/* Card Content with Links */}
      <Link to={`/recipeDetail/${recipe.id}`} className="block">
        <div className="relative h-48 overflow-hidden">
          <img
            src={recipe.image_url || defaultImage}
            alt={recipe.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute top-2 right-2">
            <button
              className="p-2 bg-white bg-opacity-80 rounded-full text-primary hover:text-primary-dark transition-colors"
              onClick={(e) => {
                e.preventDefault(); // Prevent link navigation
                // Add favorite functionality here
              }}
            >
              <FiHeart className={recipe.vegetarian ? "fill-primary" : ""} />
            </button>
          </div>
          <div className="absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-black to-transparent">
            <div className="flex gap-2">
              {tags.map((tag, index) => (
                <span
                  key={index}
                  className="text-xs px-2 py-1 rounded-full text-text-light bg-primary"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
        <div className="p-4">
          <h3 className="font-display font-semibold text-lg text-text-primary mb-2 line-clamp-1 hover:text-primary-dark transition-colors">
            {recipe.title}
          </h3>
          <div className="flex justify-between items-center mb-3">
            <div className="flex items-center text-text-secondary text-sm">
              <FiClock className="mr-1" />
              <span>{recipe.ready_in_minutes} min</span>
            </div>
            <div className="flex items-center">
              <span className="text-accent-dark font-bold text-sm">
                ★ {recipe.health_score}
              </span>
            </div>
          </div>
          <div className="flex justify-between items-center">
            <span
              className={`text-xs px-2 py-1 bg-background-dark rounded-full ${
                recipe.vegetarian ? "text-green-500" : "text-red-500"
              }`}
            >
              {recipe.vegetarian ? "Vegetarian" : "Non-Vegetarian"}
            </span>
            <span className="text-xs px-2 py-1 bg-background-dark rounded-full text-secondary">
              {getDifficulty(recipe.ready_in_minutes)}
            </span>
          </div>
        </div>
      </Link>

      {/* Save Button - Outside of Link to avoid navigation */}
      <button
        onClick={() => handleAdd(recipe.spoonacular_id)}
        className="w-full py-2 bg-primary-dark hover:bg-primary text-white transition-colors rounded-b-card font-medium"
      >
        Save Recipe
      </button>
    </div>
  );
};

export default RecipeServerCard;
