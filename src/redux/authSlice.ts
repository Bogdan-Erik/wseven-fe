import { createSlice } from '@reduxjs/toolkit'
import { RootState } from './../redux/store'

export const LOADING_STATE = {
  IDLE: 'idle',
  PENDING: 'pending',
  FULFILLED: 'fulfilled',
  FAILED: 'failed',
}

export interface AuthSliceState {
  accessToken: any | string
  refreshToken: string
  userId: string
  status: 'idle' | 'pending' | 'fulfilled'
}

const internalInitialState = {
  accessToken: '',
  refreshToken: '',
  userId: '',
  status: LOADING_STATE.IDLE,
}

export const authSlice = createSlice({
  name: 'auth',
  initialState: internalInitialState,
  reducers: {
    reset: (state) => {
      state.accessToken = ''
      state.userId = ''
      state.refreshToken = ''
      state.status = LOADING_STATE.IDLE
    },
    setCredentials: (state, action) => {
      const { userId, accessToken, refreshToken } = action.payload
      state.userId = userId
      state.accessToken = accessToken
      state.refreshToken = refreshToken
      state.status = LOADING_STATE.FULFILLED
    },
    setAuthToken: (state, action) => {
      state.accessToken = action.payload
    },
  },
})

export const { reset, setCredentials, setAuthToken } = authSlice.actions
export const selectCurrentToken = (state: RootState) => {
  return state?.auth?.accessToken
}
export const selectIfTokenStatusIdle = (state: RootState) =>
  state.auth.status === LOADING_STATE.IDLE
export const selectIfTokenStatusFulfilled = (state: RootState) =>
  state.auth.status === LOADING_STATE.FULFILLED
export const selectCurrentUserId = (state: RootState) => state.auth.userId
export default authSlice.reducer
