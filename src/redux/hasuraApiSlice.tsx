import { createApi } from '@reduxjs/toolkit/query/react'
import { request, ClientError } from 'graphql-request'

const graphqlBaseQuery =
  ({ baseUrl }: { baseUrl: string }) =>
  async ({ body, variables, token }: { body: string, token?: any, variables?: any }) => {
    try {
      const result = await request(baseUrl, body, variables, {
        //'x-hasura-admin-secret': `${import.meta.env.VITE_HASURA_TOKEN}`,
        'Authorization': `Bearer ${token}`
      })
      return { data: result }
    } catch (error) {
      if (error instanceof ClientError) {
        return { error: { status: error.response.status, data: error } }
      }
      return { error: { status: 500, data: error } }
    }
  }

// Define a service using a base URL and expected endpoints
export const hasuraApiSlice = createApi({
  baseQuery: graphqlBaseQuery({
    baseUrl: `${import.meta.env.VITE_HASURA_URL}`,
  }),

  endpoints: () => ({}),
})