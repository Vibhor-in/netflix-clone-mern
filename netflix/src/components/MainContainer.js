import React from 'react'
import VideoTitle from './VideoTitle'
import VideoBackground from './VideoBackground';
import {useSelector} from "react-redux";

const MainContainer = () => {
  const movie = useSelector(store=>store.movie?.nowPlayingMovies);
  if(!movie) return; // early return in react
 
  const mainMovie = movie[0];
  const {overview, id, title} = mainMovie;
  
  return (
    <div>
        <VideoTitle title={title} overview={overview} movie={mainMovie}/>
        <VideoBackground movieId={id}/>
    </div>
  )
}

export default MainContainer