import React, { useEffect, useState } from "react";
import { FiTrash2, FiEye } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteMyRecipe,
  fetchMyRecipe,
  updateMyRecipeNotes,
} from "../features/myRecipe/myRecipe";

const MyRecipesPage = () => {
  const myRecipe = useSelector((state) => state.myRecipe.list);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentRecipe, setCurrentRecipe] = useState(null);
  const [noteText, setNoteText] = useState("");

  const fetchMyRecipes = async () => {
    setIsLoading(true);
    try {
      dispatch(fetchMyRecipe());
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setError(error.response?.data.message || error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchMyRecipes();
  }, []);

  const handleDelete = async (recipeId) => {
    try {
      await dispatch(deleteMyRecipe(recipeId));
      fetchMyRecipes();
    } catch (error) {
      console.log(error);
      setError(error);
    }
  };

  const openNotesModal = (recipe) => {
    setCurrentRecipe(recipe);
    setNoteText(recipe.notes || "");
    setIsModalOpen(true);
  };

  const saveNotes = async () => {
    try {
      await dispatch(updateMyRecipeNotes(currentRecipe.id, noteText));
      setIsModalOpen(false);
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

  if (error) {
    return (
      <div className="p-6 max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">My Recipes</h1>
        <div className="text-center p-10 bg-red-100 rounded-lg">
          <p className="text-lg text-red-600">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">My Recipes</h1>

      {isLoading ? (
        <div className="text-center p-10">
          <p className="text-lg">Loading your recipes...</p>
        </div>
      ) : myRecipe.length === 0 ? (
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
              {myRecipe.map((recipe) => (
                <tr key={recipe.id} className="border-t border-gray-200">
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
                  <td
                    className="p-4 text-sm hover:bg-gray-100 cursor-pointer"
                    onClick={() => openNotesModal(recipe)}
                  >
                    {recipe.notes || (
                      <span className="text-gray-400 italic">
                        No notes (click to add)
                      </span>
                    )}
                  </td>
                  <td className="p-4">
                    <div className="flex justify-center space-x-2">
                      <button
                        onClick={() =>
                          navigate(`/recipeDetail/${recipe.RecipeId}`)
                        }
                        className="p-2 text-blue-600 hover:text-blue-800 hover:bg-blue-100 rounded-full"
                        aria-label="View recipe details"
                      >
                        <FiEye size={20} />
                      </button>
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

      {isModalOpen && currentRecipe && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">
              Add Notes for {currentRecipe.Recipe.title}
            </h2>
            <textarea
              className="w-full p-3 border border-gray-300 rounded-lg mb-4 h-32"
              placeholder="Add your notes about this recipe..."
              value={noteText}
              onChange={(e) => setNoteText(e.target.value)}
            ></textarea>
            <div className="flex justify-end space-x-2">
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 text-gray-600 hover:text-gray-800"
              >
                Cancel
              </button>
              <button
                onClick={saveNotes}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Save Notes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyRecipesPage;
