// context < API > </>
// useContext hooks

// context(warehouse)
// Provider (delivery)
// consumer / (useContext())

import React, { use, useContext, useEffect, useState} from "react";

const API_URL = `https://www.omdbapi.com/?apikey=${process.env.REACT_APP_API_KEY}`

const AppContext = React.createContext();


const AppProvider = ({ children }) => {

    const [isLoading, setIsLoading] = useState(true)
    const [movie, setMovie] = useState([])
    const [isError, setIsError] = useState({show: "false", msg: ""});
    const [query, setQuery] = useState("");

    const getMovies = async(url) => {
        try{
            const res = await fetch(url)
            const data = await res.json();
            console.log(data);
            if(data.Response === "True"){
                setIsLoading(false)
                if(data.Search.length===0)setMovie([])
                else setMovie(data.Search);
            }else {
                setIsError({
                    show: true,
                    msg: data.error,
                })
            }
            
        } catch (error){
            console.log(error)
        }
    }


    useEffect(() => {
        getMovies(`${API_URL}&s=${query}`);
    },[query])


    return (
    <AppContext.Provider value={{ movie, isLoading, isError, query, setQuery}}>
        {children}
    </AppContext.Provider>
    );
};


const useGlobalContext = () => {
    return useContext(AppContext);
};


export {AppContext, AppProvider, useGlobalContext}





