import React, { useState, useEffect } from 'react'
import axios from 'axios'
import homeStyle from './HomeStyle.module.css'
import { Link } from 'react-router-dom';


export default function Home() {
  const [trendingMovies, settrendingMovies] = useState([])
  const [trendingTv, settrendingTv] = useState([])
  const [trendingPeople, settrendingPeople] = useState([])



  async function getTrending(mediaType, callback) {
    let { data } = await axios.get(`https://api.themoviedb.org/3/trending/${mediaType}/week?api_key=eba8b9a7199efdcb0ca1f96879b83c44&fbclid=IwAR3QVfI8v1sj1GfDCLUdeza5icWjOWeI70frYWBhztgZU1lLChJgvu7GAFM`)
    callback(data.results.slice(0, 10))


  }

  useEffect(() => {
    getTrending("movie", settrendingMovies)
    getTrending("tv", settrendingTv)
    getTrending("person", settrendingPeople)
  }, [])
  return (
    <>
        {console.log(trendingMovies.length)}

      {(trendingMovies.length > 0) ?
        <div className='container'>
          <div className='row'>
            <div className='col-md-4 d-flex justify-content-center align-items-center position-relative'>
              <h2 className='fw-bold'>treanding Movies <br /> To watch Right Now</h2>
            </div >

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
          <div className='row py-5'>
            <div className='col-md-4 d-flex justify-content-center align-items-center position-relative'>
              <h2 className='fw-bold'>treanding Tv <br /> To watch Right Now</h2>
            </div >
            {trendingTv.map((tv, i) => <div key={i} className='col-md-2'>
              <div className='tv'>
                <img src={'https://image.tmdb.org/t/p/w500/' + tv.poster_path} className={"w-100"} alt='' />
                <h3 className='h6 text-center py-2' >{tv.name}</h3>
              </div>
            </div>
            )}
          </div>
          <div className='row py-5'>
            <div className='col-md-4 d-flex justify-content-center align-items-center position-relative'>
              <h2 className='fw-bold'>treanding People <br /> To watch Right Now</h2>
            </div >
            {trendingPeople.map((person, i) => <div key={i} className='col-md-2'>
              <div className='person'>
                {person.profile_path === null ?
                  <img src='./../../avatar.png' className={`w-100  ${homeStyle.avatarImg} `} /> :
                  <img src={'https://image.tmdb.org/t/p/w500/' + person.profile_path} className={"w-100"} alt='' />
                }
                <h3 className='h6 text-center py-2' >{person.name}</h3>
              </div>
            </div>
            )}
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
