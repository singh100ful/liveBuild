import { configureStore } from '@reduxjs/toolkit'
import { postReducer } from './reducers/postSlice'

export const store = configureStore({ reducer: postReducer })

export type RootState = ReturnType<typeof store.getState>;
// The store now has redux-thunk added and the Redux DevTools Extension is turned on