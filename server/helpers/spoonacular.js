const dotenv = require("dotenv");
dotenv.config();

const SPOONACULAR_API_KEY = process.env.SPOONACULAR_API_KEY;
const SPOONACULAR_BASE_URL = "https://api.spoonacular.com";
module.exports = { SPOONACULAR_API_KEY, SPOONACULAR_BASE_URL };
