import { FiClock, FiHeart } from "react-icons/fi";

const getImageUrl = (path) => {
  return path || "/api/placeholder/400/250";
};

const RecipeCard = ({ recipe }) => (
  <div className="bg-background-card rounded-card shadow-card hover:shadow-hover transition-shadow duration-300 overflow-hidden">
    <div className="relative h-48 overflow-hidden">
      <img
        src={getImageUrl(recipe.image)}
        alt={recipe.title}
        className="w-full h-full object-cover"
      />
      <div className="absolute top-2 right-2">
        <button className="p-2 bg-white bg-opacity-80 rounded-full text-primary hover:text-primary-dark transition-colors">
          <FiHeart className={recipe.isFavorite ? "fill-primary" : ""} />
        </button>
      </div>
      <div className="absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-black to-transparent">
        <div className="flex gap-2">
          {recipe.tags.map((tag, index) => (
            <span
              key={index}
              className={`text-xs px-2 py-1 rounded-full text-text-light bg-${tag}`}
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
          <span>{recipe.prepTime} min</span>
        </div>
        <div className="flex items-center">
          <span className="text-accent-dark font-bold text-sm">
            ★ {recipe.rating}
          </span>
        </div>
      </div>
      <div className="flex justify-between items-center">
        <span className="text-xs px-2 py-1 bg-background-dark rounded-full text-secondary-dark">
          {recipe.category}
        </span>
        <span className="text-xs px-2 py-1 bg-background-dark rounded-full text-secondary">
          {recipe.difficulty}
        </span>
      </div>
    </div>
  </div>
);

export default RecipeCard;
