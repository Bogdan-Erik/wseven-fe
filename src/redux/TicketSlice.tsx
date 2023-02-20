import { createSlice } from "@reduxjs/toolkit";
import { gql } from "graphql-request";
import store, { RootState } from "./store";
import { hasuraApiSlice } from "./hasuraApiSlice";

export interface TicketSlice {
  name: any;
  defaultUnit: any;
}

const internalInitialState: TicketSlice = {
  name: "",
  defaultUnit: null,
};

export const ticketSlice = createSlice({
  name: "ticketSlice",
  initialState: internalInitialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addMatcher(
      ticketApiSlice.endpoints.getTickets.matchFulfilled,
      (state, action) => {
        /*state.name = action.payload[0]?.name;
        state.defaultUnit = action.payload[0]?.default_unit ?? 1000;*/ 
        console.log(action.payload);
      }
    );
  },
});

export const ticketApiSlice = hasuraApiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getTickets: builder.query<any, any>({
      query: () => ({
        body: gql`
          query GetTickets {
            tickets {
              id
              is_premium
              name
              type
              suggested_bet
              result
              status
              start_date
              tips: ticket_tips {
                id
                odds
                result
                title
                description
              }
            }
          }
        `,
        token: store.getState().auth.accessToken,
      }),
      transformResponse: (response) => response.tickets,
    }),
  }),
});

export const { useGetTicketsQuery } = ticketApiSlice;

export const {} = ticketSlice.actions;

export default ticketSlice.reducer;
