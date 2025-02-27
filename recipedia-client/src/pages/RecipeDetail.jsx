import axios from "axios";
import React, { useEffect, useState } from "react";
import { BiCircle } from "react-icons/bi";
import {
  FaClock,
  FaUsers,
  FaHeart,
  FaArrowLeft,
  FaTag,
  FaCheckCircle,
} from "react-icons/fa";
import { useParams } from "react-router-dom";
import { BASE_URL } from "../helpers/url";

const RecipeDetail = () => {
  const [recipe, setRecipe] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    fetchRecipe();
  }, [id]);

  const fetchRecipe = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/recipes/server/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      });
      console.log(response);

      // Check if the fields are strings that need parsing or are already arrays
      const recipeData = {
        ...response.data,
        dish_types:
          typeof response.data.dish_types === "string"
            ? JSON.parse(response.data.dish_types)
            : response.data.dish_types,
        ingredients:
          typeof response.data.ingredients === "string"
            ? JSON.parse(response.data.ingredients)
            : response.data.ingredients,
      };

      setRecipe(recipeData);
    } catch (error) {
      console.error("Error fetching recipe:", error);
    }
  };

  // Fixed createMarkup function to correctly return the object structure
  const createMarkup = (htmlContent) => {
    return { __dangerouslySetInnerHTML: { __html: htmlContent } };
  };

  if (!recipe) {
    return <p>Loading...</p>;
  }

  return (
    <div className="bg-background min-h-screen pb-12">
      <div className="max-w-6xl mx-auto px-4 py-6">
        {/* Recipe Header */}
        <div className="bg-background-card rounded-card shadow-card overflow-hidden mb-8">
          <div className="relative">
            <img
              src={recipe.image_url}
              alt={recipe.title}
              className="w-full h-64 object-cover"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6">
              <h1 className="text-3xl font-display font-bold text-white">
                {recipe.title}
              </h1>
            </div>
          </div>

          {/* Recipe Quick Info */}
          <div className="p-6 flex flex-wrap gap-6 bg-white border-b border-gray-200">
            <div className="flex items-center gap-2">
              <FaClock className="text-primary" size={20} />
              <div>
                <p className="text-text-secondary text-sm">Total Time</p>
                <p className="text-text-primary font-medium">
                  {recipe.ready_in_minutes} mins
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <FaUsers className="text-primary" size={20} />
              <div>
                <p className="text-text-secondary text-sm">Servings</p>
                <p className="text-text-primary font-medium">
                  {recipe.servings}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <FaHeart className="text-success" size={20} />
              <div>
                <p className="text-text-secondary text-sm">Health Score</p>
                <p className="text-text-primary font-medium">
                  {recipe.health_score}/100
                </p>
              </div>
            </div>

            {recipe.dish_types && recipe.dish_types.length > 0 && (
              <div className="flex items-center gap-2">
                <FaTag className="text-primary" size={20} />
                <div>
                  <p className="text-text-secondary text-sm">Meal Type</p>
                  <div className="flex gap-2 flex-wrap mt-1">
                    {recipe.dish_types.map((type, index) => (
                      <span
                        key={index}
                        className="bg-accent-light/30 text-secondary-dark text-xs px-2 py-1 rounded-full capitalize"
                      >
                        {type}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Diet Information */}
          <div className="p-6 bg-background-dark flex flex-wrap gap-4">
            <div className="flex items-center gap-2">
              <FaCheckCircle
                size={18}
                className={
                  recipe.gluten_free ? "text-success" : "text-text-secondary"
                }
              />
              <span
                className={
                  recipe.gluten_free ? "font-medium" : "text-text-secondary"
                }
              >
                Gluten Free
              </span>
            </div>
            <div className="flex items-center gap-2">
              <FaCheckCircle
                size={18}
                className={
                  recipe.dairy_free ? "text-success" : "text-text-secondary"
                }
              />
              <span
                className={
                  recipe.dairy_free ? "font-medium" : "text-text-secondary"
                }
              >
                Dairy Free
              </span>
            </div>
            <div className="flex items-center gap-2">
              <FaCheckCircle
                size={18}
                className={
                  recipe.vegetarian ? "text-success" : "text-text-secondary"
                }
              />
              <span
                className={
                  recipe.vegetarian ? "font-medium" : "text-text-secondary"
                }
              >
                Vegetarian
              </span>
            </div>
            <div className="flex items-center gap-2">
              <FaCheckCircle
                size={18}
                className={
                  recipe.vegan ? "text-success" : "text-text-secondary"
                }
              />
              <span
                className={recipe.vegan ? "font-medium" : "text-text-secondary"}
              >
                Vegan
              </span>
            </div>
            <div className="flex items-center gap-2">
              <FaCheckCircle
                size={18}
                className={
                  recipe.very_healthy ? "text-success" : "text-text-secondary"
                }
              />
              <span
                className={
                  recipe.very_healthy ? "font-medium" : "text-text-secondary"
                }
              >
                Very Healthy
              </span>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Ingredients Section */}
          <div className="md:col-span-1">
            <div className="bg-background-card rounded-card shadow-card p-6 mb-6">
              <h2 className="text-xl font-display font-bold text-bold mb-4 border-b border-gray-200 pb-2">
                Ingredients
              </h2>
              <ul className="space-y-2">
                {recipe.ingredients &&
                  recipe.ingredients.map((ingredient, index) => (
                    <li key={index} className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-primary"></span>
                      <span className="capitalize">{ingredient}</span>
                    </li>
                  ))}
              </ul>
            </div>

            {/* Cooking & Prep Time */}
            <div className="bg-background-card rounded-card shadow-card p-6">
              <h2 className="text-xl font-display font-bold text-bold mb-4 border-b border-gray-200 pb-2">
                Time Breakdown
              </h2>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-text-secondary">Preparation</span>
                    <span className="text-bold font-medium">
                      {recipe.preparation_minutes} mins
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-primary-light h-2 rounded-full"
                      style={{
                        width: `${
                          (recipe.preparation_minutes /
                            recipe.ready_in_minutes) *
                          100
                        }%`,
                      }}
                    ></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-text-secondary">Cooking</span>
                    <span className="text-bold font-medium">
                      {recipe.cooking_minutes} mins
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-accent h-2 rounded-full"
                      style={{
                        width: `${
                          (recipe.cooking_minutes / recipe.ready_in_minutes) *
                          100
                        }%`,
                      }}
                    ></div>
                  </div>
                </div>
                <div className="pt-2 border-t border-gray-200">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">Total Time</span>
                    <span className="text-bold font-bold">
                      {recipe.ready_in_minutes} mins
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Recipe Summary and Instructions */}
          <div className="md:col-span-2">
            <div className="bg-background-card rounded-card shadow-card p-6 mb-6">
              <h2 className="text-xl font-display font-bold text-bold mb-4 border-b border-gray-200 pb-2">
                About This Recipe
              </h2>
              {/* Fixed div to correctly use the dangerouslySetInnerHTML */}
              <div
                className="prose max-w-none text-text-primary"
                dangerouslySetInnerHTML={{ __html: recipe.summary }}
              />
            </div>

            {recipe.instructions ? (
              <div className="bg-background-card rounded-card shadow-card p-6">
                <h2 className="text-xl font-display font-bold text-bold mb-4 border-b border-gray-200 pb-2">
                  Instructions
                </h2>
                {/* Fixed div to correctly use the dangerouslySetInnerHTML */}
                <div
                  className="prose max-w-none text-text-primary"
                  dangerouslySetInnerHTML={{ __html: recipe.instructions }}
                />
              </div>
            ) : (
              <div className="bg-background-card rounded-card shadow-card p-6">
                <h2 className="text-xl font-display font-bold text-bold mb-4 border-b border-gray-200 pb-2">
                  Instructions
                </h2>
                <div className="flex flex-col items-center justify-center py-8 text-center">
                  <p className="text-text-secondary mb-2">
                    Instructions are not available for this recipe.
                  </p>
                  <p className="text-text-primary">
                    Try following a standard ramen noodle chicken salad
                    preparation method with the listed ingredients.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipeDetail;
