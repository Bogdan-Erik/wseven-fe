import { createSlice } from "@reduxjs/toolkit";
import { gql } from "graphql-request";
import store, { RootState } from "./store";
import { hasuraApiSlice } from "./hasuraApiSlice";
import moment from "moment";

export interface CustomerSlice {
  name: any
  image:string
  defaultUnit: any
}

const internalInitialState: CustomerSlice = {
  name: "",
  image: null,
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
        state.image = action.payload[0]?.image ?? "https://fra1.digitaloceanspaces.com/w7tips/placeholders/stock_sample.png";
        state.defaultUnit = action.payload[0]?.default_unit ?? 1000;
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
  }),
});

export const { useGetMyselfQuery, useLazyGetMyselfQuery, useUpdateBaseDatasMutation } = customerApiSlice;


export default customerSlice.reducer;
