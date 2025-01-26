// context < API > </>
// useContext hooks

// context(warehouse)
// Provider (delivery)
// consumer / (useContext())

import React, { useContext, useEffect} from "react";

const API_URL = `https://www.omdbapi.com/?apikey=9ad7f6e4&s=titanic`

const AppContext = React.createContext();


const AppProvider = ({ children }) => {

    const getMovies = async(url) => {
        try{
            const res = await fetch(url)
            const data = await res.json();
            console.log(data);
            
        } catch (error){
            console.log(error)
        }
    }


    useEffect(() => {
        getMovies(API_URL);
    },[])


    return <AppContext.Provider value={"sami"}>
        {children}
    </AppContext.Provider>
};


const useGlobalContext = () => {
    return useContext(AppContext);
};


export {AppContext, AppProvider, useGlobalContext}





// !!! -----------------------8.40-------------