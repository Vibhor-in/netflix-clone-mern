import React from 'react'
import useMovieById from '../hooks/useMovieById';
import {useSelector} from "react-redux";

const VideoBackground = ({movieId,bool}) => {
    const trailerMovie = useSelector(store=>store.movie.trailerMovie);
    const heroTrailerMovie = useSelector(store=>store.movie.heroTrailerMovie);
    
    useMovieById(movieId, !bool); // isHero = true when bool is falsy (hero mode)

    if (bool) {
        // Dialog/PIP mode — uses trailerMovie state
        return (
            <div className="w-full overflow-hidden">
                <iframe
                    className="w-full aspect-video"
                    src={`https://www.youtube.com/embed/${trailerMovie?.key}?si=HorxQfzFY2_TAO1W&autoplay=1&mute=1`}
                    title="YouTube video player"
                    frameBorder="0"
                    allowFullScreen>
                </iframe>
            </div>
        )
    }

    // Hero/banner mode — uses heroTrailerMovie state (isolated from dialog)
    return (
        <div className="w-full h-[85vh] relative overflow-hidden">
            <iframe
                className="absolute top-1/2 left-1/2 w-[100vw] min-h-full min-w-full"
                style={{
                    transform: 'translate(-50%, -50%) scale(1.2)',
                    aspectRatio: '16 / 9',
                    pointerEvents: 'none',
                }}
                src={`https://www.youtube.com/embed/${heroTrailerMovie?.key}?si=HorxQfzFY2_TAO1W&autoplay=1&mute=1&controls=0&showinfo=0&rel=0&enablejsapi=1`}
                title="YouTube video player"
                frameBorder="0"
                allow="autoplay; encrypted-media"
                allowFullScreen>
            </iframe>
        </div>
    )
}

export default VideoBackground
