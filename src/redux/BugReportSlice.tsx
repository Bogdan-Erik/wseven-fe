import { createSlice } from "@reduxjs/toolkit";
import { gql } from "graphql-request";
import store, { RootState } from "./store";
import { hasuraApiSlice } from "./hasuraApiSlice";
import moment from "moment";
import _ from "lodash";

export interface BugReportSlice {
}

const internalInitialState: BugReportSlice = {
};

export const bugReportSlice = createSlice({
  name: "bugReportSlice",
  initialState: internalInitialState,
  reducers: {},
  extraReducers: (builder) => {},
});

export const bugReportApiSlice = hasuraApiSlice.injectEndpoints({
  endpoints: (builder) => ({
    insertBugReport: builder.mutation<any, any>({
      query: (arg) => ({
        body: gql`
          mutation InsertBugReports(
            $title: String
            $text: String
            $customer_id: uuid
            $createdAt: timestamp!
            $updatedAt: timestamp!

          ) {
            insert_bug_reports(
              objects: { title: $title, text: $text, customer_id: $customer_id, created_at: $createdAt, updated_at: $updatedAt }
            ) {
              affected_rows
            }
          }
        `,
        variables: {
          customer_id: arg.customerId,
          title: arg.title,
          text: arg.text,
          createdAt: moment().utcOffset(0, true).format(),
          updatedAt: moment().utcOffset(0, true).format(),
        },
        token: store.getState().auth.accessToken,
      }),
      transformResponse: (response) => response.insert_customer_transactions,
    }),
  }),
});

export const {
  useInsertBugReportMutation,
} = bugReportApiSlice;

export const {} = bugReportSlice.actions;

export default bugReportSlice.reducer;
