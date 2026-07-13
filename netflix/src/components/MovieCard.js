import React from 'react';
import { TMDB_IMG_URL } from '../utils/constant';
import { useDispatch, useSelector } from "react-redux";
import { getId, setOpen, setInfoOpen, setInfoMovie } from '../redux/movieSlice';
import { addToMyList, removeFromMyList, addToContinueWatching } from '../redux/myListSlice';
import { MdPlayArrow, MdAdd, MdCheck, MdInfoOutline } from 'react-icons/md';
import toast from 'react-hot-toast';

const MovieCard = ({ movie, posterPath, movieId }) => {
  const dispatch = useDispatch();
  const myList = useSelector(store => store.myList.myList);
  const isInList = myList.some(m => m.id === (movie?.id || movieId));

  if (posterPath === null && !movie?.poster_path) return null;

  const imgPath = posterPath || movie?.poster_path;
  const id = movieId || movie?.id;

  const handlePlay = (e) => {
    e.stopPropagation();
    dispatch(getId(id));
    dispatch(setOpen(true));
    if (movie) {
      dispatch(addToContinueWatching(movie));
    }
  };

  const handleToggleList = (e) => {
    e.stopPropagation();
    if (!movie) return;
    if (isInList) {
      dispatch(removeFromMyList(movie.id));
      toast('Removed from My List', {
        icon: '✕',
        style: { background: '#333', color: '#fff', fontSize: '14px' },
        duration: 2000,
      });
    } else {
      dispatch(addToMyList(movie));
      toast.success('Added to My List', {
        style: { background: '#333', color: '#fff', fontSize: '14px' },
        duration: 2000,
      });
    }
  };

  const handleMoreInfo = (e) => {
    e.stopPropagation();
    if (movie) {
      dispatch(setInfoMovie(movie));
      dispatch(setInfoOpen(true));
    }
  };

  return (
    <div className="w-48 pr-2 flex-shrink-0" style={{ paddingTop: '4px', paddingBottom: '4px' }}>
      <div className="movie-card-wrapper" onClick={handlePlay}>
        <img
          src={`${TMDB_IMG_URL}/${imgPath}`}
          alt={movie?.title || "movie-banner"}
          className="w-full block"
          loading="lazy"
        />
        {/* Hover overlay with actions */}
        <div className="movie-card-overlay">
          <p style={{
            color: '#fff',
            fontSize: '12px',
            fontWeight: '600',
            margin: '0 0 6px 0',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
          }}>
            {movie?.title || movie?.original_title || ''}
          </p>
          <div className="movie-card-actions">
            <button
              className="movie-card-action-btn"
              onClick={handlePlay}
              title="Play Trailer"
            >
              <MdPlayArrow size="18px" />
            </button>
            {movie && (
              <button
                className={`movie-card-action-btn ${isInList ? 'active' : ''}`}
                onClick={handleToggleList}
                title={isInList ? "Remove from My List" : "Add to My List"}
              >
                {isInList ? <MdCheck size="16px" /> : <MdAdd size="18px" />}
              </button>
            )}
            {movie && (
              <button
                className="movie-card-action-btn"
                onClick={handleMoreInfo}
                title="More Info"
              >
                <MdInfoOutline size="16px" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;