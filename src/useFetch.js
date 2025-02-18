import { useState, useEffect } from "react";


export const API_URL = `https://www.omdbapi.com/?apikey=${process.env.REACT_APP_API_KEY}`;


const useFetch = (apiParams) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState({ show: false, msg: "" });
  const [movie, setMovie] = useState(null);

  const getMovie = async (url) => {
    setIsLoading(true);
    try {
      const res = await fetch(url);
      const data = await res.json();

      console.log(data);
      if (data.Response === "True") {
        setIsLoading(false);
        setMovie(data.Search || data);
        setIsError({ show: false, msg: "" });
      } else {
        setIsLoading(false);
        setIsError({ show: true, msg: "Movie not found!" });
      }
    } catch (error) {
      console.log(error);
      setIsLoading(false);
      setIsError({ show: true, msg: "Something went wrong!" });
    }
  };

  // Optimize edilmiş debouncing
  useEffect(() => {
    const timeOut = setTimeout(() => {
      if (apiParams) {
        getMovie(`${API_URL}&s=${apiParams}`);
      } else {
        setMovie(null);
        setIsLoading(false);
      }
    }, 300); // Debouncing süresini 300ms'ye düşürdük

    return () => clearTimeout(timeOut);
  }, [apiParams]);

  return { isLoading, isError, movie };
};

export default useFetch;