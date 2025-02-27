import { createSlice } from "@reduxjs/toolkit";
import { BASE_URL } from "../../helpers/url";
import axios from "axios";
import Swal from "sweetalert2";

export const myRecipeSlice = createSlice({
  name: "myRecipe",
  initialState: {
    list: [],
    isLoading: false,
    error: null,
  },
  reducers: {
    setMyRecipe: (state, action) => {
      state.list = action.payload;
    },
    addMyRecipeSuccess: (state, action) => {
      state.list.push(action.payload);
    },
    removeMyRecipeSuccess: (state, action) => {
      state.list = state.list.filter((recipe) => recipe.id !== action.payload);
    },
    updateRecipeNotesSuccess: (state, action) => {
      const { id, notes } = action.payload;
      const recipe = state.list.find((r) => r.id === id);
      if (recipe) {
        recipe.notes = notes;
      }
    },
  },
});

export const fetchMyRecipe = () => async (dispatch) => {
  try {
    const response = await axios.get(`${BASE_URL}/my-recipes`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      },
    });
    // setRecipes(response.data);
    dispatch(setMyRecipe(response.data));
  } catch (error) {
    throw new Error("Failed to fetch recipes" + error);
  }
};

export const deleteMyRecipe = (recipeId) => async (dispatch) => {
  try {
    await axios.delete(`${BASE_URL}/my-recipes/delete/${recipeId}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      },
    });
    dispatch(removeMyRecipeSuccess(recipeId));
  } catch (error) {
    throw new Error("Failed to delete recipe" + error);
  }
};

export const updateMyRecipeNotes = (recipeId, noteText) => async (dispatch) => {
  try {
    await axios.put(
      `${BASE_URL}/my-recipes/note/${recipeId}`,
      { notes: noteText },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      }
    );
    dispatch(updateRecipeNotesSuccess({ id: recipeId, notes: noteText }));
  } catch (error) {
    throw new Error("Failed to update recipe notes" + error);
  }
};

export const addToMyRecipe = (recipeId) => async () => {
  try {
    await axios.post(
      `${BASE_URL}/my-recipes/add/${recipeId}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      }
    );

    Swal.fire({
      icon: "success",
      title: "Success!",
      text: "Recipe has been saved to your collection",
    });
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const {
  setMyRecipe,
  addMyRecipeSuccess,
  removeMyRecipeSuccess,
  updateRecipeNotesSuccess,
} = myRecipeSlice.actions;

export default myRecipeSlice.reducer;
