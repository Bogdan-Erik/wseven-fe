import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

// Define a service using a base URL and expected endpoints
export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://wseven.bogdandev.hu/api/' }),
  tagTypes: ['Post'],
  endpoints: (builder) => ({}),
})
