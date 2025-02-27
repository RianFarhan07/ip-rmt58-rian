import axios from "axios";
import React, { useEffect, useState } from "react";
import { FiTrash2 } from "react-icons/fi";
import { BASE_URL } from "../helpers/url";
import { useNavigate } from "react-router-dom";

const MyRecipesPage = () => {
  // Sample data from your API response
  const [recipes, setRecipes] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const fetchMyRecipes = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(`${BASE_URL}/my-recipes`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      });
      setRecipes(response.data);
    } catch (error) {
      console.log(error);
      setError(error);
    }
  };

  useEffect(() => {
    fetchMyRecipes();
  }, []);

  const handleDelete = async (recipeId) => {
    try {
      await axios.delete(`${BASE_URL}/my-recipes/delete/${recipeId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      });
      fetchMyRecipes();
    } catch (error) {
      console.log(error);
      setError(error);
    }
  };

  // Function to get diet badges
  const getDietBadges = (recipe) => {
    const badges = [];
    if (recipe.vegetarian) badges.push("Vegetarian");
    if (recipe.vegan) badges.push("Vegan");
    if (recipe.gluten_free) badges.push("Gluten Free");
    if (recipe.dairy_free) badges.push("Dairy Free");
    return badges;
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">My Recipes</h1>

      {recipes.length === 0 ? (
        <div className="text-center p-10 bg-gray-50 rounded-lg">
          <p className="text-lg text-gray-500">
            You haven't saved any recipes yet.
          </p>
        </div>
      ) : (
        <div className="overflow-x-auto bg-white rounded-lg shadow">
          <table className="w-full">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-4 text-left">Image</th>
                <th className="p-4 text-left">Recipe Name</th>
                <th className="p-4 text-left">Preparation Time</th>
                <th className="p-4 text-left">Health Score</th>
                <th className="p-4 text-left">Diet</th>
                <th className="p-4 text-left">Notes</th>
                <th className="p-4 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {recipes.map((recipe) => (
                <tr
                  key={recipe.id}
                  onClick={() => navigate(`/recipeDetail/${recipe.id}`)}
                  className="border-t border-gray-200 hover:bg-gray-50"
                >
                  <td className="p-4">
                    <img
                      src={recipe.Recipe.image_url || "/api/placeholder/80/60"}
                      alt={recipe.Recipe.title}
                      className="w-20 h-16 object-cover rounded"
                    />
                  </td>
                  <td className="p-4 font-medium">{recipe.Recipe.title}</td>
                  <td className="p-4">
                    {recipe.Recipe.ready_in_minutes} minutes
                  </td>
                  <td className="p-4">
                    <div className="flex items-center">
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-bold
                          ${
                            recipe.Recipe.health_score > 70
                              ? "bg-green-500"
                              : recipe.Recipe.health_score > 40
                              ? "bg-yellow-500"
                              : "bg-red-500"
                          }`}
                      >
                        {recipe.Recipe.health_score}
                      </div>
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="flex flex-wrap gap-1">
                      {getDietBadges(recipe.Recipe).map((badge, index) => (
                        <span
                          key={index}
                          className="px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-800"
                        >
                          {badge}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="p-4 text-sm">
                    {recipe.notes || (
                      <span className="text-gray-400 italic">No notes</span>
                    )}
                  </td>
                  <td className="p-4">
                    <div className="flex justify-center">
                      <button
                        onClick={() => handleDelete(recipe.id)}
                        className="p-2 text-red-600 hover:text-red-800 hover:bg-red-100 rounded-full"
                        aria-label="Delete recipe"
                      >
                        <FiTrash2 size={20} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default MyRecipesPage;
