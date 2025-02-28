import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL } from "../../helpers/url";

const initialState = {
  error: null,
  loading: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    registerUserStart: (state) => {
      state.loading = true;
    },
    registerUserSuccess: (state) => {
      state.loading = false;
      state.error = null;
    },
    registerUserFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    signInStart: (state) => {
      state.loading = true;
    },
    signInSuccess: (state) => {
      state.loading = false;
      state.error = null;
    },
    signInFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    fetchProfileStart: (state) => {
      state.loading = true;
    },
    fetchProfileSuccess: (state) => {
      state.loading = false;
      state.error = null;
    },
    fetchProfileFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    updateUserStart: (state) => {
      state.loading = true;
    },
    updateUserSuccess: (state) => {
      state.loading = false;
      state.error = null;
    },
    updateUserFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    signOutUserStart: (state) => {
      state.loading = true;
    },
    signOutUserSuccess: (state) => {
      state.loading = false;
      state.error = null;
    },
    signOutUserFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export const registerUser = (data) => async (dispatch) => {
  dispatch(registerUserStart());
  try {
    await axios.post(`${BASE_URL}/register`, data);

    const response = await axios.post(`${BASE_URL}/login`, {
      email: data.email,
      password: data.password,
    });

    const token = response.data.access_token;
    localStorage.setItem("access_token", token);
    dispatch(registerUserSuccess(token));
  } catch (error) {
    dispatch(
      registerUserFailure(error.response?.data?.message || error.message)
    );
    throw error;
  }
};

export const loginUser = (data) => async (dispatch) => {
  dispatch(signInStart());
  try {
    const response = await axios.post(`${BASE_URL}/login`, data);
    const token = response.data.access_token;
    localStorage.setItem("access_token", token);
    dispatch(signInSuccess(token));
    return token;
  } catch (error) {
    dispatch(signInFailure(error.response?.data?.message || error.message));
    throw error;
  }
};

export const fetchProfile = () => async (dispatch) => {
  dispatch(fetchProfileStart());
  try {
    const access_token = localStorage.getItem("access_token");
    const response = await axios.get(`${BASE_URL}/profile`, {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });
    dispatch(fetchProfileSuccess(response.data));
    return response.data;
  } catch (error) {
    dispatch(
      fetchProfileFailure(error.response?.data?.message || error.message)
    );
    throw error;
  }
};

export const updateProfile = (data) => async (dispatch) => {
  dispatch(updateUserStart());
  try {
    const access_token = localStorage.getItem("access_token");
    const response = await axios.put(`${BASE_URL}/profile`, data, {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });
    dispatch(updateUserSuccess(response.data));
    return response.data;
  } catch (error) {
    dispatch(updateUserFailure(error.response?.data?.message || error.message));
    throw error;
  }
};

export const signOut = () => async (dispatch) => {
  dispatch(signOutUserStart());
  try {
    localStorage.removeItem("access_token");
    dispatch(signOutUserSuccess());
  } catch (error) {
    dispatch(signOutUserFailure(error.message));
    throw error;
  }
};

export const {
  registerUserStart,
  registerUserSuccess,
  registerUserFailure,
  signInStart,
  signInSuccess,
  signInFailure,
  fetchProfileStart,
  fetchProfileSuccess,
  fetchProfileFailure,
  updateUserStart,
  updateUserSuccess,
  updateUserFailure,
  signOutUserStart,
  signOutUserSuccess,
  signOutUserFailure,
} = userSlice.actions;

export default userSlice.reducer;
