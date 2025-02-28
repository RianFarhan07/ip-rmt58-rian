const express = require("express");
const userRoute = require("./user");
const recipeRoute = require("./recipe");
const myRecipeRoute = require("./userSavedRecipe");

const router = express.Router();

router.get("/", (req, res) => {
  res.send(`
    “It always seems impossible, until its done” \n
                -Nelson Mandela 
    `);
});

router.use("/", userRoute);
router.use("/recipes", recipeRoute);
router.use("/my-recipes", myRecipeRoute);

module.exports = router;
