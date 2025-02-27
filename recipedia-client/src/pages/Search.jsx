import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FiSearch, FiFilter, FiX, FiArrowLeft } from "react-icons/fi";
import Footer from "../components/Footer";
import RecipeServerCard from "../components/RecipeServerCard";
import axios from "axios";
import { BASE_URL } from "../helpers/url";
import RecipeCardIngredients from "../components/RecipeCardIngredients";

const Search = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedIngredients, setSelectedIngredients] = useState([]);
  const [error, setError] = useState(null);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearch = async (e) => {
    e.preventDefault();

    if (searchQuery.trim()) {
      const ingredients = searchQuery
        .split(",")
        .map((ingredient) => ingredient.trim())
        .filter((ingredient) => ingredient !== "");

      setSelectedIngredients(ingredients);

      await searchRecipes(ingredients);
    }
  };

  const removeIngredient = (ingredientToRemove) => {
    const updatedIngredients = selectedIngredients.filter(
      (ingredient) => ingredient !== ingredientToRemove
    );
    setSelectedIngredients(updatedIngredients);

    if (updatedIngredients.length > 0) {
      searchRecipes(updatedIngredients);
    } else {
      setSearchResults([]);
    }
  };

  const searchRecipes = async (ingredients) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await axios.get(
        `${BASE_URL}/recipes/findByIngredients`,
        {
          params: { ingredients: ingredients.join(",") },
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        }
      );

      setSearchResults(response.data);
    } catch (error) {
      console.error("Error searching recipes:", error);
      setError("Failed to search recipes. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const clearSearch = () => {
    setSearchQuery("");
    setSelectedIngredients([]);
    setSearchResults([]);
  };

  return (
    <div className="min-h-screen bg-background">
      <section className="bg-primary-dark text-text-light py-8 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center mb-4">
            <Link to="/" className="text-white mr-4">
              <FiArrowLeft size={24} />
            </Link>
            <h1 className="font-display text-3xl font-bold">Recipe Search</h1>
          </div>
          <p className="text-lg opacity-90 mb-6">
            Search for recipes by entering ingredients separated by commas
          </p>

          <form onSubmit={handleSearch} className="relative mb-4">
            <div className="flex">
              <div className="relative flex-grow">
                <input
                  type="text"
                  placeholder="Enter ingredients (e.g. chicken, rice, tomatoes)"
                  className="w-full py-3 px-4 pr-12 text-lg rounded-l-lg bg-white text-text-primary border-2 border-accent outline-none focus:ring-2 focus:ring-accent"
                  value={searchQuery}
                  onChange={handleSearchChange}
                />
                {searchQuery && (
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                    onClick={clearSearch}
                  >
                    <FiX size={20} />
                  </button>
                )}
              </div>
              <button
                type="submit"
                className="py-3 px-6 bg-accent hover:bg-accent-dark transition-all duration-300 text-white font-bold rounded-r-lg flex items-center"
              >
                <FiSearch size={20} className="mr-2" />
                Search
              </button>
            </div>
          </form>

          {selectedIngredients.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-4">
              {selectedIngredients.map((ingredient, index) => (
                <div
                  key={index}
                  className="bg-white bg-opacity-20 text-white px-3 py-1 rounded-full flex items-center"
                >
                  <span>{ingredient}</span>
                  <button
                    onClick={() => removeIngredient(ingredient)}
                    className="ml-2 text-white hover:text-red-300"
                  >
                    <FiX size={16} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-4 py-8">
        <section>
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
              {error}
            </div>
          )}

          {isLoading ? (
            <div className="text-center py-8">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
              <p className="mt-4 text-text-secondary">
                Searching for recipes...
              </p>
            </div>
          ) : (
            <>
              {searchResults.length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {searchResults.map((recipe) => (
                    <Link key={recipe.id} to={`/recipeFullDetail/${recipe.id}`}>
                      <RecipeCardIngredients recipe={recipe} />
                    </Link>
                  ))}
                </div>
              )}

              {selectedIngredients.length > 0 &&
                searchResults.length === 0 &&
                !isLoading && (
                  <div className="text-center py-12">
                    <div className="text-6xl mb-4">🍽️</div>
                    <h3 className="text-xl font-medium mb-2">
                      No recipes found with those ingredients
                    </h3>
                    <p className="text-text-secondary mb-6">
                      Try using fewer ingredients or check your spelling
                    </p>
                    <button
                      onClick={clearSearch}
                      className="py-2 px-4 bg-primary text-white rounded-lg hover:bg-primary-dark transition-all duration-300"
                    >
                      Clear Search
                    </button>
                  </div>
                )}

              {selectedIngredients.length === 0 && (
                <div className="text-center py-12">
                  <div className="text-6xl mb-4">🔍</div>
                  <h3 className="text-xl font-medium mb-2">
                    Search for recipes by ingredients
                  </h3>
                  <p className="text-text-secondary">
                    Enter ingredients separated by commas to find matching
                    recipes
                  </p>
                </div>
              )}
            </>
          )}
        </section>
      </div>

      <Footer />
    </div>
  );
};

export default Search;
