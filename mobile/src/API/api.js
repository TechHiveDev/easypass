import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import config from "../Config/config";
import endpoints from "./api.queries";

// ==========================================================

export const apiSlice = createApi({
  reducerPath: "api",

  // -------------------------------------

  baseQuery: fetchBaseQuery({
    baseUrl: config.API_URL,
    prepareHeaders: async (headers, { getState }) => {
      //   const token = getState()?.user?.access_token;

      //   if (token) {
      //     headers.set("authorization", `Bearer ${token}`);
      //   }

      headers.set("Content-Type", "application/json");
      headers.set("Accept", "application/json");
      return headers;
    },
  }),
  endpoints,
});

// ==========================================================

export const {
  useCreateMutation,
  useGetListQuery,
  useGetOneQuery,
  useUpdateMutation,
  useDeleteOneQuery,
} = apiSlice;
