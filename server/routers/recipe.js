const express = require("express");
const router = express.Router();
const authentication = require("../middlewares/authentication");
const RecipeController = require("../controllers/RecipeController");
const { route } = require("./user");

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
  "/mostRecent",
  authentication,
  RecipeController.getMostRecentRecipes
);

module.exports = router;
