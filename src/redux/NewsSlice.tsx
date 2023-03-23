import { createSlice } from "@reduxjs/toolkit";
import { gql } from "graphql-request";
import store, { RootState } from "./store";
import { hasuraApiSlice } from "./hasuraApiSlice";
import moment from "moment";
import _ from "lodash";

export interface NewsSliceProps {
  news: any[]
}

const internalInitialState: NewsSliceProps = {
  news: []
};

export const newsSlice = createSlice({
  name: "newsSlice",
  initialState: internalInitialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addMatcher(
      newsApiSlice.endpoints.getNews.matchFulfilled,
      (state, action) => {
        /*state.name = action.payload[0]?.name;
      state.defaultUnit = action.payload[0]?.default_unit ?? 1000;*/
      state.news = action.payload.map((item:any) => {
        return {
          id: item.id,
          cover: import.meta.env.VITE_DO_IMAGE_HOST + item.cover,
          lead: item.title,
          content: item.content
        }
      })
      }
    );
  },
});

export const newsApiSlice = hasuraApiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getNews: builder.query<any, any>({
      query: (arg) => ({
        body: gql`
        query GetNews {
          news(limit: 8, order_by: {created_at: desc}) {
            id
            cover
            title
            content
            created_at
          }
        }
            
        `,
        token: store.getState().auth.accessToken,
      }),
      transformResponse: (response) => response.news,
    }),
    getNewById: builder.query<any, any>({
      query: (arg) => ({
        body: gql`
        query GetNews($id: uuid) {
          news(where: {id: {_eq: $id}}) {
            id
            cover
            title
            content
            created_at
          }
        }
        `,
        variables: {
          id: arg.id
        },
        token: store.getState().auth.accessToken,
      }),
      transformResponse: (response) => response.news,
    }),
    insertNewsComment: builder.mutation<any, any>({
      query: (arg) => ({
        body: gql`
          mutation InsertNewsComment(
            $customer_id: uuid
            $news_id: uuid
            $comment: String
            $createdAt: timestamp!
            $updatedAt: timestamp!

          ) {
            insert_news_comments(objects: {customer_id: $customer_id, comment: $comment, news_id: $news_id, created_at: $createdAt, updated_at: $updatedAt}) {
              affected_rows
            }
          }
        `,
        variables: {
          customer_id: arg.customerId,
          news_id: arg.newsId,
          comment: arg.comment,
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
  useGetNewsQuery,
  useGetNewByIdQuery,
  useInsertNewsCommentMutation,
} = newsApiSlice;

export const {} = newsSlice.actions;

export default newsSlice.reducer;
