// seeders/YYYYMMDDHHMMSS-seed-recipes.js
"use strict";
const dotenv = require("dotenv");
dotenv.config();

const axios = require("axios");
const { hashPassword } = require("../helpers/bcrypt");

const BASE_URL = "https://api.spoonacular.com";

// ID-ID resep populer dari Spoonacular untuk seeding
const POPULAR_RECIPE_IDS = [
  716429, 715538, 715573, 632269, 632252, 632274, 631870, 632282, 715435,
  715446, 715497, 715769, 716195, 716217, 716429, 716432, 716627, 716652,
  717109, 717338, 717614, 717875, 718455, 718515, 718568, 718813, 719001,
  719126, 719202, 719312,
];

const USER_SEEDS = [
  {
    username: "rian",
    email: "rian@gmail.com",
    password: hashPassword("123123"),
    height: 170.5,
    weight: 65.2,
    age: 25,
    gender: "male",
    activity_level: "moderate",
    diet: "vegetarian",
    allergies: ["dairy", "seafood"],
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    username: "reni",
    email: "reni@gmail.com",
    password: hashPassword("123123"),
    height: 160.3,
    weight: 55.4,
    age: 28,
    gender: "female",
    activity_level: "high",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    username: "farhan",
    email: "farhan@gmail.com",
    password: hashPassword("123123"),
    height: 180.0,
    weight: 75.0,
    age: 30,
    gender: "male",
    activity_level: "low",
    diet: "ketogenic",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

module.exports = {
  up: async (queryInterface, Sequelize) => {
    try {
      // Menggunakan bulk information request dengan endpoint recipes/informationBulk
      console.log(
        `Fetching information for ${POPULAR_RECIPE_IDS.length} recipes in one request...`
      );

      const response = await axios.get(`${BASE_URL}/recipes/informationBulk`, {
        params: {
          apiKey: "2faf1b5ce2f04b47a98ed02b2da9b5c8",
          ids: POPULAR_RECIPE_IDS.join(","),
          includeNutrition: false,
        },
      });

      const recipesData = response.data;
      const recipeRows = [];

      for (const recipeData of recipesData) {
        const ingredientNames = recipeData.extendedIngredients
          ? recipeData.extendedIngredients.map((ingredient) => ingredient.name)
          : [];

        const recipeRow = {
          spoonacular_id: recipeData.id,
          title: recipeData.title,
          image_url: recipeData.image,
          servings: recipeData.servings,
          ready_in_minutes: recipeData.readyInMinutes,
          health_score: recipeData.healthScore,
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
          dish_types: JSON.stringify(recipeData.dishTypes || []),
          ingredients: JSON.stringify(ingredientNames),
          createdAt: new Date(),
          updatedAt: new Date(),
        };

        recipeRows.push(recipeRow);
        console.log(`Recipe ${recipeData.id} successfully processed.`);
      }

      if (recipeRows.length > 0) {
        await queryInterface.bulkInsert("Recipes", recipeRows);
      }

      await queryInterface.bulkInsert("Users", USER_SEEDS);

      console.log(
        `Seeding completed: ${recipeRows.length} recipes and 3 users inserted.`
      );
    } catch (error) {
      console.error("Error during recipe seeding:", error);
    }
  },

  down: async (queryInterface, Sequelize) => {
    try {
      await queryInterface.bulkDelete(
        "Recipes",
        {
          spoonacular_id: {
            [Sequelize.Op.in]: POPULAR_RECIPE_IDS,
          },
        },
        {}
      );

      await queryInterface.bulkDelete("Users", null, {});
    } catch (error) {
      console.error("Error during recipe unseeding:", error);
    }
  },
};
