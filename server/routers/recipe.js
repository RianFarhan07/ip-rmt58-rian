const express = require("express");
const router = express.Router();
const authentication = require("../middlewares/authentication");
const RecipeController = require("../controllers/RecipeController");

router.get("/random", authentication, RecipeController.getRandomRecipe);
router.get(
  "/findByIngredients",
  authentication,
  RecipeController.getRecipeByIngredients
);

module.exports = router;
