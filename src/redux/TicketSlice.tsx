import { createSlice } from "@reduxjs/toolkit";
import { gql } from "graphql-request";
import store, { RootState } from "./store";
import { hasuraApiSlice } from "./hasuraApiSlice";
import moment from "moment";
import _ from "lodash";

export interface TicketSlice {
  name: any;
  filteredTickets: any;
}

const internalInitialState: TicketSlice = {
  name: "",
  filteredTickets: [],
};

const calcOdds = (tips: any) => {
  const numbers = tips?.map((tip: any) => tip.odds);
  return _.reduce(numbers, _.multiply, 1).toFixed(2);
};

export const ticketSlice = createSlice({
  name: "ticketSlice",
  initialState: internalInitialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addMatcher(
      ticketApiSlice.endpoints.getTicketsByDateRange.matchFulfilled,
      (state, action) => {

        state.filteredTickets =
          action.payload.map((item: any) => {
            const oddsSource =
              item.customer_tickets[0]?.customer_ticket_tips ?? item.tips;
            const odds = calcOdds(oddsSource);

            const winningPrice = item.customer_tickets[0]?.customer_ticket_tips ? ((item.customer_tickets[0]?.bet* parseFloat(odds))-item.customer_tickets[0]?.bet)  : ((item.suggested_bet * parseFloat(odds)) - item.suggested_bet);

            return {
              number: item.number,
              date: moment(item.start_date)
                .locale("hu")
                .format("YYYY. MMMM DD."),
              odds: odds,
              isWinner: item.result === 1 ? true : false,
              isSeconday: true,
              matchesNumber: item.matchesNumber?.aggregate?.count ?? 0,
              isUserPlacedBet: item.customer_tickets[0] ? true : false,
              winningPrice:
                (item.result === 1 ? "+" : "-") + winningPrice,
              item: item,
            };
          }) ?? [];
      }
    ),
      builder.addMatcher(
        ticketApiSlice.endpoints.getTickets.matchFulfilled,
        (state, action) => {
          /*state.name = action.payload[0]?.name;
        state.defaultUnit = action.payload[0]?.default_unit ?? 1000;*/
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
            tickets(where: { status: { _eq: 0 } }) {
              id
              is_premium
              type
              number
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
              customer_tickets {
                id
                bet
                customer_ticket_tips {
                  id
                  odds
                  ticket_tip {
                    id
                    result
                    title
                    description
                  }
                }
              }
            }
          }
        `,
        token: store.getState().auth.accessToken,
      }),
      transformResponse: (response) => response.tickets,
    }),
    getTicketsByDateRange: builder.query<any, any>({
      query: (arg) => ({
        body: gql`
          query getTicketsByDateRange(
            $dateFrom: timestamp!
            $dateTo: timestamp!
          ) {
            tickets(where: {_and: {_and: {start_date: {_gte: $dateFrom}}, start_date: {_lte: $dateTo}}, status: {_neq: 0}}, order_by: {start_date: desc}) {
              id
              is_premium
              number
              type
              suggested_bet
              result
              status
              start_date
              matchesNumber: ticket_tips_aggregate {
                aggregate {
                  count: count
                }
              }
              tips: ticket_tips {
                id
                odds
                result
                title
                description
              }
              customer_tickets {
                id
                bet
                customer_ticket_tips {
                  id
                  odds
                  ticket_tip {
                    id
                    result
                    title
                    description
                  }
                }
              }
            }
          }
        `,
        variables: {
          dateFrom: arg.dateFrom,
          dateTo: arg.dateTo,
        },
        token: store.getState().auth.accessToken,
      }),
      transformResponse: (response) => response.tickets,
    }),
    addTicketForCostumer: builder.mutation<any, any>({
      query: (arg) => ({
        body: gql`
          mutation InsertCustomerTickets(
            $customer_id: uuid
            $bet: String
            $ticket_id: uuid
            $customer_ticket_tips: [customer_ticket_tips_insert_input!]!
            $betMinus: float8
            $sourceType: String!
            $description: String!
            $createdAt: timestamp!
          ) {
            insert_customer_tickets_one(
              object: {
                customer_id: $customer_id
                bet: $bet
                ticket_id: $ticket_id
                customer_ticket_tips: { data: $customer_ticket_tips }
              }
            ) {
              id
              bet
            }

            insert_customer_transactions(
              objects: {
                amount: $betMinus
                customer_id: $customer_id
                source_id: $ticket_id
                source_type: $sourceType
                description: $description
                created_at: $createdAt
              }
            ) {
              returning {
                description
                source_type
                amount
                customer_id
                source_id
                created_at
              }
            }
          }
        `,
        variables: {
          customer_id: arg.customer_id,
          bet: JSON.stringify(arg.bet),
          betMinus: JSON.stringify(-arg.bet),
          ticket_id: arg.ticket_id,
          customer_ticket_tips: arg.customer_ticket_tips,
          sourceType: arg.sourceType,
          description: arg.description,
          createdAt: moment().utcOffset(0, true).format(),
        },
        token: store.getState().auth.accessToken,
      }),
      transformResponse: (response) => response.insert_customer_tickets_one,
    }),
  }),
});

export const {
  useGetTicketsQuery,
  useAddTicketForCostumerMutation,
  useLazyGetTicketsByDateRangeQuery,
} = ticketApiSlice;

export const {} = ticketSlice.actions;

export default ticketSlice.reducer;
