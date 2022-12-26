import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../axios.js";

export const fetchRegister = createAsyncThunk(
  "/auth/fetchRegister",
  async (params) => {
    try {
      const { data } = await axios.post("/auth/register", params);
      if (data.token) {
        window.localStorage.setItem("token", data.token);
      }
      return data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const fetchAuth = createAsyncThunk("/auth/fetchAuth", async (params) => {
  try {
    const { data } = await axios.post("/auth/login", params);
    if (data.token) {
      window.localStorage.setItem("token", data.token);
    }
    return data;
  } catch (error) {
    console.log(error);
  }
});

export const fetchAuthMe = createAsyncThunk("/auth/fetchAuthMe", async () => {
  try {
    const { data } = await axios.get("/auth/me");
    return data;
  } catch (error) {
    console.log(error);
  }
});

const initialState = {
  data: null,
  status: null,
  isLoading: false,
  user: null,
  token: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.data = null;
      state.status = null;
      state.user = null;
      state.token = null;
      state.isLoading = false;
    },
  },
  extraReducers: {
    // Register user
    [fetchRegister.pending]: (state) => {
      state.isLoading = true;
      state.status = null;
      state.data = null;
    },
    [fetchRegister.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.status = action.payload.message;
      state.data = action.payload;
    },
    [fetchRegister.rejected]: (state, action) => {
      state.isLoading = false;
      state.status = action.payload.message;
      state.data = null;
    },
    // Login user
    [fetchAuth.pending]: (state) => {
      state.status = null;
      state.data = null;
    },
    [fetchAuth.fulfilled]: (state, action) => {
      state.status = action.payload.message;
      state.data = action.payload;
    },
    [fetchAuth.rejected]: (state, action) => {
      state.status = action.payload.message;
      state.data = null;
    },

    //Check autorization
    [fetchAuthMe.pending]: (state) => {
      state.status = null;
      state.data = null;
    },
    [fetchAuthMe.fulfilled]: (state, action) => {
      state.status = action.payload.message;
      state.data = action.payload;
    },
    [fetchAuthMe.rejected]: (state, action) => {
      state.status = action.payload.message;
      state.data = null;
    },
  },
});

export const selectIsAuth = (state) => Boolean(state.auth.data);

export const authReducer = authSlice.reducer;

export const { logout } = authSlice.actions;
