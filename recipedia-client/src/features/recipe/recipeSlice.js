import { createSlice } from "@reduxjs/toolkit";
import { BASE_URL } from "../../helpers/url";
import axios from "axios";

export const RecipeSlice = createSlice({
  name: "recipe",
  initialState: {
    list: [],
    isLoading: false,
    error: null,
  },
  reducers: {
    setRecipe: (state, action) => {
      state.list = action.payload;
    },
  },
});

export const fetchRecipes = () => async (dispatch) => {
  try {
    const response = await axios.get(`${BASE_URL}/recipes`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      },
    });
    dispatch(setRecipe(response.data));
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const { setRecipe } = RecipeSlice.actions;

export default RecipeSlice.reducer;
