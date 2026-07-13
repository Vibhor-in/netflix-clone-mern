import React from 'react'
import MovieList from './MovieList';
import {useSelector} from "react-redux";
import SkeletonRow from './SkeletonLoader';

const MovieContainer = () => {
  const movie = useSelector(store=>store.movie);
  const { myList, continueWatching } = useSelector(store=>store.myList);

  const isLoading = !movie.popularMovie && !movie.nowPlayingMovies && !movie.topRatedMovies && !movie.upcomingMovies;
  
  return (
    <div className='bg-black'>
      <div className='-mt-52 relative z-10' >
        {isLoading ? (
          <>
            <SkeletonRow />
            <SkeletonRow />
            <SkeletonRow />
            <SkeletonRow />
          </>
        ) : (
          <>
            {continueWatching.length > 0 && (
              <MovieList title={"Continue Watching"} movies={continueWatching}/>
            )}
            {myList.length > 0 && (
              <MovieList title={"My List"} movies={myList}/>
            )}
            <MovieList title={"Popular Movies"} movies={movie.popularMovie}/>
            <MovieList title={"Now Playing Movies"} movies={movie.nowPlayingMovies}/>
            <MovieList title={"Top Rated Movies"} movies={movie.topRatedMovies}/>
            <MovieList title={"Upcoming Movies"} movies={movie.upcomingMovies}/>
          </>
        )}
      </div>
    </div>
  )
}

export default MovieContainer