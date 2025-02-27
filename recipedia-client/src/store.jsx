import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./features/user/userSlice";
import myRecipeReducer from "./features/myRecipe/myRecipe";

const store = configureStore({
  reducer: {
    user: userReducer,
    myRecipe: myRecipeReducer,
  },
});

export default store;
