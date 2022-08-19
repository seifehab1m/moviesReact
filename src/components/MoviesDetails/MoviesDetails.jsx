import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import MoviesDetailsStyle from './MoviesDetailsStyle.module.css'

export default function MoviesDetails() {

    let Params = useParams();
    const [movieDetails, setMovieDetails] = useState([])

    async function getMovieDetails(id) {
        let { data } = await axios.get(`https://api.themoviedb.org/3/movie/${id}?api_key=eba8b9a7199efdcb0ca1f96879b83c44&fbclid=IwAR3QVfI8v1sj1GfDCLUdeza5icWjOWeI70frYWBhztgZU1lLChJgvu7GAFM&language=en-US`)
        setMovieDetails(data)
    }

    useEffect(() => {
        getMovieDetails(Params.id)
    }, [])

    return (
        <>
        {console.log(movieDetails.id  )}
            {(movieDetails.id>0) ?
                <div className='container mt-5'>
                    <div className='row'>
                        <div className='col-md-3'>
                            <img style={{ cursor: "default" }} className='w-100' src={`https://image.tmdb.org/t/p/w500/${movieDetails.poster_path}`} />
                        </div>
                        <div className='col-md-9'>
                            <h2>{movieDetails.title}</h2>
                            <p className='text-muted py-3'> {movieDetails.overview}</p>
                            <ul >
                                <li><span>budget :</span>   {movieDetails.budget}</li>
                                <li> <span>vote :</span> {movieDetails.vote_average}</li>
                                <li> <span>popularity :</span> {movieDetails.popularity}</li>
                                <li> <span>vote count :</span> {movieDetails.vote_count}</li>
                            </ul>
                        </div>
                    </div>
                </div>

                :
                <div className='w-100 vh-100 d-flex justify-content-center align-items-center '>
                    <i className={`fa-solid fa-spinner fa-spin loading`}></i>
                </div>
            }
        </>
    )
}
