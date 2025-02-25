const { default: axios } = require("axios");

const SPOONACULAR_API_KEY = process.env.SPOONACULAR_API_KEY;
const BASE_URL = "https://api.spoonacular.com";

class RecipeController {
  static async getRandomRecipe(req, res) {
    try {
      const response = await axios.get(
        `${BASE_URL}/recipes/random?number=9&apiKey=${SPOONACULAR_API_KEY}`
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
        `${BASE_URL}/recipes/findByIngredients?ingredients=${ingredients}&number=${number}&apiKey=${SPOONACULAR_API_KEY}`
      );

      res.status(200).json(response.data);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Internal server error" });
    }
  }
}

module.exports = RecipeController;
