import axios from "axios";
import { getNowPlayingMovies } from "../redux/movieSlice";
import { Now_Playing_Movie, options } from "../utils/constant";
import { useDispatch } from "react-redux";
import { useEffect } from "react";

const useNowPlayingMovies = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        const fetchNowPlayingMovies = async () => {
            try {
                const res = await axios.get(Now_Playing_Movie, options);
                dispatch(getNowPlayingMovies(res.data.results));
            } catch (error) {
                console.log(error);
            }
        };
        fetchNowPlayingMovies();
    }, [dispatch]);
};
export default useNowPlayingMovies;