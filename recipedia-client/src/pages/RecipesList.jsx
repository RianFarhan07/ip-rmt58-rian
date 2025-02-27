import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";
import Footer from "../components/Footer";
import RecipeServerCard from "../components/RecipeServerCard";
import axios from "axios";
import { BASE_URL } from "../helpers/url";
import { useDispatch, useSelector } from "react-redux";
import { fetchRecipes } from "../features/recipe/recipeSlice";
const RecipesList = () => {
  const [error, setError] = useState(null);
  const recipe = useSelector((state) => state.recipe.list);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  const fetchRecipe = async () => {
    setIsLoading(true);
    try {
      dispatch(fetchRecipes());
    } catch (error) {
      console.error("Error fetching recipe:", error);
      setError("Failed to fetch recipes. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchRecipe();
  }, []);

  if (error) {
    return (
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
        {error.response?.data.message || error}
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="text-center py-8">
        <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        <p className="mt-4 text-text-secondary">Fetching recipes...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <section className="bg-primary-dark text-text-light py-8 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center mb-4">
            <Link to="/" className="text-white mr-4">
              <FiArrowLeft size={24} />
            </Link>
            <h1 className="font-display text-3xl font-bold">
              All most saved Recipe
            </h1>
          </div>
        </div>
      </section>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 my-10">
        {recipe.map((recipe) => (
          <Link key={recipe.id} to={`/recipeFullDetail/${recipe.id}`}>
            <RecipeServerCard recipe={recipe} />
          </Link>
        ))}
      </div>

      <Footer />
    </div>
  );
};

export default RecipesList;
