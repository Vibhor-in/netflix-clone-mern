import React, { useState, useCallback } from 'react';
import { CiPlay1, CiPause1 } from "react-icons/ci";
import { CiCircleInfo } from "react-icons/ci";
import { GoMute, GoUnmute } from "react-icons/go";
import { useDispatch } from 'react-redux';
import { setInfoOpen, setInfoMovie } from '../redux/movieSlice';

const VideoTitle = ({title, overview, movie}) => {
    const [isPlaying, setIsPlaying] = useState(true); // autoplay starts as playing
    const [isMuted, setIsMuted] = useState(true); // starts muted for autoplay
    const dispatch = useDispatch();

    const sendYouTubeCommand = useCallback((func) => {
        const iframe = document.querySelector('div.h-\\[85vh\\] iframe');
        if (iframe && iframe.contentWindow) {
            iframe.contentWindow.postMessage(
                JSON.stringify({ event: 'command', func, args: [] }),
                '*'
            );
        }
    }, []);

    const handlePlayPause = useCallback(() => {
        sendYouTubeCommand(isPlaying ? 'pauseVideo' : 'playVideo');
        setIsPlaying(!isPlaying);
    }, [isPlaying, sendYouTubeCommand]);

    const handleMuteToggle = useCallback(() => {
        sendYouTubeCommand(isMuted ? 'unMute' : 'mute');
        setIsMuted(!isMuted);
    }, [isMuted, sendYouTubeCommand]);

    const handleMoreInfo = () => {
        if (movie) {
            dispatch(setInfoMovie(movie));
            dispatch(setInfoOpen(true));
        }
    };

    return (
        <div className='w-full absolute z-10 text-white pt-[18%] p-12'>
            <h1 className='text-3xl font-bold'>{title}</h1>
            <p className='w-1/3 mt-4'>{overview}</p>
            <div className='flex items-center mt-8'>
                <button 
                    onClick={handlePlayPause}
                    className='flex items-center px-6 py-2 bg-white text-black rounded-md hover:bg-opacity-80 transition-all duration-200'
                >
                    {isPlaying ? <CiPause1 size="24px" /> : <CiPlay1 size="24px" />}
                    <span className='ml-1'>{isPlaying ? 'Pause' : 'Play'}</span>
                </button>
                <button 
                    onClick={handleMoreInfo}
                    className='flex mx-2 items-center px-6 py-2 bg-gray-500 bg-opacity-50 text-white rounded-md hover:bg-opacity-70 transition-all duration-200'
                >
                    <CiCircleInfo size="24px" />
                   <span className='ml-1'>More Info</span> 
                </button>

                {/* Mute/Unmute Button — Netflix style */}
                <button
                    onClick={handleMuteToggle}
                    className='ml-auto flex items-center justify-center w-10 h-10 rounded-full border-2 border-gray-400 bg-transparent hover:border-white transition-all duration-200'
                    title={isMuted ? 'Unmute' : 'Mute'}
                >
                    {isMuted 
                        ? <GoMute size="20px" color="white" /> 
                        : <GoUnmute size="20px" color="white" />
                    }
                </button>
            </div>
        </div>
    )
}

export default VideoTitle
