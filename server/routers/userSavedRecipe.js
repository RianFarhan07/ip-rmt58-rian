const express = require("express");
const router = express.Router();
const authentication = require("../middlewares/authentication");
const UserSavedRecipeController = require("../controllers/UserSavedRecipe");
const guardOwnerOnly = require("../middlewares/guardOwnerOnly");

router.use(authentication);

router.get("/", UserSavedRecipeController.getUserSavedRecipes);
router.get(
  "/full-detail/:id",

  UserSavedRecipeController.getMyRecipeFullDetail
);
router.post(
  "/add/:spoonacularId",

  UserSavedRecipeController.addToMyRecipe
);
router.delete(
  "/delete/:id",
  guardOwnerOnly,
  UserSavedRecipeController.deleteMyRecipe
);
router.put(
  "/note/:id",
  guardOwnerOnly,
  UserSavedRecipeController.updateNoteMyRecipe
);
router.get("/:id", UserSavedRecipeController.getMyRecipeDetail);

module.exports = router;
