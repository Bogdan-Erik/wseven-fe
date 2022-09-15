import { createSlice } from '@reduxjs/toolkit'
import { apiSlice } from './apiSlice';

export interface SubscriptionState {
  loading?: boolean
  message?: string | null
  email?: string | null
}

export const subscriptionSlice = createSlice({
  name: 'subscription',
  initialState: {
    loading: false,
    message: null,
    email: null,
  },
  reducers: {
    setEmail: (state: SubscriptionState, action: any) => {
      state.email = action.payload
    },
  },
})

export const extendedApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    subscribeNewsletter: builder.mutation({
      query: data => ({
        url: '/subscribe',
        method: 'POST',
        body: {
          email: data.email
        }
      }),
      // invalidatesTags: ['Post']
    })
  })
})

// Action creators are generated for each case reducer function
export const { setEmail } = subscriptionSlice.actions
export const { useSubscribeNewsletterMutation } = extendedApiSlice;

export default subscriptionSlice.reducer
