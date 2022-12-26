import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../axios.js";

const initialState = {
  comments: [],
  loading: false,
};

export const createComment = createAsyncThunk(
  "comment/createComment",
  async ({ postId, comment }) => {
    try {
      const { data } = await axios.post(`/comments/${postId}`, {
        postId,
        comment,
      });

      return data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const getPostComments = createAsyncThunk(
  "comment/getPostComments",
  async (postId) => {
    try {
      const { data } = await axios.get(`/posts/comments/${postId}`);
      return data;
    } catch (error) {
      console.log(error);
    }
  }
);

const commentSlice = createSlice({
  name: "comment",
  initialState,
  reducers: {},
  extraReducers: {
    //CREATE COMMENT
    [createComment.pending]: (state) => {
      state.loading = true;
    },
    [createComment.fulfilled]: (state, action) => {
      state.loading = false;
      state.comments.push(action.payload);
    },
    [createComment.rejected]: (state) => {
      state.loading = false;
    },

    //GET COMMENTS for post
    [getPostComments.pending]: (state) => {
      state.comments = [];
      state.loading = true;
    },
    [getPostComments.fulfilled]: (state, action) => {
      state.loading = false;
      state.comments = action.payload.comments;
    },
    [getPostComments.rejected]: (state) => {
      state.comments = [];
      state.loading = false;
    },
  },
});

export const commentReducer = commentSlice.reducer;
