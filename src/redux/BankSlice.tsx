import { createSlice } from "@reduxjs/toolkit";
import { gql } from "graphql-request";
import store, { RootState } from "./store";
import { hasuraApiSlice } from "./hasuraApiSlice";
import moment from "moment";
import _ from "lodash";

export interface BankSlice {
  balance: number | null;
}

const internalInitialState: BankSlice = {
  balance: null,
};

const calcOdds = (tips: any) => {
  const numbers = tips?.map((tip: any) => tip.odds);
  return _.reduce(numbers, _.multiply, 1).toFixed(2);
};

export const bankSlice = createSlice({
  name: "bankSlice",
  initialState: internalInitialState,
  reducers: {},
  extraReducers: (builder) => {
        builder.addMatcher(
        bankApiSlice.endpoints.getBalance.matchFulfilled,
        (state, action) => {
          /*state.name = action.payload[0]?.name;
        state.defaultUnit = action.payload[0]?.default_unit ?? 1000;*/
          state.balance = action.payload?.current_balance ?? 0
        }
      );
  },
});

export const bankApiSlice = hasuraApiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getBank: builder.query<any, any>({
      query: () => ({
        body: gql`
          query GetCustomerTransactionReport($between: [String]!) {
            report: customer_transaction_report {
              current_balance
            }
            transactions: customer_transactions(
              where: { source_type: { _in: $between } }
              order_by: { created_at: desc }
            ) {
              source_type
              description
              amount
              created_at
            }
          }
        `,
        variables: {
          between: ["App\\Models\\Upload", "App\\Models\\Out"],
        },
        token: store.getState().auth.accessToken,
      }),
      transformResponse: (response) => {
        return {
          balance: response.report[0]?.current_balance ?? 0,
          transactions: response.transactions,
        };
      },
    }),
    getBalance: builder.query<any, any>({
      query: () => ({
        body: gql`
          query getCustomerReport {
            report: customer_transaction_report {
              current_balance
            }
          }
        `,
        token: store.getState().auth.accessToken,
      }),
      transformResponse: (response) => response.report[0],
    }),
    getTicketsByDateRange: builder.query<any, any>({
      query: (arg) => ({
        body: gql`
          query getTicketsByDateRange(
            $dateFrom: timestamp!
            $dateTo: timestamp!
          ) {
            tickets(
              where: {
                _and: {
                  _and: { start_date: { _gte: $dateFrom } }
                  start_date: { _lte: $dateTo }
                }
                status: { _neq: 0 }
              }
            ) {
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
    uploadBank: builder.mutation<any, any>({
      query: (arg) => ({
        body: gql`
          mutation InsertCustomerTransaction(
            $customer_id: uuid
            $amount: float8
            $sourceId: uuid!
            $sourceType: String!
            $description: String!
            $createdAt: timestamp!
          ){
            insert_customer_transactions(
              objects: {
                amount: $amount
                customer_id: $customer_id
                source_id: $sourceId
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
          customer_id: arg.customerId,
          amount: arg.amount,
          sourceId: '40e6215d-b5c6-4896-987c-f30f3678f608',
          sourceType: arg.sourceType,
          description: arg.description,
          createdAt: moment().utcOffset(0, true).format(),
        },
        token: store.getState().auth.accessToken,
      }),
      transformResponse: (response) => response.insert_customer_transactions,
    }),
  }),
});

export const {
  useLazyGetBalanceQuery,
  useGetBankQuery,
  useUploadBankMutation
  // useAddTicketForCostumerMutation,
  // useLazyGetTicketsByDateRangeQuery,
} = bankApiSlice;

export const {} = bankSlice.actions;

export default bankSlice.reducer;
