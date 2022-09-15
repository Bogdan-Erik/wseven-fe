import { configureStore } from '@reduxjs/toolkit'
import subscriptionReducer from './subscriptionSlice'
import { apiSlice } from './apiSlice'


const store = configureStore({
  reducer: {
    //example: exampleSlice,
    //global: globalSlice,
    //user: userSlice,
    subscriptions: subscriptionReducer,
    [apiSlice.reducerPath]: apiSlice.reducer
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(apiSlice.middleware),
  preloadedState: {
    //global: { darkMode: themeState ? themeState : 'light', menuBarOpen: false },
  },
})

export type RootState = ReturnType<typeof store.getState>

export default store
