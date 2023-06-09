import {createSlice} from '@reduxjs/toolkit';
import {addPost, getComment, getPost} from '../services/PostService';

const initialState: PostState = {
  loading: {
    post: false,
    comment: false,
    add: false,
  },
  error: {
    postErr: null,
    commentErr: null,
    addErr: null,
  },
  post: [],
  searchData: [],
  comment: [],
  add: null,
};

export const postSlice = createSlice({
  name: 'post',
  initialState,
  reducers: {
    addSearch: (state, action: any) => {
      state.searchData = action.payload;
    },
    resetAdd: state => {
      state.add = null;
      state.error.addErr = null;
      state.loading.add = false;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(getPost.pending, state => {
        state.loading.post = true;
      })
      .addCase(getPost.fulfilled, (state, action: any) => {
        state.loading.post = false;
        state.post = action.payload;
        state.searchData = action.payload;
        state.error.postErr = null;
      })
      .addCase(getPost.rejected, (state, action: any) => {
        state.loading.post = false;
        state.error.postErr = action.payload;
        state.post = [];
      })
      .addCase(addPost.pending, state => {
        state.loading.add = true;
      })
      .addCase(addPost.fulfilled, (state, action: any) => {
        state.loading.add = false;
        state.add = action.payload;
        state.error.addErr = null;
      })
      .addCase(addPost.rejected, (state, action: any) => {
        state.loading.post = false;
        state.error.addErr = action.payload;
        state.add = null;
      })
      .addCase(getComment.pending, state => {
        state.loading.comment = true;
      })
      .addCase(getComment.fulfilled, (state, action: any) => {
        state.loading.comment = false;
        state.comment = action.payload;
        state.error.commentErr = null;
      })
      .addCase(getComment.rejected, (state, action: any) => {
        state.loading.comment = false;
        state.error.commentErr = action.payload;
        state.comment = [];
      });
  },
});

export const {resetAdd, addSearch} = postSlice.actions;
export const postReducer = postSlice.reducer;
export default postSlice.reducer;
