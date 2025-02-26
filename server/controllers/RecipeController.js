const axios = require("axios");
const {
  SPOONACULAR_API_KEY,
  SPOONACULAR_BASE_URL,
} = require("../helpers/spoonacular");
const { generateContext } = require("../helpers/geminiAI");
const { User } = require("../models");
class RecipeController {
  static async getRandomRecipe(req, res) {
    try {
      const response = await axios.get(
        `${SPOONACULAR_BASE_URL}/recipes/random?number=9&apiKey=${SPOONACULAR_API_KEY}`
      );

      res.status(200).json(response.data);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Internal server error" });
    }
  }

  static async getRecipeByIngredients(req, res) {
    try {
      const { ingredients, number } = req.query;

      const response = await axios.get(
        `${SPOONACULAR_BASE_URL}/recipes/findByIngredients?ingredients=${ingredients}&number=${number}&apiKey=${SPOONACULAR_API_KEY}`
      );

      res.status(200).json(response.data);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Internal server error" });
    }
  }

  static async generateByNutrients(req, res) {
    const { id } = req.user;

    try {
      const user = await User.findByPk(id);

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      let { height, gender, weight, age, activity_level, diet, allergies } =
        user;

      if (!height || !gender || !weight || !age || !activity_level) {
        return res.status(400).json({
          message: "Please provide all required user information",
        });
      }

      if (allergies !== null) {
        allergies = allergies.join(",");
      }

      const prompt = `
      Calculate nutrition values for a ${gender}, ${age} years old, ${weight} kg, ${height} cm tall, with activity level: ${activity_level}.
      Please provide the following values:
      1. Daily calories
      2. BMI value and category (Underweight, Normal, Overweight, or Obese)
      3. Daily carbohydrate grams (50% of calories)
      4. Daily protein grams (20% of calories)
      5. Daily fat grams (30% of calories)
      
      Format the response as a valid JSON object with these exact keys: 
      dailyCalories, bmi, bmiCategory, carbsGrams, proteinGrams, fatGrams.
      Return ONLY the JSON object with no other text.
      `;

      const response = await generateContext(prompt);

      console.log("Gemini AI response:", response);

      const nutritionData = JSON.parse(
        response.trim().replace("```json", "").replace("```", "")
      );

      const dailyCalories = nutritionData.dailyCalories;
      const carbsGrams = nutritionData.carbsGrams;
      const proteinGrams = nutritionData.proteinGrams;
      const fatGrams = nutritionData.fatGrams;

      // Calculate per-meal values (assuming 3 meals per day)
      const minCalories = Math.round((dailyCalories * 0.9) / 3); // 10% lower
      const maxCalories = Math.round((dailyCalories * 1.1) / 3); // 10% higher

      const minCarbs = Math.round((carbsGrams * 0.8) / 3);
      const maxCarbs = Math.round((carbsGrams * 1.2) / 3);

      const minProtein = Math.round((proteinGrams * 0.8) / 3);
      const maxProtein = Math.round((proteinGrams * 1.2) / 3);

      const minFat = Math.round((fatGrams * 0.8) / 3);
      const maxFat = Math.round((fatGrams * 1.2) / 3);

      const queryParams = new URLSearchParams({
        minCalories: minCalories,
        maxCalories: maxCalories,
        minCarbs: minCarbs,
        maxCarbs: maxCarbs,
        minProtein: minProtein,
        maxProtein: maxProtein,
        minFat: minFat,
        maxFat: maxFat,
        number: 5,
        diet: diet,
        intolerances: allergies,
        apiKey: SPOONACULAR_API_KEY,
      });

      const url = `${SPOONACULAR_BASE_URL}/recipes/complexSearch?${queryParams.toString()}`;
      console.log("Spoonacular API URL:", url);

      const spoonacularResponse = await fetch(url);
      const recipes = await spoonacularResponse.json();

      res.json({
        nutritionInfo: {
          bmi: parseFloat(nutritionData.bmi || 0),
          bmiCategory: nutritionData.bmiCategory || "Unknown",
          dailyCalories,
          macronutrients: {
            carbs: {
              percentage: 50,
              grams: carbsGrams,
              perMeal: {
                min: minCarbs,
                max: maxCarbs,
              },
            },
            protein: {
              percentage: 20,
              grams: proteinGrams,
              perMeal: {
                min: minProtein,
                max: maxProtein,
              },
            },
            fat: {
              percentage: 30,
              grams: fatGrams,
              perMeal: {
                min: minFat,
                max: maxFat,
              },
            },
          },
          caloriesPerMeal: {
            min: minCalories,
            max: maxCalories,
          },
        },
        recipes,
      });
    } catch (error) {
      console.error("Error:", error);
      res.status(500).json({
        message: "Error calculating nutrition information or fetching recipes",
        error: error.message,
      });
    }
  }

  static async getRecipeDetail(req, res) {
    try {
      const { id } = req.params;

      const response = await axios.get(
        `${SPOONACULAR_BASE_URL}/recipes/${id}/information?apiKey=${SPOONACULAR_API_KEY}&includeNutrition=false`
      );

      res.status(200).json(response.data);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Internal server error" });
    }
  }
}

module.exports = RecipeController;
