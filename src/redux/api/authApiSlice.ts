import { fetchApiSlice } from '../fetchApiSlice'

export const authApiSlice = fetchApiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials) => ({
        url: '/api-auth-login',
        method: 'POST',
        body: { ...credentials },
      }),
    }),
    forgottenPassword: builder.mutation({
      query: (email) => ({
        url: '/v1-auth-password',
        method: 'POST',
        body: { email },
      }),
    }),
    newPassword: builder.mutation({
      query: ({ claimToken, password }) => ({
        url: '/v1-auth-setpassword',
        method: 'POST',
        body: { claimToken, password },
      }),
    }),
    activateUser: builder.mutation({
      query: ({ claimToken, password, firstName, lastName }) => ({
        url: '/v1-auth-activate',
        method: 'POST',
        body: { claimToken, password, firstName, lastName },
      }),
    }),
  }),
})

export const {
  useLoginMutation,
  useForgottenPasswordMutation,
  useNewPasswordMutation,
  useActivateUserMutation,
} = authApiSlice
