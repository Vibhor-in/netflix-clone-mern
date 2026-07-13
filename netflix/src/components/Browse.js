import React, { useEffect } from 'react'
import Header from './Header';
import { useSelector} from "react-redux";
import { useNavigate } from "react-router-dom";
import MainContainer from './MainContainer';
import MovieContainer from './MovieContainer';
import useNowPlayingMovies from '../hooks/useNowPlayingMovies';
import usePopularMovies from '../hooks/usePopularMovies';
import useTopRatedMovies from '../hooks/useTopRatedMovies';
import useUpcomingMovies from '../hooks/useUpcomingMovies';
import SearchMovie from './SearchMovie';
import SplashScreen from './SplashScreen';

const Browse = () => {
    const user = useSelector(store => store.app.user);
    const showSplash = useSelector(store => store.app.showSplash);
    const toggle = useSelector(store => store.movie.toggle);
    const navigate = useNavigate();

    // my custom hooks
    useNowPlayingMovies();
    usePopularMovies();
    useTopRatedMovies();
    useUpcomingMovies();

    useEffect(() => {
        if (!user) {
            navigate("/");
        }
    }, [user, navigate]);
    return (
        <div >
            {showSplash && <SplashScreen />}
            <Header />
            <div>
                {
                    toggle ? <SearchMovie /> : (
                        <>
                            <MainContainer />
                            <MovieContainer />
                        </>

                    )
                }

            </div>
        </div>
    )
}

export default Browse