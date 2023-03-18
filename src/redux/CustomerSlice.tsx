
import { createSlice } from "@reduxjs/toolkit";
import { gql } from "graphql-request";
import store, { RootState } from "./store";
import { hasuraApiSlice } from "./hasuraApiSlice";
import moment from "moment";

export interface CustomerSlice {
  name: any
  nickname: any
  playingType: string | any,
  image: string | null
  defaultUnit: any
  isPremium: boolean | null
  settings: any
}

const internalInitialState: CustomerSlice = {
  name: "",
  nickname: null,
  image: null,
  playingType: null,
  defaultUnit: null,
  isPremium: null,
  settings: {}
};

export const customerSlice = createSlice({
  name: "customerSlice",
  initialState: internalInitialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addMatcher(
      customerApiSlice.endpoints.getMyself.matchFulfilled,
      (state, action) => {
        state.name = action.payload[0]?.name;
        state.settings = action.payload[0]?.settings;
        state.nickname = action.payload[0]?.nickname;
        state.playingType = action.payload[0]?.playing_type;
        state.image = action.payload[0]?.image ? (import.meta.env.VITE_DO_IMAGE_HOST + action.payload[0]?.image) : (import.meta.env.VITE_DO_IMAGE_HOST + "placeholders/stock_sample.png");
        state.defaultUnit = action.payload[0]?.default_unit ?? 1000;
        state.isPremium = action.payload[0]?.subscriptions?.length > 0 ? true : false
      }
    );
    builder.addMatcher(
      customerApiSlice.endpoints.updateBankroll.matchFulfilled,
      (state, action) => {
        state.playingType = action.payload[0]?.playing_type;
      }
    );
  },
});

export const customerApiSlice = hasuraApiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getMyself: builder.query<any, any>({
      query: () => ({
        body: gql`
          query($today: timestamp) {
            customers {
              name
              email
              image
              nickname
              playing_type
              default_unit
              settings
              subscriptions(where: {_and: {subscription_start: {_lte: $today}}, subscription_end: {_gte: $today}}) {
                subscription_start
                subscription_end
              }
            }
          }
        `,
        variables: {
          today: moment().format('YYYY-MM-DD HH:mm:ss')
        },
        token: store.getState().auth.accessToken,
      }),
      transformResponse: (response) => response.customers,
    }),
    updateBaseDatas: builder.mutation<any, any>({
      query: (arg) => ({
        body: gql`
          mutation UpdateCustomerDatas(
            $customer_id: uuid
            $username: String!
            $name: String!
            $updatedAt: timestamp!
          ){
            update_customers(where: {id: {_eq: $customer_id}}, _set: {nickname: $username, name: $name, updated_at: $updatedAt}) {
              returning {
                name
                nickname
              }
            }
          }
        `,
        variables: {
          customer_id: arg.customer_id,
          username: arg.nickname,
          name: arg.name,
          updatedAt: moment().utcOffset(0, true).format(),
        },
        token: store.getState().auth.accessToken,
      }),
      invalidatesTags: ['Customer'],
      transformResponse: (response) => response,
    }),
      updateNotifications: builder.mutation<any, any>({
      query: (arg) => ({
        body: gql`
          mutation UpdateNotifications(
            $customer_id: uuid
            $settings: json
          ){
            update_customers(where: {id: {_eq: $customer_id}}, _set: {settings: $settings}) {
              returning {
                settings
              }
            }
          }
        `,
        variables: {
          customer_id: arg.customer_id,
          settings: arg.settings,
        },
        token: store.getState().auth.accessToken,
      }),
      invalidatesTags: ['Customer'],
      transformResponse: (response) => response,
    }),
    updateBankroll: builder.mutation<any, any>({
      query: (arg) => ({
        body: gql`
          mutation UpdateCustomerBankroll(
            $customer_id: uuid
            $playing_type: String!
            $updatedAt: timestamp!
          ){
            update_customers(where: {id: {_eq: $customer_id}}, _set: {playing_type: $playing_type, updated_at: $updatedAt}) {
              returning {
                playing_type
              }
            }
          }
        `,
        variables: {
          customer_id: arg.customer_id,
          playing_type: arg.playing_type,
          updatedAt: moment().utcOffset(0, true).format(),
        },
        token: store.getState().auth.accessToken,
      }),
      invalidatesTags: ['Customer'],
      transformResponse: (response) => response.update_customers.returning,
    }),
  }),
});

export const { useGetMyselfQuery, useLazyGetMyselfQuery, useUpdateBaseDatasMutation, useUpdateBankrollMutation, useUpdateNotificationsMutation } = customerApiSlice;


export default customerSlice.reducer;
