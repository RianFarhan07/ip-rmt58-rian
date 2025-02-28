import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, Link, useNavigate } from "react-router-dom";
import { BASE_URL } from "../helpers/url";
import {
  FaClock,
  FaUsers,
  FaHeart,
  FaArrowLeft,
  FaTag,
  FaCheckCircle,
  FaMoneyBillWave,
  FaFireAlt,
  FaStar,
  FaUtensils,
  FaLeaf,
  FaWineGlass,
  FaThumbsUp,
  FaShoppingBasket,
  FaCalendarAlt,
  FaGlobeAmericas,
  FaInfoCircle,
  FaExternalLinkAlt,
} from "react-icons/fa";
import { useDispatch } from "react-redux";
import { addToMyRecipe } from "../features/myRecipe/myRecipe";

const RecipeFullDetail = () => {
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    fetchRecipe();
  }, [id]);

  const fetchRecipe = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `${BASE_URL}/recipes/spoonacular/${id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        }
      );

      const recipeData = {
        ...response.data,
        dish_types:
          typeof response.data.dish_types === "string"
            ? JSON.parse(response.data.dish_types)
            : response.data.dish_types || [],
        ingredients:
          typeof response.data.extendedIngredients === "string"
            ? JSON.parse(response.data.extendedIngredients)
            : response.data.extendedIngredients || [],
        cuisines:
          typeof response.data.cuisines === "string"
            ? JSON.parse(response.data.cuisines)
            : response.data.cuisines || [],
        diets:
          typeof response.data.diets === "string"
            ? JSON.parse(response.data.diets)
            : response.data.diets || [],
        occasions:
          typeof response.data.occasions === "string"
            ? JSON.parse(response.data.occasions)
            : response.data.occasions || [],
      };

      setRecipe(recipeData);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching recipe:", error);
      setError("Failed to load recipe. Please try again later.");
      setLoading(false);
    }
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(price);
  };

  const handleSaveRecipe = async () => {
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

  if (!recipe) {
    return <p>No recipe data available.</p>;
  }

  return (
    <div className="bg-background min-h-screen pb-12">
      <div className="max-w-6xl mx-auto px-4 pt-6">
        <Link
          to="/recipes"
          className="inline-flex items-center gap-2 text-primary hover:text-primary-dark transition-colors mb-4"
        >
          <FaArrowLeft size={14} />
          <span>Back to recipes</span>
        </Link>
      </div>

      <div className="max-w-6xl mx-auto px-4 pb-6">
        <div className="bg-background-card rounded-card shadow-card overflow-hidden mb-8">
          <div className="relative">
            <img
              src={recipe.image}
              alt={recipe.title}
              className="w-full h-72 object-cover"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
              <div className="flex items-center gap-2 mb-2">
                {recipe.vegetarian && (
                  <span className="bg-success/20 text-success text-xs px-2 py-1 rounded-full">
                    Vegetarian
                  </span>
                )}
                {recipe.vegan && (
                  <span className="bg-success/20 text-success text-xs px-2 py-1 rounded-full">
                    Vegan
                  </span>
                )}
                {recipe.glutenFree && (
                  <span className="bg-accent/20 text-accent-dark text-xs px-2 py-1 rounded-full">
                    Gluten Free
                  </span>
                )}
                {recipe.dairyFree && (
                  <span className="bg-accent/20 text-accent-dark text-xs px-2 py-1 rounded-full">
                    Dairy Free
                  </span>
                )}
              </div>
              <h1 className="text-3xl md:text-4xl font-display font-bold text-white">
                {recipe.title}
              </h1>
              {recipe.creditsText && (
                <div className="mt-2 text-white/80 text-sm">
                  by {recipe.creditsText}{" "}
                  {recipe.sourceName && recipe.sourceUrl && (
                    <a
                      href={recipe.sourceUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 hover:text-white ml-1"
                    >
                      <span>({recipe.sourceName})</span>
                      <FaExternalLinkAlt size={10} />
                    </a>
                  )}
                </div>
              )}
            </div>
          </div>

          <div className="p-6 flex flex-wrap gap-6 bg-white border-b border-gray-200">
            <div className="flex items-center gap-2">
              <FaClock className="text-primary" size={20} />
              <div>
                <p className="text-text-secondary text-sm">Total Time</p>
                <p className="text-text-primary font-medium">
                  {recipe.readyInMinutes} mins
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
              <FaHeart
                className={recipe.veryHealthy ? "text-success" : "text-primary"}
                size={20}
              />
              <div>
                <p className="text-text-secondary text-sm">Health Score</p>
                <p className="text-text-primary font-medium">
                  {recipe.healthScore}/100
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <FaMoneyBillWave
                className={recipe.cheap ? "text-success" : "text-primary"}
                size={20}
              />
              <div>
                <p className="text-text-secondary text-sm">Price Per Serving</p>
                <p className="text-text-primary font-medium">
                  {formatPrice(recipe.pricePerServing / 100)}
                </p>
              </div>
            </div>

            {recipe.aggregateLikes > 0 && (
              <div className="flex items-center gap-2">
                <FaThumbsUp className="text-primary" size={20} />
                <div>
                  <p className="text-text-secondary text-sm">Likes</p>
                  <p className="text-text-primary font-medium">
                    {recipe.aggregateLikes}
                  </p>
                </div>
              </div>
            )}

            {recipe.spoonacularScore && (
              <div className="flex items-center gap-2">
                <FaStar className="text-yellow-500" size={20} />
                <div>
                  <p className="text-text-secondary text-sm">Rating</p>
                  <p className="text-text-primary font-medium">
                    {Math.round(recipe.spoonacularScore)}%
                  </p>
                </div>
              </div>
            )}
          </div>

          <div className="p-6 bg-background-dark">
            {recipe.diets && recipe.diets.length > 0 && (
              <div className="mb-4">
                <p className="text-text-secondary text-sm mb-2 flex items-center gap-1">
                  <FaLeaf size={14} className="text-success" />
                  <span>Diets</span>
                </p>
                <div className="flex flex-wrap gap-2">
                  {recipe.diets.map((diet, index) => (
                    <span
                      key={index}
                      className="bg-success/20 text-success-dark text-xs px-2 py-1 rounded-full capitalize"
                    >
                      {diet}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {recipe.dishTypes && recipe.dishTypes.length > 0 && (
              <div className="mb-4">
                <p className="text-text-secondary text-sm mb-2 flex items-center gap-1">
                  <FaUtensils size={14} className="text-primary" />
                  <span>Dish Types</span>
                </p>
                <div className="flex flex-wrap gap-2">
                  {recipe.dishTypes.map((type, index) => (
                    <span
                      key={index}
                      className="bg-primary/20 text-primary-dark text-xs px-2 py-1 rounded-full capitalize"
                    >
                      {type}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {recipe.cuisines && recipe.cuisines.length > 0 && (
              <div className="mb-4">
                <p className="text-text-secondary text-sm mb-2 flex items-center gap-1">
                  <FaGlobeAmericas size={14} className="text-accent" />
                  <span>Cuisines</span>
                </p>
                <div className="flex flex-wrap gap-2">
                  {recipe.cuisines.map((cuisine, index) => (
                    <span
                      key={index}
                      className="bg-accent/20 text-accent-dark text-xs px-2 py-1 rounded-full capitalize"
                    >
                      {cuisine}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {recipe.occasions && recipe.occasions.length > 0 && (
              <div>
                <p className="text-text-secondary text-sm mb-2 flex items-center gap-1">
                  <FaCalendarAlt size={14} className="text-secondary" />
                  <span>Occasions</span>
                </p>
                <div className="flex flex-wrap gap-2">
                  {recipe.occasions.map((occasion, index) => (
                    <span
                      key={index}
                      className="bg-secondary/20 text-secondary-dark text-xs px-2 py-1 rounded-full capitalize"
                    >
                      {occasion}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="p-6 bg-white border-t border-gray-200 flex flex-wrap gap-4">
            <div className="flex items-center gap-2">
              <FaCheckCircle
                size={18}
                className={
                  recipe.glutenFree ? "text-success" : "text-text-secondary"
                }
              />
              <span
                className={
                  recipe.glutenFree ? "font-medium" : "text-text-secondary"
                }
              >
                Gluten Free
              </span>
            </div>
            <div className="flex items-center gap-2">
              <FaCheckCircle
                size={18}
                className={
                  recipe.dairyFree ? "text-success" : "text-text-secondary"
                }
              />
              <span
                className={
                  recipe.dairyFree ? "font-medium" : "text-text-secondary"
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
                  recipe.veryHealthy ? "text-success" : "text-text-secondary"
                }
              />
              <span
                className={
                  recipe.veryHealthy ? "font-medium" : "text-text-secondary"
                }
              >
                Very Healthy
              </span>
            </div>
            <div className="flex items-center gap-2">
              <FaCheckCircle
                size={18}
                className={
                  recipe.cheap ? "text-success" : "text-text-secondary"
                }
              />
              <span
                className={recipe.cheap ? "font-medium" : "text-text-secondary"}
              >
                Budget Friendly
              </span>
            </div>
            <div className="flex items-center gap-2">
              <FaCheckCircle
                size={18}
                className={
                  recipe.sustainable ? "text-success" : "text-text-secondary"
                }
              />
              <span
                className={
                  recipe.sustainable ? "font-medium" : "text-text-secondary"
                }
              >
                Sustainable
              </span>
            </div>
            <div className="flex items-center gap-2">
              <FaCheckCircle
                size={18}
                className={
                  recipe.lowFodmap ? "text-success" : "text-text-secondary"
                }
              />
              <span
                className={
                  recipe.lowFodmap ? "font-medium" : "text-text-secondary"
                }
              >
                Low FODMAP
              </span>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-1">
            <div className="bg-background-card rounded-card shadow-card p-6 mb-6">
              <h2 className="text-xl font-display font-bold text-bold mb-4 border-b border-gray-200 pb-2 flex items-center gap-2">
                <FaShoppingBasket className="text-primary" />
                <span>Ingredients</span>
                <span className="text-text-secondary text-sm font-normal ml-auto">
                  {recipe.extendedIngredients?.length || 0} items
                </span>
              </h2>
              <ul className="space-y-3">
                {recipe.extendedIngredients &&
                  recipe.extendedIngredients.map((ingredient, index) => (
                    <li
                      key={index}
                      className="flex gap-3 pb-2 border-b border-gray-100 last:border-0"
                    >
                      <span className="w-2 h-2 mt-2 rounded-full bg-primary flex-shrink-0"></span>
                      <div>
                        <span className="capitalize font-medium">
                          {ingredient.amount} {ingredient.unit}
                        </span>
                        <span className="ml-1 capitalize">
                          {ingredient.name}
                        </span>
                        {ingredient.meta && ingredient.meta.length > 0 && (
                          <p className="text-text-secondary text-sm">
                            ({ingredient.meta.join(", ")})
                          </p>
                        )}
                      </div>
                    </li>
                  ))}
              </ul>
            </div>

            <div className="bg-background-card rounded-card shadow-card p-6 mb-6">
              <h2 className="text-xl font-display font-bold text-bold mb-4 border-b border-gray-200 pb-2 flex items-center gap-2">
                <FaClock className="text-primary" />
                <span>Time Breakdown</span>
              </h2>
              <div className="space-y-4">
                {recipe.preparationMinutes > 0 && (
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-text-secondary">Preparation</span>
                      <span className="text-bold font-medium">
                        {recipe.preparationMinutes} mins
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-primary-light h-2 rounded-full"
                        style={{
                          width: `${
                            (recipe.preparationMinutes /
                              recipe.readyInMinutes) *
                            100
                          }%`,
                        }}
                      ></div>
                    </div>
                  </div>
                )}

                {recipe.cookingMinutes > 0 && (
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-text-secondary">Cooking</span>
                      <span className="text-bold font-medium">
                        {recipe.cookingMinutes} mins
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-accent h-2 rounded-full"
                        style={{
                          width: `${
                            (recipe.cookingMinutes / recipe.readyInMinutes) *
                            100
                          }%`,
                        }}
                      ></div>
                    </div>
                  </div>
                )}

                <div className="pt-2 border-t border-gray-200">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">Total Time</span>
                    <span className="text-bold font-bold">
                      {recipe.readyInMinutes} mins
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-background-card rounded-card shadow-card p-6">
              <h2 className="text-xl font-display font-bold text-bold mb-4 border-b border-gray-200 pb-2 flex items-center gap-2">
                <FaInfoCircle className="text-primary" />
                <span>Additional Info</span>
              </h2>

              {recipe.weightWatcherSmartPoints > 0 && (
                <div className="mb-4">
                  <p className="text-text-secondary text-sm mb-1">
                    Weight Watchers Smart Points
                  </p>
                  <p className="text-text-primary font-medium">
                    {recipe.weightWatcherSmartPoints} points
                  </p>
                </div>
              )}

              {recipe.gaps && recipe.gaps !== "no" && (
                <div className="mb-4">
                  <p className="text-text-secondary text-sm mb-1">GAPS Diet</p>
                  <p className="text-text-primary font-medium capitalize">
                    {recipe.gaps}
                  </p>
                </div>
              )}

              {recipe.license && (
                <div className="mb-4">
                  <p className="text-text-secondary text-sm mb-1">License</p>
                  <p className="text-text-primary font-medium">
                    {recipe.license}
                  </p>
                </div>
              )}

              {recipe.sourceUrl && (
                <div>
                  <p className="text-text-secondary text-sm mb-1">
                    Original Source
                  </p>
                  <a
                    href={recipe.sourceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:text-primary-dark flex items-center gap-1"
                  >
                    <span>View Original Recipe</span>
                    <FaExternalLinkAlt size={12} />
                  </a>
                </div>
              )}

              <button
                onClick={handleSaveRecipe}
                className="w-full py-2 mt-5 bg-primary-light hover:bg-primary-dark text-white rounded-md transition-colors"
              >
                Save Recipe
              </button>
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
              <div className="bg-background-card rounded-card shadow-card p-6 mb-6">
                <h2 className="text-xl font-display font-bold text-bold mb-4 border-b border-gray-200 pb-2">
                  Instructions
                </h2>
                <div
                  className="prose max-w-none text-text-primary"
                  dangerouslySetInnerHTML={{ __html: recipe.instructions }}
                />
              </div>
            ) : recipe.analyzedInstructions &&
              recipe.analyzedInstructions.length > 0 ? (
              <div className="bg-background-card rounded-card shadow-card p-6 mb-6">
                <h2 className="text-xl font-display font-bold text-bold mb-4 border-b border-gray-200 pb-2">
                  Instructions
                </h2>
                {recipe.analyzedInstructions.map((section, sectionIndex) => (
                  <div key={sectionIndex} className="mb-6 last:mb-0">
                    {section.name && (
                      <h3 className="font-bold text-lg mb-3">{section.name}</h3>
                    )}
                    <ol className="space-y-4">
                      {section.steps.map((step, stepIndex) => (
                        <li key={stepIndex} className="flex gap-4">
                          <div className="flex-shrink-0 w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center font-bold">
                            {step.number}
                          </div>
                          <div className="flex-1">
                            <p className="mb-2">{step.step}</p>

                            {step.ingredients &&
                              step.ingredients.length > 0 && (
                                <div className="flex flex-wrap gap-2 mt-2">
                                  {step.ingredients.map((ingredient, i) => (
                                    <span
                                      key={i}
                                      className="bg-primary/10 text-primary-dark text-xs px-2 py-1 rounded-full"
                                    >
                                      {ingredient.localizedName}
                                    </span>
                                  ))}
                                </div>
                              )}

                            {step.equipment && step.equipment.length > 0 && (
                              <div className="flex flex-wrap gap-2 mt-2">
                                {step.equipment.map((item, i) => (
                                  <span
                                    key={i}
                                    className="bg-accent/10 text-accent-dark text-xs px-2 py-1 rounded-full flex items-center gap-1"
                                  >
                                    <FaUtensils size={10} />
                                    {item.localizedName}
                                    {item.temperature && (
                                      <span>
                                        ({item.temperature.number}{" "}
                                        {item.temperature.unit})
                                      </span>
                                    )}
                                  </span>
                                ))}
                              </div>
                            )}

                            {step.length && (
                              <div className="flex items-center gap-1 text-xs text-text-secondary mt-2">
                                <FaClock size={10} />
                                <span>
                                  {step.length.number} {step.length.unit}
                                </span>
                              </div>
                            )}
                          </div>
                        </li>
                      ))}
                    </ol>
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-background-card rounded-card shadow-card p-6 mb-6">
                <h2 className="text-xl font-display font-bold text-bold mb-4 border-b border-gray-200 pb-2">
                  Instructions
                </h2>
                <div className="flex flex-col items-center justify-center py-8 text-center">
                  <p className="text-text-secondary mb-2">
                    Instructions are not available for this recipe.
                  </p>
                  <p className="text-text-primary">
                    Try following a standard preparation method with the listed
                    ingredients.
                  </p>
                </div>
              </div>
            )}

            <div className="bg-background-card rounded-card shadow-card p-6">
              <h2 className="text-xl font-display font-bold text-bold mb-4 border-b border-gray-200 pb-2">
                Step-by-Step Instructions
              </h2>

              <div className="space-y-6">
                {recipe.analyzedInstructions &&
                recipe.analyzedInstructions.length > 0 ? (
                  recipe.analyzedInstructions.map(
                    (instruction, instructionIndex) => (
                      <div key={instructionIndex}>
                        {instruction.name && (
                          <h3 className="font-semibold text-lg mb-3">
                            {instruction.name}
                          </h3>
                        )}
                        <ol className="space-y-6">
                          {instruction.steps.map((step, stepIndex) => (
                            <li key={stepIndex} className="flex">
                              <div className="flex-shrink-0 mr-4">
                                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-white font-bold">
                                  {step.number}
                                </div>
                              </div>
                              <div className="flex-1">
                                <p className="mb-3">{step.step}</p>

                                <div className="flex flex-wrap gap-4 mt-3">
                                  {step.ingredients &&
                                    step.ingredients.length > 0 && (
                                      <div className="w-full sm:w-auto">
                                        <p className="text-sm text-text-secondary mb-1">
                                          Ingredients:
                                        </p>
                                        <div className="flex flex-wrap gap-2">
                                          {step.ingredients.map(
                                            (ingredient, i) => (
                                              <span
                                                key={i}
                                                className="bg-primary/10 text-primary-dark text-xs px-2 py-1 rounded-full"
                                              >
                                                {ingredient.localizedName}
                                              </span>
                                            )
                                          )}
                                        </div>
                                      </div>
                                    )}

                                  {step.equipment &&
                                    step.equipment.length > 0 && (
                                      <div className="w-full sm:w-auto">
                                        <p className="text-sm text-text-secondary mb-1">
                                          Equipment:
                                        </p>
                                        <div className="flex flex-wrap gap-2">
                                          {step.equipment.map((item, i) => (
                                            <span
                                              key={i}
                                              className="bg-accent/10 text-accent-dark text-xs px-2 py-1 rounded-full flex items-center gap-1"
                                            >
                                              <FaUtensils size={10} />
                                              {item.localizedName}
                                            </span>
                                          ))}
                                        </div>
                                      </div>
                                    )}
                                </div>

                                {step.length && (
                                  <div className="mt-3 flex items-center gap-1 text-sm text-text-secondary">
                                    <FaClock size={12} />
                                    <span>
                                      {step.length.number} {step.length.unit}
                                    </span>
                                  </div>
                                )}
                              </div>
                            </li>
                          ))}
                        </ol>
                      </div>
                    )
                  )
                ) : (
                  <div className="text-center py-8">
                    <p className="text-text-secondary">
                      No step-by-step instructions available for this recipe.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipeFullDetail;
