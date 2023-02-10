import { createSlice } from '@reduxjs/toolkit'
import { gql } from 'graphql-request'
import store, { RootState } from './store'
import { hasuraApiSlice } from './hasuraApiSlice'


export interface CustomerSlice {
  name: any
  defaultUnit: any
}

const internalInitialState: CustomerSlice = {
  name: '',
  defaultUnit: null,
}

export const customerSlice = createSlice({
  name: 'customerSlice',
  initialState: internalInitialState,
  reducers: {
   
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      customerApiSlice.endpoints.getMyself.matchFulfilled,
      (state, action) => {
        state.name = action.payload[0]?.name;
        state.defaultUnit = action.payload[0]?.default_unit ?? 1000;
        console.log(action.payload)
      }
    )
  } 
})

export const customerApiSlice = hasuraApiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getMyself: builder.query<any, any>({
      query: () => ({
        body: gql`
          query {
            customers {
              name
              email
              default_unit
            }
          }
        `,
        token: store.getState().auth.accessToken,
      }),
      transformResponse: (response) => response.customers,
    }),
  }),
});

export const {
  useLazyGetMyselfQuery
} = customerApiSlice

export const {  } = customerSlice.actions

export default customerSlice.reducer
