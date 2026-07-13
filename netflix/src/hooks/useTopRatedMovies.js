import axios from "axios";
import { getTopRatedMovie } from "../redux/movieSlice";
import { Top_Rated_Movie, options } from "../utils/constant";
import { useDispatch } from "react-redux";
import { useEffect } from "react";

const useTopRatedMovies = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        const fetchTopRatedMovies = async () => {
            try {
                const res = await axios.get(Top_Rated_Movie, options);
                dispatch(getTopRatedMovie(res.data.results));
            } catch (error) {
                console.log(error);
            }
        };
        fetchTopRatedMovies();
    }, [dispatch]);
};
export default useTopRatedMovies;