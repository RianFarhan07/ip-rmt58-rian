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
  FaInfoCircle,
  FaBookmark,
  FaEye,
} from "react-icons/fa";
import { Link, useNavigate, useParams } from "react-router-dom";
import { BASE_URL } from "../helpers/url";
import { useDispatch } from "react-redux";
import { addToMyRecipe } from "../features/myRecipe/myRecipe";

const RecipeDetail = () => {
  const [recipe, setRecipe] = useState(null);
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    fetchRecipe();
  }, [id]);

  const fetchRecipe = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${BASE_URL}/recipes/server/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      });
      console.log(response);

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
      if (error.response?.data.message) {
        setError(error.response.data.message);
      } else {
        setError("Failed to save recipe. Please try again later.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleSaveRecipe = async (id) => {
    try {
      await dispatch(addToMyRecipe(id));
      navigate("/saved-recipe");
    } catch (error) {
      console.log(error);
      if (error.response?.data.message) {
        setError(error.response.data.message);
      } else {
        setError("Failed to save recipe. Please try again later.");
      }
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-background">
        <div className="animate-pulse flex flex-col items-center">
          <div className="h-32 w-32 rounded-full bg-primary/30 mb-4"></div>
          <p className="text-text-secondary font-medium">Loading recipe...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-background">
        <div className="bg-background-card rounded-card shadow-card p-6 max-w-lg text-center">
          <FaInfoCircle size={48} className="text-error mx-auto mb-4" />
          <h2 className="text-xl font-display font-bold text-error mb-2">
            Something went wrong
          </h2>
          <p className="text-text-secondary mb-6">{error}</p>
          <Link
            to="/"
            className="inline-flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-lg"
          >
            <FaArrowLeft size={14} />
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-background min-h-screen pb-12">
      <div className="max-w-6xl mx-auto px-4 py-6">
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

        <button
          onClick={() => handleSaveRecipe(recipe.spoonacular_id)}
          className="w-full py-2 bg-primary-dark hover:bg-primary-light text-white rounded-md transition-colors flex items-center justify-center gap-2"
        >
          <FaBookmark className="text-lg" /> Add to My Recipes
        </button>

        <div className="grid md:grid-cols-3 gap-8">
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

          <div className="md:col-span-2">
            <div className="bg-background-card rounded-card shadow-card p-6 mb-6">
              <h2 className="text-xl font-display font-bold text-bold mb-4 border-b border-gray-200 pb-2">
                About This Recipe
              </h2>
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
                    Try to see full detail recipe information
                  </p>
                </div>
              </div>
            )}
            <div className="bg-background-card rounded-card shadow-card p-6">
              <button
                onClick={() =>
                  navigate(`/recipeFullDetail/${recipe.spoonacular_id}`)
                }
                className="w-full py-2 bg-primary-dark hover:bg-primary-light text-white rounded-md transition-colors flex items-center justify-center gap-2"
              >
                <FaEye className="text-lg" /> See Full Detail
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipeDetail;
