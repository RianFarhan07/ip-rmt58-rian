const BASE_URL = "https://api.spoonacular.com";
const axios = require("axios");
const { UserSavedRecipe, Recipe } = require("../models");
const {
  SPOONACULAR_BASE_URL,
  SPOONACULAR_API_KEY,
} = require("../helpers/spoonacular");

class UserSavedRecipeController {
  static async addToMyRecipe(req, res) {
    try {
      const { spoonacularId } = req.params;

      const existingRecipe = await Recipe.findOne({
        where: { spoonacular_id: spoonacularId },
      });

      if (existingRecipe !== null) {
        const newMyRecipe = await UserSavedRecipe.create({
          UserId: req.user.id,
          RecipeId: existingRecipe.id,
        });

        return res.status(201).json(newMyRecipe);
      }

      const response = await axios.get(
        `${SPOONACULAR_BASE_URL}/recipes/${spoonacularId}/information`,
        {
          params: {
            apiKey: SPOONACULAR_API_KEY,
            includeNutrition: false,
          },
        }
      );

      const recipeData = response.data;

      // Extract ingredient names into an array
      const ingredientNames = recipeData.extendedIngredients
        ? recipeData.extendedIngredients.map((ingredient) => ingredient.name)
        : [];

      const recipe = await Recipe.create({
        spoonacular_id: recipeData.id,
        title: recipeData.title,
        image_url: recipeData.image,
        servings: recipeData.servings,
        ready_in_minutes: recipeData.readyInMinutes,
        health_score: recipeData.healthScore,
        price_per_serving: recipeData.pricePerServing,
        source_name: recipeData.sourceName,
        source_url: recipeData.sourceUrl,
        summary: recipeData.summary,
        instructions: recipeData.instructions,
        vegetarian: recipeData.vegetarian,
        vegan: recipeData.vegan,
        gluten_free: recipeData.glutenFree,
        dairy_free: recipeData.dairyFree,
        very_healthy: recipeData.veryHealthy,
        cheap: recipeData.cheap,
        cooking_minutes: recipeData.cookingMinutes,
        preparation_minutes: recipeData.preparationMinutes,
        dish_types: JSON.stringify(recipeData.dishTypes),
        ingredients: JSON.stringify(ingredientNames), // Store ingredients as stringified JSON array
      });

      const newMyRecipe = await UserSavedRecipe.create({
        UserId: req.user.id,
        RecipeId: recipe.id,
      });

      return res.status(201).json(newMyRecipe);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Internal server error" });
    }
  }

  static async getUserSavedRecipes(req, res) {
    try {
      const userSavedRecipes = await UserSavedRecipe.findAll({
        where: { UserId: req.user.id },
        include: Recipe,
      });

      res.status(200).json(userSavedRecipes);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Internal server error" });
    }
  }

  static async getMyRecipeDetail(req, res) {
    try {
      const { id } = req.params;

      const myRecipe = await UserSavedRecipe.findOne({
        where: { id },
        include: Recipe,
      });

      if (!myRecipe) {
        return res.status(404).json({ message: "Recipe not found" });
      }

      // console.log(myRecipe);

      // const { spoonacular_id } = myRecipe.Recipe;

      res.status(200).json(myRecipe.Recipe);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Internal server error" });
    }
  }

  static async getMyRecipeFullDetail(req, res) {
    try {
      const { id } = req.params;

      const myRecipe = await UserSavedRecipe.findOne({
        where: { id },
        include: Recipe,
      });

      if (!myRecipe) {
        return res.status(404).json({ message: "Recipe not found" });
      }

      // console.log(myRecipe);

      const { spoonacular_id } = myRecipe.Recipe;

      const response = await axios.get(
        `${SPOONACULAR_BASE_URL}/recipes/${spoonacular_id}/information`,
        {
          params: {
            apiKey: SPOONACULAR_API_KEY,
            includeNutrition: false,
          },
        }
      );

      const recipeData = response.data;

      res.status(200).json(recipeData);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Internal server error" });
    }
  }
}

module.exports = UserSavedRecipeController;
