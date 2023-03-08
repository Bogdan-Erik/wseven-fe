import { createSlice } from '@reduxjs/toolkit'
import { gql } from 'graphql-request'
import store, { RootState } from './store'
import { hasuraApiSlice } from './hasuraApiSlice'
import moment from 'moment'


export interface NotificationSlice {
  notifications: any[]
}

const internalInitialState: NotificationSlice = {
  notifications: [],
}

export const notificationSlice = createSlice({
  name: 'notificationSlice',
  initialState: internalInitialState,
  reducers: {

  },
  extraReducers: (builder) => {
    builder.addMatcher(
      notificationApiSlice.endpoints.getNotifications.matchFulfilled,
      (state, action) => {
        state.notifications = action.payload;
      }
    )
  }
})

export const notificationApiSlice = hasuraApiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getNotifications: builder.query<any, any>({
      query: () => ({
        body: gql`
          query {
            notifications {
              id
              type
              title
              content
              action
              read
              read_at
              created_at
            }
          }
        `,
        token: store.getState().auth.accessToken,
      }),
      keepUnusedDataFor: 5,
      transformResponse: (response) => response.notifications,
    }),
    setSeenNotification: builder.mutation<any, any>({
      query: (args) => ({
        body: gql`
          mutation updateNotification($id: uuid!, $date: timestamp!) {
            update_notifications(where: {id: {_eq: $id}}, _set: {read: true, read_at: $date }) {
              affected_rows
            }
          }
        `,
        variables: {
          id: args.id,
          date: moment().format('YYYY-MM-DD HH:mm:ss'),
        },
        token: store.getState().auth.accessToken,
      }),
      transformResponse: (response) => response.updateNotification,
    }),
    removeNotification: builder.mutation<any, any>({
      query: (args) => ({
        body: gql`
          mutation deleteNotification($id: uuid) {
            delete_notifications(where: {id: {_eq: $id}}) {
              affected_rows
            }
          }
        `,
        variables: {
          id: args.id,
        },
        token: store.getState().auth.accessToken,
      }),
      transformResponse: (response) => response.deleteNotification,
    }),
    removeAllNotification: builder.mutation<any, any>({
      query: () => ({
        body: gql`
          mutation deleteAllNotification {
            delete_notifications(where: {id: {_is_null: false}}) {
              affected_rows
            }
          }
        `,
        token: store.getState().auth.accessToken,
      }),
      transformResponse: (response) => response.deleteNotification,
    }),
  }),
});

export const {
  useGetNotificationsQuery,
  useSetSeenNotificationMutation,
  useRemoveNotificationMutation,
  useRemoveAllNotificationMutation,
} = notificationApiSlice

export const { } = notificationSlice.actions

export default notificationSlice.reducer
