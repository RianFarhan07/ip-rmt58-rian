const express = require("express");
const router = express.Router();
const authentication = require("../middlewares/authentication");
const RecipeController = require("../controllers/RecipeController");
const { route } = require("./user");

router.get("/", authentication, RecipeController.getAllRecipesFromServer);
router.get("/random", authentication, RecipeController.getRandomRecipe);
router.get(
  "/findByIngredients",
  authentication,
  RecipeController.getRecipeByIngredients
);
router.get(
  "/generateByNutrients",
  authentication,
  RecipeController.generateByNutrients
);
router.get(
  "/generateIngredientRecommendations",
  authentication,
  RecipeController.generateIngredientRecommendations
);
router.get(
  "/mostRecent",
  authentication,
  RecipeController.getMostRecentRecipes
);
router.get(
  "/categories/:category",
  authentication,
  RecipeController.getRecipesByCategory
);
router.get(
  "/server/:id",
  authentication,
  RecipeController.getRecipeByIdInServer
);
router.get(
  "/spoonacular/:id",
  authentication,
  RecipeController.getRecipeDetail
);

module.exports = router;
