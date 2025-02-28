import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./features/user/userSlice";
import myRecipeReducer from "./features/myRecipe/myRecipe";
import recipeReducer from "./features/recipe/recipeSlice";

const store = configureStore({
  reducer: {
    user: userReducer,
    myRecipe: myRecipeReducer,
    recipe: recipeReducer,
  },
});

export default store;
