
import { createSlice } from "@reduxjs/toolkit";
import { gql } from "graphql-request";
import store, { RootState } from "./store";
import { hasuraApiSlice } from "./hasuraApiSlice";
import moment from "moment";

export interface CustomerSlice {
  name: any
  playingType: string | any,
  image: string | null
  defaultUnit: any
}

const internalInitialState: CustomerSlice = {
  name: "",
  image: null,
  playingType: null,
  defaultUnit: null,
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
        state.playingType = action.payload[0]?.playing_type;
        state.image = action.payload[0]?.image ?? "https://fra1.digitaloceanspaces.com/w7tips/placeholders/stock_sample.png";
        state.defaultUnit = action.payload[0]?.default_unit ?? 1000;
      }
    );
    builder.addMatcher(
      customerApiSlice.endpoints.updateBankroll.matchFulfilled,
      (state, action) => {
        console.log(action.payload)
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
          query {
            customers {
              name
              email
              image
              nickname
              playing_type
              default_unit
            }
          }
        `,
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

export const { useGetMyselfQuery, useLazyGetMyselfQuery, useUpdateBaseDatasMutation, useUpdateBankrollMutation } = customerApiSlice;


export default customerSlice.reducer;
