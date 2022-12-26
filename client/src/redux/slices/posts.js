import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../axios.js";

const initialState = {
  posts: {
    items: [],
    loading: false,
    status: "loading",
  },
  popularPosts: { items: [], loading: false, status: "loading" },
  tags: {
    items: [],
    status: "loading",
  },
};

export const fetchPosts = createAsyncThunk("posts/fetchPosts", async () => {
  try {
    const { data } = await axios.get("/posts");
    return data;
  } catch (error) {
    console.log(error);
  }
});

export const fetchTags = createAsyncThunk("posts/fetchTags", async () => {
  const { data } = await axios.get("/tags");
  return data;
});

export const fetchRemovePost = createAsyncThunk(
  "posts/fetchRemovePost",
  async (id) => {
    axios.delete(`/posts/${id}`);
  }
);

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {},
  extraReducers: {
    //Get all Articles
    [fetchPosts.pending]: (state) => {
      state.loading = true;
      state.posts.items = [];
      state.posts.status = "loading";
    },
    [fetchPosts.fulfilled]: (state, action) => {
      state.loading = false;
      state.posts.items = action.payload.posts;
      state.popularPosts.items = action.payload.popularPosts;
      state.posts.status = "loaded";
    },
    [fetchPosts.rejected]: (state) => {
      state.loading = false;
      state.posts.items = [];
      state.posts.status = "error";
    },

    //Get Tags
    [fetchTags.pending]: (state) => {
      state.tags.items = [];
      state.tags.status = "loading";
    },
    [fetchTags.fulfilled]: (state, action) => {
      state.tags.items = action.payload;
      state.tags.status = "loaded";
    },
    [fetchTags.rejected]: (state) => {
      state.tags.items = [];
      state.tags.status = "error";
    },

    //Delete Articles
    [fetchRemovePost.pending]: (state, action) => {
      state.loading = false;
      state.posts.items = state.posts.items.filter(
        (obj) => obj._id !== action.meta.arg
      );
    },
  },
});

export const postsReducer = postsSlice.reducer;
