import { FiClock, FiHeart } from "react-icons/fi";
import defaultImage from "../assets/logo-color.png";
import { Link } from "react-router-dom";

const RecipeServerCard = ({ recipe }) => {
  // Parse dish types and ingredients from JSON strings
  const dishTypes = recipe.dish_types ? JSON.parse(recipe.dish_types) : [];
  const ingredients = recipe.ingredients ? JSON.parse(recipe.ingredients) : [];

  const tags = dishTypes.slice(0, 3);

  const getDifficulty = (minutes) => {
    if (minutes <= 15) return "Easy";
    if (minutes <= 30) return "Medium";
    return "Hard";
  };

  return (
    <Link
      to={`/recipeDetail/${recipe.id}`}
      className="bg-background-card rounded-card shadow-card hover:shadow-hover transition-shadow duration-300 overflow-hidden"
    >
      <div className="relative h-48 overflow-hidden">
        <img
          src={recipe.image_url || defaultImage}
          alt={recipe.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-2 right-2">
          <button className="p-2 bg-white bg-opacity-80 rounded-full text-primary hover:text-primary-dark transition-colors">
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
        <h3 className="font-display font-semibold text-lg text-text-primary mb-2 line-clamp-1">
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
            className={`text-xs px-2 py-1 bg-background-dark rounded-full text-secondary-dark ${
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
  );
};

export default RecipeServerCard;
