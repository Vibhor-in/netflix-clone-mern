import axios from "axios";
import { options } from "../utils/constant";
import { useDispatch } from "react-redux";
import { getTrailerMovie, setHeroTrailerMovie } from "../redux/movieSlice";
import { useEffect } from "react";

const useMovieById = (movieId, isHero = false) => {
  const dispatch = useDispatch();

  useEffect(() => {
    if (!movieId) return;

    const getMovieById = async () => {
      try {
        const res = await axios.get(
          `https://api.themoviedb.org/3/movie/${movieId}/videos`,
          options,
        );

        const trailer = res?.data?.results?.filter(
          (item) => item.type === "Trailer",
        );

        const trailerData =
          trailer.length > 0 ? trailer[0] : res.data.results[0];

        if (isHero) {
          dispatch(setHeroTrailerMovie(trailerData));
        } else {
          dispatch(getTrailerMovie(trailerData));
        }
      } catch (error) {
        console.log(error);
      }
    };

    getMovieById();
  }, [movieId, dispatch, isHero]);
};

export default useMovieById;
