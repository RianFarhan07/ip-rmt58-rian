import React from "react";
import { FiClock, FiHeart } from "react-icons/fi";
import defaultImage from "../assets/logo-color.png";
import { Link } from "react-router-dom";

const RecipeCategory = ({ recipe }) => {
  return (
    <Link
      to={`/recipeFullDetail/${recipe.id}`}
      className="bg-background-card rounded-card shadow-card hover:shadow-hover transition-shadow duration-300 overflow-hidden"
    >
      <div className="relative h-48 overflow-hidden">
        <img
          src={recipe.image}
          alt={recipe.title}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="p-4">
        <h3 className="font-display font-semibold text-lg text-text-primary mb-2">
          {recipe.title}
        </h3>
      </div>
    </Link>
  );
};

export default RecipeCategory;
