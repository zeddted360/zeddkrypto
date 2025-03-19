"use client";
import { useState, useEffect } from "react";

export const useFetchGiphy = ({ keyword }: { keyword: string }) => {
  const [giphyURL, setGiphyURL] = useState("");

  const API_KEY = process.env.NEXT_PUBLIC_VITE_GIPHY_API;

  const fetchGiphys = async () => {
    try {
      const res = await fetch(
        `https://api.giphy.com/v1/gifs/search?api_key=${API_KEY}&q=${keyword
          .split(" ")
          .join("")}&limit=1`
      );
      if (!res.ok) {
        throw new Error("Error fetching giph");
      }
      const { data } = await res.json();
      setGiphyURL(data[0]?.images?.downsized_medium?.url);
    } catch (error) {
      console.error(
        error instanceof Error ? error.message : "Error fetching giphs"
      );
      setGiphyURL("https://media.giphy.com/media/3oEjI6SIIHBdRx6P8I/giphy.gif");
    }
  };

  useEffect(() => {
    if (keyword) fetchGiphys();
  }, [keyword]);

  return { giphyURL };
};
