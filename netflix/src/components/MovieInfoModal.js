import React, { forwardRef } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import IconButton from '@mui/material/IconButton';
import Slide from '@mui/material/Slide';
import { MdClose, MdPlayArrow, MdStar, MdCalendarMonth, MdAdd, MdCheck } from 'react-icons/md';
import { useSelector, useDispatch } from 'react-redux';
import { setInfoOpen, setInfoMovie, setOpen, getId } from '../redux/movieSlice';
import { addToMyList, removeFromMyList, addToContinueWatching } from '../redux/myListSlice';
import { TMDB_IMG_URL } from '../utils/constant';
import toast from 'react-hot-toast';

// Slide-up transition for the dialog
const SlideTransition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function MovieInfoModal() {
  const { infoOpen, infoMovie } = useSelector(store => store.movie);
  const myList = useSelector(store => store.myList.myList);
  const dispatch = useDispatch();

  const isInList = infoMovie ? myList.some(m => m.id === infoMovie.id) : false;

  const handleClose = () => {
    dispatch(setInfoOpen(false));
    dispatch(setInfoMovie(null));
  };

  const handleWatchTrailer = () => {
    if (infoMovie?.id) {
      dispatch(getId(infoMovie.id));
      dispatch(setOpen(true));
      dispatch(addToContinueWatching(infoMovie));
      handleClose();
    }
  };

  const handleToggleList = () => {
    if (!infoMovie) return;
    if (isInList) {
      dispatch(removeFromMyList(infoMovie.id));
      toast('Removed from My List', {
        icon: '✕',
        style: { background: '#333', color: '#fff', fontSize: '14px' },
        duration: 2000,
      });
    } else {
      dispatch(addToMyList(infoMovie));
      toast.success('Added to My List', {
        style: { background: '#333', color: '#fff', fontSize: '14px' },
        duration: 2000,
      });
    }
  };

  if (!infoMovie) return null;

  const rating = infoMovie.vote_average ? infoMovie.vote_average.toFixed(1) : 'N/A';
  const releaseYear = infoMovie.release_date ? new Date(infoMovie.release_date).getFullYear() : '';
  const releaseDate = infoMovie.release_date || 'N/A';

  return (
    <Dialog
      open={infoOpen}
      onClose={handleClose}
      maxWidth="sm"
      fullWidth
      TransitionComponent={SlideTransition}
      PaperProps={{
        sx: {
          backgroundColor: '#181818',
          borderRadius: '8px',
          overflow: 'hidden',
          boxShadow: '0 8px 40px rgba(0,0,0,0.8)',
        }
      }}
    >
      <DialogContent sx={{ padding: 0 }}>
        {/* Hero Image with Gradient Overlay */}
        <div style={{ position: 'relative', width: '100%' }}>
          {infoMovie.backdrop_path ? (
            <img
              src={`https://image.tmdb.org/t/p/w780${infoMovie.backdrop_path}`}
              alt={infoMovie.title}
              style={{
                width: '100%',
                height: '320px',
                objectFit: 'cover',
                display: 'block',
              }}
            />
          ) : infoMovie.poster_path ? (
            <img
              src={`${TMDB_IMG_URL}${infoMovie.poster_path}`}
              alt={infoMovie.title}
              style={{
                width: '100%',
                height: '320px',
                objectFit: 'cover',
                display: 'block',
              }}
            />
          ) : (
            <div style={{
              width: '100%',
              height: '320px',
              background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              <span style={{ color: '#555', fontSize: '18px' }}>No Image Available</span>
            </div>
          )}

          {/* Gradient overlay at bottom */}
          <div style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: '160px',
            background: 'linear-gradient(transparent, #181818)',
          }} />

          {/* Close button */}
          <IconButton
            onClick={handleClose}
            sx={{
              position: 'absolute',
              top: 8,
              right: 8,
              backgroundColor: '#181818',
              color: '#fff',
              '&:hover': { backgroundColor: '#333' },
              width: 36,
              height: 36,
            }}
          >
            <MdClose size="20px" />
          </IconButton>

          {/* Title and buttons overlay */}
          <div style={{
            position: 'absolute',
            bottom: '16px',
            left: '24px',
            right: '24px',
          }}>
            <h2 style={{
              color: '#fff',
              fontSize: '28px',
              fontWeight: 'bold',
              margin: '0 0 12px 0',
              textShadow: '0 2px 8px rgba(0,0,0,0.6)',
            }}>
              {infoMovie.title || infoMovie.original_title}
            </h2>
            {/* Action buttons on image */}
            <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
              <button
                onClick={handleWatchTrailer}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '8px 20px',
                  backgroundColor: '#fff',
                  color: '#000',
                  border: 'none',
                  borderRadius: '4px',
                  fontSize: '14px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  transition: 'background-color 0.2s',
                }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.8)'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#fff'}
              >
                <MdPlayArrow size="22px" />
                Play
              </button>
              <button
                onClick={handleToggleList}
                style={{
                  width: '38px',
                  height: '38px',
                  borderRadius: '50%',
                  border: '2px solid rgba(255,255,255,0.5)',
                  background: 'rgba(20,20,20,0.6)',
                  color: isInList ? '#46d369' : '#fff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                  borderColor: isInList ? '#46d369' : 'rgba(255,255,255,0.5)',
                  padding: 0,
                }}
                title={isInList ? 'Remove from My List' : 'Add to My List'}
                onMouseEnter={(e) => e.currentTarget.style.borderColor = isInList ? '#46d369' : '#fff'}
                onMouseLeave={(e) => e.currentTarget.style.borderColor = isInList ? '#46d369' : 'rgba(255,255,255,0.5)'}
              >
                {isInList ? <MdCheck size="22px" /> : <MdAdd size="22px" />}
              </button>
            </div>
          </div>
        </div>

        {/* Content Area */}
        <div style={{ padding: '16px 24px 24px' }}>
          {/* Meta Info Row */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '16px',
            marginBottom: '16px',
            flexWrap: 'wrap',
          }}>
            {/* Rating */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
            }}>
              <MdStar size="18px" color="#f5c518" />
              <span style={{ color: '#f5c518', fontWeight: '600', fontSize: '15px' }}>
                {rating}
              </span>
              <span style={{ color: '#888', fontSize: '13px' }}>/10</span>
            </div>

            {/* Release Year */}
            {releaseYear && (
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
              }}>
                <MdCalendarMonth size="16px" color="#aaa" />
                <span style={{ color: '#aaa', fontSize: '14px' }}>{releaseYear}</span>
              </div>
            )}

            {/* Language badge */}
            {infoMovie.original_language && (
              <span style={{
                backgroundColor: '#333',
                color: '#ccc',
                padding: '2px 8px',
                borderRadius: '4px',
                fontSize: '12px',
                fontWeight: '600',
                textTransform: 'uppercase',
              }}>
                {infoMovie.original_language}
              </span>
            )}

            {/* Popularity indicator */}
            {infoMovie.vote_average >= 7 && (
              <span style={{
                backgroundColor: 'rgba(70, 211, 105, 0.15)',
                color: '#46d369',
                padding: '2px 10px',
                borderRadius: '4px',
                fontSize: '12px',
                fontWeight: '600',
              }}>
                Highly Rated
              </span>
            )}
          </div>

          {/* Release Date */}
          <p style={{ color: '#888', fontSize: '13px', margin: '0 0 12px 0' }}>
            Release Date: {releaseDate}
          </p>

          {/* Overview */}
          <p style={{
            color: '#d2d2d2',
            fontSize: '14px',
            lineHeight: '1.6',
            margin: '0 0 0 0',
          }}>
            {infoMovie.overview || 'No overview available for this title.'}
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
