// context < API > </>
// useContext hooks

// context(warehouse)
// Provider (delivery)
// consumer / (useContext())

import React, { useContext, useEffect, useState } from "react";

const API_URL = `https://www.omdbapi.com/?apikey=${process.env.REACT_APP_API_KEY}`;

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [movie, setMovie] = useState([]);
  const [isError, setIsError] = useState({ show: false, msg: "" });
  const [query, setQuery] = useState("");

  const getMovies = async (url) => {
    setIsLoading(true);
    try {
      const res = await fetch(url);
      const data = await res.json();
      
      if (data.Response === "True") {
        setIsLoading(false);
        setMovie(data.Search || []);
        setIsError({ show: false, msg: "" });
      } else {
        setIsLoading(false);
        setMovie([]);
        setIsError({
          show: true,
          msg: data.Error || "No movies found",
        });
      }
    } catch (error) {
      console.log(error);
      setIsLoading(false);
      setMovie([]);
      setIsError({
        show: true,
        msg: "Something went wrong!",
      });
    }
  };

  useEffect(() => {
    const timeOut = setTimeout(() => {
      if (query.trim()) {
        getMovies(`${API_URL}&s=${query}`);
      } else {
        setMovie([]);
        setIsLoading(false);
        setIsError({ show: false, msg: "" });
      }
    }, 300);

    return () => clearTimeout(timeOut);
  }, [query]);

  return (
    <AppContext.Provider value={{ movie, isLoading, isError, query, setQuery }}>
      {children}
    </AppContext.Provider>
  );
};

const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider, useGlobalContext };





