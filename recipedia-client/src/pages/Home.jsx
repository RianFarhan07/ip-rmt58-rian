import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FiSearch,
  FiClock,
  FiHeart,
  FiBookmark,
  FiArrowRight,
  FiXCircle,
} from "react-icons/fi";
import { BiCategory, BiLeaf } from "react-icons/bi";
import { GiMeal } from "react-icons/gi";
import Footer from "../components/Footer";
import RecipeServerCard from "../components/RecipeServerCard";
import axios from "axios";
import { BASE_URL } from "../helpers/url";
import Swal from "sweetalert2";

const Home = () => {
  const [recentRecipe, setRecentRecipe] = useState([]);
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchRecentRecipes = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(`${BASE_URL}/recipes/mostRecent`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      });

      console.log(response);

      setRecentRecipe(response.data);

      setCategories([
        { id: 1, name: "Main Course", icon: "🍽️", popularity: 5 },
        { id: 2, name: "Side Dish", icon: "🥗", popularity: 4 },
        { id: 3, name: "Dessert", icon: "🍰", popularity: 5 },
        { id: 4, name: "Appetizer", icon: "🥟", popularity: 3 },
        { id: 5, name: "Salad", icon: "🥬", popularity: 4 },
        { id: 6, name: "Bread", icon: "🍞", popularity: 3 },
        { id: 7, name: "Breakfast", icon: "☕", popularity: 5 },
        { id: 8, name: "Soup", icon: "🍲", popularity: 4 },
        { id: 9, name: "Beverage", icon: "🥤", popularity: 3 },
        { id: 10, name: "Sauce", icon: "🧂", popularity: 2 },
        { id: 11, name: "Marinade", icon: "🧄", popularity: 1 },
        { id: 12, name: "Fingerfood", icon: "🍤", popularity: 4 },
        { id: 13, name: "Snack", icon: "🍿", popularity: 4 },
        { id: 14, name: "Drink", icon: "🍹", popularity: 3 },
      ]);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchRecentRecipes();
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <section className="relative bg-primary-dark text-text-light py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="max-w-2xl mb-8">
            <h1 className="font-display text-4xl md:text-5xl font-bold mb-4">
              Discover Delicious Recipes for Every Taste
            </h1>
            <p className="text-lg opacity-90 mb-8">
              Find inspiration for your next meal with our collection of
              easy-to-follow recipes
            </p>
            <Link
              to="/search"
              className="w-50 py-3 px-32 text-lg font-bold rounded-lg bg-white hover:bg-primary-light transition-all duration-300 text-text-primary border-2 border-accent outline-none focus:ring-2 focus:ring-accent hover:border-white hover:focus:ring-white "
            >
              🔍 Search now
            </Link>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-background to-transparent"></div>
      </section>

      <div className="max-w-6xl mx-auto px-4 py-8">
        <section className="mb-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-background-card p-6 rounded-card shadow-card hover:shadow-hover transition-all duration-300">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-full bg-primary-light flex items-center justify-center text-text-light mr-4">
                  <GiMeal size={24} />
                </div>
                <h3 className="font-display font-semibold text-lg">
                  Thousands of Recipes
                </h3>
              </div>
              <p className="text-text-secondary">
                Browse our extensive collection of recipes for every occasion,
                skill level, and dietary preference.
              </p>
            </div>
            <div className="bg-background-card p-6 rounded-card shadow-card hover:shadow-hover transition-all duration-300">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-full bg-primary-light flex items-center justify-center text-text-light mr-4">
                  <BiLeaf size={24} />
                </div>
                <h3 className="font-display font-semibold text-lg">
                  Dietary Options
                </h3>
              </div>
              <p className="text-text-secondary">
                Find recipes that match your dietary needs, whether vegetarian,
                gluten-free, low-carb, or other preferences.
              </p>
            </div>
            <div className="bg-background-card p-6 rounded-card shadow-card hover:shadow-hover transition-all duration-300">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-full bg-primary-light flex items-center justify-center text-text-light mr-4">
                  <FiBookmark size={24} />
                </div>
                <h3 className="font-display font-semibold text-lg">
                  Save Favorites
                </h3>
              </div>
              <p className="text-text-secondary">
                Create your personal cookbook by saving recipes you love and
                organizing them into collections.
              </p>
            </div>
          </div>
        </section>

        <section className="mb-12">
          <div className="flex justify-between items-center mb-6">
            <h2 className="font-display text-2xl font-bold text-text-primary">
              <BiCategory className="inline mr-2" />
              Browse Categories
            </h2>
          </div>

          <div className="relative">
            <div className="overflow-x-auto pb-4 hide-scrollbar">
              <div
                className="flex space-x-4"
                style={{ minWidth: "max-content" }}
              >
                {isLoading
                  ? Array(6)
                      .fill(0)
                      .map((_, index) => (
                        <div
                          key={index}
                          className="bg-background-card rounded-card p-4 shadow-card animate-pulse h-32 w-32 flex-shrink-0"
                        >
                          <div className="w-12 h-12 mx-auto bg-gray-200 rounded-full mb-2"></div>
                          <div className="h-4 bg-gray-200 rounded mx-auto w-20 mb-2"></div>
                          <div className="h-3 bg-gray-200 rounded mx-auto w-10"></div>
                        </div>
                      ))
                  : categories.map((category) => (
                      <Link
                        key={category.id}
                        to={`/categories/${category.name}`}
                        className="bg-background-card rounded-card p-4 shadow-card hover:shadow-hover transition-all text-center w-32 flex-shrink-0"
                      >
                        <div className="text-3xl mb-2">{category.icon}</div>
                        <h3 className="font-display font-medium text-text-primary mb-1 text-sm">
                          {category.name}
                        </h3>
                        <p className="text-xs text-text-secondary">
                          {category.popularity} stars
                        </p>
                      </Link>
                    ))}
              </div>
            </div>
            <div className="absolute top-0 right-0 bottom-0 w-12 bg-gradient-to-l from-background to-transparent pointer-events-none"></div>
            <div className="absolute top-0 left-0 bottom-0 w-12 bg-gradient-to-r from-background to-transparent pointer-events-none"></div>
          </div>
        </section>

        <section className="mb-12">
          <div className="flex justify-between items-center mb-6">
            <h2 className="font-display text-2xl font-bold text-text-primary">
              Most Saved Recipes
            </h2>
            <Link
              to="/recipes"
              className="text-primary-dark hover:text-primary flex items-center"
            >
              View All <FiArrowRight className="ml-1" />
            </Link>
          </div>

          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {Array(4)
                .fill(0)
                .map((_, index) => (
                  <div
                    key={index}
                    className="bg-background-card rounded-card shadow-card h-80 animate-pulse"
                  >
                    <div className="h-48 bg-gray-200 rounded-t-card"></div>
                    <div className="p-4">
                      <div className="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
                      <div className="h-3 bg-gray-200 rounded w-1/2 mb-2"></div>
                      <div className="h-3 bg-gray-200 rounded w-1/4"></div>
                    </div>
                  </div>
                ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {recentRecipe.map((recipe) => (
                <div key={recipe.id}>
                  <RecipeServerCard recipe={recipe} />
                </div>
              ))}
            </div>
          )}
        </section>
      </div>

      <Footer />
    </div>
  );
};

export default Home;
