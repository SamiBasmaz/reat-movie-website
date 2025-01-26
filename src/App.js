import React from 'react';
import Home from './Home';
import SingleMovie from './SingleMovie'
import Error from './Error';
import { Routes, Route } from "react-router-dom"
import "./App.css";

const App = () => {
  return (
  <>
    
      <Routes>
        <Route path='/' element={<Home/>} > </Route>
        <Route path='movie/:id' element={<SingleMovie></SingleMovie>} />
        <Route path='*' element={<Error></Error>} />
      </Routes>
    
  </>
  
  )
}

export default App



