import React, { useState, useEffect } from 'react'

import axios from 'axios'
import { Link } from 'react-router-dom';


export default function Movies() {
  const [trendingMovies, settrendingMovies] = useState([])

  async function getTrending(pageNumber) {
    let { data } = await axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=eba8b9a7199efdcb0ca1f96879b83c44&fbclid=IwAR3QVfI8v1sj1GfDCLUdeza5icWjOWeI70frYWBhztgZU1lLChJgvu7GAFM&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${pageNumber}`)
    settrendingMovies(data.results)


  }

  useEffect(() => {
    getTrending(1)
  }, [])
  return (
    <>
      {(trendingMovies.length > 0) ?
        <div className='row  '>
          <div className="col-md-4 d-flex align-items-center justify-content-center">
            <div className="sec-heading">
              <h3>Trending <br /> Movies <br /> To Watch Now</h3>
              <p className='text-muted'>Most Watched Movies By Weeks</p>
            </div>
          </div>
          {trendingMovies.map((movie, i) => <div key={i} className='col-md-2'>
            <div className='movie'>
              <Link to={`/moviesDetails/${movie.id}`}>
                <img src={'https://image.tmdb.org/t/p/w500/' + movie.poster_path} className={"w-100"} alt='' />
                <h3 className='h6 text-center py-2' >{movie.title}</h3>
              </Link>
            </div>
          </div>
          )}
        </div>
        :
        <div className='w-100 vh-100 d-flex justify-content-center align-items-center '>
          <i className={`fa-solid fa-spinner fa-spin loading`}></i>
        </div>
      }
    </>
  )
}
