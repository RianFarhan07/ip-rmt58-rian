const express = require("express");
const router = express.Router();
const authentication = require("../middlewares/authentication");
const UserSavedRecipeController = require("../controllers/UserSavedRecipe");

router.get("/", authentication, UserSavedRecipeController.getUserSavedRecipes);
router.get("/:id", authentication, UserSavedRecipeController.getMyRecipeDetail);
router.get(
  "/full-detail/:id",
  authentication,
  UserSavedRecipeController.getMyRecipeFullDetail
);
router.post(
  "/add/:spoonacularId",
  authentication,
  UserSavedRecipeController.addToMyRecipe
);

module.exports = router;
