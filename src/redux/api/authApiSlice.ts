import { fetchApiSlice } from '../fetchApiSlice'

export const authApiSlice = fetchApiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials) => ({
        url: '/auth-login',
        method: 'POST',
        body: { ...credentials },
      }),
    }),
    renewToken: builder.mutation({
      query: ({ accessToken, refreshToken }) => ({
        url: '/auth-token',
        method: 'POST',
        body: { accessToken, refreshToken },
      }),
    }),
    newPassword: builder.mutation({
      query: ({ accessToken, password, passwordRepeat }) => ({
        url: '/change-password',
        method: 'POST',
        body: { accessToken, password, passwordRepeat },
      }),
    }),
    pictureUpload: builder.mutation<{}, FormData>({
      query: (data) => ({
        url: '/upload-picture',
        method: 'POST',
        body: data,
      }),
    }),
  }),
})

export const {
  usePictureUploadMutation,
  useLoginMutation,
  useNewPasswordMutation,
  useRenewTokenMutation,
} = authApiSlice
