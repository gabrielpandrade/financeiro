"use client"

import { setIsDarkMode } from "@/lib/features/global/globalSlice";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { useEffect } from "react";

const Home = () => {
  const dispatch = useAppDispatch();

  const isDarkMode = useAppSelector((state) => state.global.isDarkMode);

  const toggleDarkMode = () => {
    console.log(isDarkMode)
    dispatch(setIsDarkMode(!isDarkMode));
  };

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.add("light");
    }
  });


  return <button className="text-lg outline outline-red-500" onClick={toggleDarkMode}>Teste</button>;
};

export default Home;
