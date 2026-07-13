import React from 'react'
import MovieCard from './MovieCard'

const MovieList = ({ title, movies, searchMovie=false }) => {

    return (
        <div className='px-8' style={{ marginBottom: '-40px' }}>
            <h1 className={`${searchMovie ? "text-black" : "text-white"} text-3xl py-3 `}>{title}</h1>
            <div className='flex overflow-x-auto no-scrollbar cursor-pointer' style={{ marginTop: '-20px', marginBottom: '-20px' }}>
                <div className='flex items-center' style={{ paddingTop: '40px', paddingBottom: '60px' }}>
                    {
                       movies?.map((movie) => { 
                            
                            return (
                                <MovieCard key={movie.id} movie={movie} movieId={movie.id} posterPath={movie.poster_path} />
                            )
                        })
                    }


                </div>
            </div>
        </div>
    )
}

export default MovieList
