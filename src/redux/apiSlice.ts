import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Transaction } from "../utils/types";

export const transactionsApi = createApi({
  reducerPath: "transactionsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_APP_BACKEND_URL,
    prepareHeaders: (headers) => {
      if (import.meta.env.VITE_APP_API_KEY) {
        headers.set("x-api-key", import.meta.env.VITE_APP_API_KEY);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getTransactions: builder.query<
      Transaction[],
      { page?: number; limit?: number }
    >({
      query: ({ page = 1, limit = 50 }) =>
        `/transactions?page=${page}&limit=${limit}`,
    }),
    addTransaction: builder.mutation<Transaction, Partial<Transaction>>({
      query: (transaction) => ({
        url: "/transactions",
        method: "POST",
        body: transaction,
      }),
    }),
  }),
});

export const { useGetTransactionsQuery, useAddTransactionMutation } =
  transactionsApi;
