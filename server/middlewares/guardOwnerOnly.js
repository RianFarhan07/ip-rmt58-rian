const { myRecipe } = require("../models");
const { UserSavedRecipe, Recipe } = require("../models");

async function guardOwnerOnly(req, res, next) {
  try {
    const userId = req.user.id;
    const myRecipeId = req.params.id;

    const myRecipe = await UserSavedRecipe.findByPk(myRecipeId);
    if (!myRecipe) {
      res.status(404).send({ message: "Your recipe not found" });
      return;
    }

    if (myRecipe.UserId !== userId) {
      res.status(403).send({ message: "You're not authorized" });
      return;
    }

    req.myRecipe = myRecipe;
    next();
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Internal server error" });
  }
}

module.exports = guardOwnerOnly;
