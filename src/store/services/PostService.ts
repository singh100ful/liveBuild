import {createAsyncThunk} from '@reduxjs/toolkit';
import {apiUrl} from '../../config/config';

export const getPost = createAsyncThunk('post/get', async () => {
  try {
    const res = await fetch(apiUrl + 'posts', {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });
    const data = await res.json();
    return data;
  } catch (err) {
    return err;
  }
});

export const addPost = createAsyncThunk(
  'post/add',
  async (params: PostParams) => {
    try {
      const res = await fetch(apiUrl + 'posts', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(params),
      });
      const data = await res.json();

      return data;
    } catch (err) {
      return err;
    }
  },
);

export const getComment = createAsyncThunk(
  'comment/get',
  async (params: string) => {
    try {
      const res = await fetch(apiUrl + `posts/${params}/comments`, {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      });
      const data = await res.json();
      return data;
    } catch (err) {
      return err;
    }
  },
);
