import { axiosBaseQuery } from "@/lib/axiosBaseQuery";
import {
  Category,
  NewCategory,
  NewPaymentMethod,
  NewTag,
  NewTransaction,
  PaymentMethod,
  Tag,
  Transaction,
} from "@/lib/definition";
import { createApi } from "@reduxjs/toolkit/query/react";

export const api = createApi({
  baseQuery: axiosBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL || "",
  }),
  reducerPath: "api",
  tagTypes: ["User", "Tags", "Categories", "PaymentMethods", "Transactions"],
  refetchOnMountOrArgChange: false,
  endpoints: (build) => ({
    //GETS
    getCategories: build.query<Category[], void>({
      query: () => ({ url: "/categories", method: "GET" }),
      providesTags: ["Categories"],
      keepUnusedDataFor: Infinity,
    }),
    getMethods: build.query<PaymentMethod[], void>({
      query: () => ({ url: "/methods", method: "GET" }),
      providesTags: ["PaymentMethods"],
      keepUnusedDataFor: Infinity,
    }),
    getTags: build.query<Tag[], void>({
      query: () => ({ url: "/tags", method: "GET" }),
      providesTags: ["Tags"],
      keepUnusedDataFor: Infinity,
    }),
    getTransactions: build.query<Transaction[], void>({
      query: () => ({ url: "/transactions", method: "GET" }),
      providesTags: ["Transactions"],
      keepUnusedDataFor: Infinity,
    }),

    //POSTS
    createCategory: build.mutation<Category, NewCategory>({
      query: (newCategory) => ({
        url: "/categories",
        method: "POST",
        data: newCategory,
      }),
      invalidatesTags: ["Categories"],
    }),
    createMethod: build.mutation<PaymentMethod, NewPaymentMethod>({
      query: (newMethod) => ({
        url: "/methods",
        method: "POST",
        data: newMethod,
      }),
      invalidatesTags: ["PaymentMethods"],
    }),
    createTag: build.mutation<Tag, NewTag>({
      query: (newTag) => ({
        url: "/tags",
        method: "POST",
        data: newTag,
      }),
      invalidatesTags: ["Tags"],
    }),
    createTransaction: build.mutation<Transaction, NewTransaction>({
      query: (newTransaction) => ({
        url: "/transactions",
        method: "POST",
        data: newTransaction,
      }),
      invalidatesTags: ["Transactions"],
    }),
  }),
});

export const {
  useGetCategoriesQuery,
  useGetMethodsQuery,
  useGetTagsQuery,
  useGetTransactionsQuery,
  useCreateCategoryMutation,
  useCreateMethodMutation,
  useCreateTagMutation,
  useCreateTransactionMutation,
} = api;
