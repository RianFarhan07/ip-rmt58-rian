import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";
import Footer from "../components/Footer";
import axios from "axios";
import { BASE_URL } from "../helpers/url";
import RecipeCategory from "../components/RecipeCategory";

const Category = () => {
  const { category } = useParams();
  const [recipes, setRecipes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchCategoryRecipes = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(
        `${BASE_URL}/recipes/categories/${category}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        }
      );
      console.log(response.data);

      setRecipes(response.data.results);
    } catch (error) {
      console.error("Error fetching category recipes:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCategoryRecipes();
  }, [category]);

  if (!category && !isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center p-8">
          <h1 className="text-3xl font-bold mb-4">Category Not Found</h1>
          <p className="mb-6">
            Sorry, we couldn't find the category you're looking for.
          </p>
          <Link
            to="/"
            className="bg-primary text-white px-6 py-2 rounded-button hover:bg-primary-hover transition-colors"
          >
            Return to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <section className="bg-primary-dark text-text-light py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <Link
            to="/"
            className="inline-flex items-center text-text-light mb-6 hover:text-accent transition-colors"
          >
            <FiArrowLeft className="mr-2" /> Back to Home
          </Link>
          <div className="flex items-center">
            <div>
              <h1 className="font-display text-3xl md:text-4xl font-bold">
                {category} Recipes
              </h1>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-4 py-8">
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {Array(8)
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
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {recipes.map((recipe) => (
              <Link key={recipe.id} to={`/recipe/${recipe.id}`}>
                <RecipeCategory recipe={recipe} />
              </Link>
            ))}
          </div>
        )}

        {!isLoading && recipes.length === 0 && (
          <div className="text-center py-12">
            <div className="text-4xl mb-4">😕</div>
            <h3 className="text-xl font-semibold mb-2">No Recipes Found</h3>
            <p className="text-text-secondary">
              We couldn't find any recipes in this category. Try adjusting your
              filters or check back later.
            </p>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default Category;
