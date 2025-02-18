import React from 'react'
import { useParams, Link } from 'react-router-dom'
import { API_URL } from './useFetch'
import { useState, useEffect } from 'react'
import './SingleMovie.css'

const SingleMovie = () => {
  const { id } = useParams()
  const [isLoading, setIsLoading] = useState(true)
  const [movie, setMovie] = useState(null)
  const [isError, setIsError] = useState({ show: false, msg: "" })

  const getMovie = async (url) => {
    try {
      const res = await fetch(url)
      const data = await res.json()
      
      if (data.Response === "True") {
        setIsLoading(false)
        setMovie(data)
        setIsError({ show: false, msg: "" })
      } else {
        setIsError({ show: true, msg: data.Error })
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getMovie(`${API_URL}&i=${id}`)
  }, [id])

  if (isLoading) {
    return <div className="loading">Loading...</div>
  }

  if (isError.show) {
    return <div className="error">{isError.msg}</div>
  }

  const {
    Title,
    Year,
    Poster,
    Plot,
    Director,
    Genre,
    imdbRating,
    Runtime,
    Actors
  } = movie

  return (
    <section className="movie-section">
      <Link to="/" className="back-btn">
        <span>←</span> Back to Home
      </Link>
      <div className="movie-card">
        <div className="movie-poster">
          <img src={Poster !== "N/A" ? Poster : "https://via.placeholder.com/400"} alt={Title} />
        </div>
        <div className="movie-info">
          <h2>{Title}</h2>
          <p className="plot">{Plot}</p>
          <div className="details">
            <p><span>Year:</span> {Year}</p>
            <p><span>Director:</span> {Director}</p>
            <p><span>Genre:</span> {Genre}</p>
            <p><span>Runtime:</span> {Runtime}</p>
            <p><span>Cast:</span> {Actors}</p>
            <p><span>IMDB Rating:</span> {imdbRating}/10</p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default SingleMovie