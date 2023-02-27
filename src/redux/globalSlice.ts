import { createSlice } from '@reduxjs/toolkit'
import { RootState } from './../redux/store'

export const LOADING_STATE = {
  IDLE: 'idle',
  PENDING: 'pending',
  FULFILLED: 'fulfilled',
  FAILED: 'failed',
}

export interface GlobalSliceState {
  menus: any[]
}

const internalInitialState = {
  menus: [],
}

export const globalSlice = createSlice({
  name: 'global',
  initialState: internalInitialState,
  reducers: {
    setMenu: (state: GlobalSliceState, action) => {
      state.menus = action.payload;
    },
   
  },
})

export const { setMenu } = globalSlice.actions

export default globalSlice.reducer
