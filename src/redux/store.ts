// @ts-nocheck
import {
  combineReducers,
  configureStore,
  Action,
  ThunkAction,
} from '@reduxjs/toolkit'
import { persistReducer, persistStore } from 'redux-persist'
import authSlice from './authSlice'
import globalSlice from './globalSlice'
import storage from 'redux-persist/lib/storage'
import storageSession from 'reduxjs-toolkit-persist/lib/storage/session'
import { useDispatch } from 'react-redux'
import { apiSlice } from './apiSlice'
import { hasuraApiSlice } from './hasuraApiSlice'
import { fetchApiSlice } from './fetchApiSlice'
import { setupListeners } from '@reduxjs/toolkit/query'
import matchSlice, { matchApiSlice } from './MatchSlice';
import customerSlice, { customerApiSlice } from './CustomerSlice';
import ticketSlice, { ticketApiSlice } from './TicketSlice';
import notificationSlice, { notificationApiSlice } from './NotificationSlice';
import bankSlice, { bankApiSlice } from './BankSlice';
/* -- reduxSliceImport: insert above here -- */


const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['auth'],
}


const requirementPersistConfig = {
  key: 'requirement',
  storage: storageSession,
}

const rootReducer = combineReducers({
  auth: authSlice,
  global: globalSlice,
  match: matchSlice,
  customer: customerSlice,
  ticket: ticketSlice,
  notification: notificationSlice,
  bank: bankSlice,
  /* -- reduxSlice: insert above here -- */
  [fetchApiSlice.reducerPath]: fetchApiSlice.reducer,
  [apiSlice.reducerPath]: apiSlice.reducer,
  [hasuraApiSlice.reducerPath]: hasuraApiSlice.reducer,
  [matchApiSlice.reducerPath]: matchApiSlice.reducer,
  [customerApiSlice.reducerPath]: customerApiSlice.reducer,
  [ticketApiSlice.reducerPath]: ticketApiSlice.reducer,
  [notificationApiSlice.reducerPath]: notificationApiSlice.reducer,
  [bankApiSlice.reducerPath]: bankApiSlice.reducer,

  /* -- reduxApiSliceReducerPath: insert above here -- */
})

const persistedReducer = persistReducer(persistConfig, rootReducer)

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([
      fetchApiSlice.middleware,
      apiSlice.middleware,
      hasuraApiSlice.middleware,
      matchApiSlice.middleware,
      customerApiSlice.middleware,
      ticketApiSlice.middleware,
      notificationApiSlice.middleware,
      bankApiSlice.middleware,
      /* -- reduxApiSliceMiddleware: insert above here -- */
    ]),
  preloadedState: {
    //global: { darkMode: themeState ? themeState : 'light', menuBarOpen: false },
  },
})

setupListeners(store.dispatch)

export const persistor = persistStore(store)

export type RootState = ReturnType<typeof store.getState>
export type MyThunkDispatch = typeof store.dispatch

export type AppDispatch = typeof store.dispatch
export const useAppDispatch: () => AppDispatch = useDispatch
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>

export default store
