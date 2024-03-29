import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { reset, setCredentials } from './authSlice'
import { RootState } from './store'
import type {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
} from '@reduxjs/toolkit/query'

type TokenResponse = {
  data: {
    accessToken: string
    id: string
  }
}

const baseQuery = fetchBaseQuery({
  baseUrl: `${import.meta.env.VITE_BASE_URL}`,
  //credentials: 'include',
  prepareHeaders: (headers, api) => {
    const state: RootState = api.getState() as RootState
    const token = state.auth?.accessToken || null
    if (token) {
      headers.set('authorization', `Bearer ${token}`)
    }
    headers.set('Accept', 'application/json');

    return headers
  },
})

const baseQueryWithReauth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions)

  if (result?.error?.status === 403) {
    const state: RootState = api.getState() as RootState
    const response = await baseQuery(
      {
        url: '/auth-token',
        method: 'POST',
        body: {
          userId: state.auth.userId,
        },
      },
      api,
      extraOptions,
    )

    if (!response?.data) {
      api.dispatch(reset())
    }

    const {
      data: { accessToken, id },
    } = response.data as TokenResponse

    if (accessToken && id) {
      api.dispatch(
        setCredentials({
          accessToken: accessToken,
          userId: id,
        }),
      )

      result = await baseQuery(args, api, extraOptions)
    } else {
      api.dispatch(reset())
    }
  } else if (result?.error?.status === 401) {
    api.dispatch(reset())
  }

  return result
}

export const fetchApiSlice = createApi({
  reducerPath: 'fetchApi',
  baseQuery: baseQueryWithReauth,
  endpoints: () => ({}),
})
