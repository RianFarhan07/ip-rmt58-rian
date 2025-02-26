import axios from "axios";
import NutritionInfoCard from "../components/NutritionInfoCard";
import RecipeNutricientCard from "../components/RecipeNutricientCard";
import UserProfileCard from "../components/UserProfileCard";
import { BASE_URL } from "../helpers/url";
import { useEffect, useState } from "react";

const Nutrition = () => {
  const [data, setData] = useState(null);
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchNutritionData = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(
        `${BASE_URL}/recipes/generateByNutrients`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        }
      );
      console.log(response.data);

      setData(response.data);
    } catch (error) {
      console.log(error);
      if (error.response?.data.message) {
        setError(error.response.data.message);
      } else {
        setError("An error occurred. Please try again later.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const fetchUserProfile = async () => {
    const token = localStorage.getItem("access_token");
    if (!token) {
      setError("Please log in to access your profile.");
      return;
    }

    try {
      const response = await axios.get(`${BASE_URL}/profile`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUser(response.data);
    } catch (error) {
      console.log(error);
      setError(
        error.response?.data?.message ||
          "An error occurred. Please try again later."
      );
    }
  };

  useEffect(() => {
    fetchUserProfile();
    fetchNutritionData();
  }, []);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500"></div>
        <p className="px-5 text-gray-500">Loading your nutrition plan...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-8">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-8">
        <header className="text-center">
          <h1 className="text-3xl font-bold text-gray-900">
            Your Personalized Nutrition Plan
          </h1>
          <p className="mt-2 text-lg text-gray-600">
            Based on your profile and goals
          </p>
        </header>

        {user && <UserProfileCard user={user} />}

        {data && (
          <>
            <NutritionInfoCard nutritionInfo={data.nutritionInfo} />

            <section>
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold text-gray-800">
                  Recommended Recipes
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {data.recipes.results.map((recipe) => (
                  <RecipeNutricientCard key={recipe.id} recipe={recipe} />
                ))}
              </div>

              {data.recipes.totalResults === 0 && (
                <div className="text-center py-8">
                  <p className="text-gray-500">
                    No recipes found matching your criteria.
                  </p>
                </div>
              )}
            </section>
          </>
        )}
      </div>
    </div>
  );
};

export default Nutrition;
