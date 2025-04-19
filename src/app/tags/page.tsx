"use client";

import { useGetCategoriesQuery } from "@/lib/features/api/api";

const Tags = () => {
  const { data: categories, isLoading } = useGetCategoriesQuery();

  return console.log(categories);
};

export default Tags;
