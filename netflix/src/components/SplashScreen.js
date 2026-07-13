import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { setShowSplash } from '../redux/userSlice';
import { playNetflixSound } from '../utils/netflixSound';

const SplashScreen = () => {
    const dispatch = useDispatch();
    const [phase, setPhase] = useState('enter'); // 'enter' | 'glow' | 'exit'

    useEffect(() => {
        let isMounted = true;

        const runSplash = async () => {
            // Phase 1: Letter scales in (already triggered by 'enter' state)
            // Wait a tiny bit for the CSS transition to kick in
            await delay(100);
            if (!isMounted) return;
            setPhase('glow');

            // Play the ta-dum sound and wait for it to finish
            await playNetflixSound();

            // Phase 2: After sound ends, start exit animation
            if (!isMounted) return;
            setPhase('exit');

            // Wait for exit animation to complete
            await delay(800);

            // Navigate to browse content
            if (isMounted) {
                dispatch(setShowSplash(false));
            }
        };

        runSplash();

        return () => {
            isMounted = false;
        };
    }, [dispatch]);

    return (
        <div style={{
            position: 'fixed',
            inset: 0,
            zIndex: 9999,
            backgroundColor: '#000',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            opacity: phase === 'exit' ? 0 : 1,
            transition: 'opacity 0.7s ease-out',
        }}>
            {/* Ambient radial glow behind the letter */}
            <div style={{
                position: 'absolute',
                width: '400px',
                height: '400px',
                borderRadius: '50%',
                background: 'radial-gradient(circle, rgba(229,9,20,0.25) 0%, rgba(229,9,20,0) 70%)',
                opacity: phase === 'glow' ? 1 : 0,
                transform: phase === 'glow' ? 'scale(1)' : 'scale(0.3)',
                transition: 'opacity 1.2s ease-out, transform 1.5s ease-out',
            }} />

            {/* The "N" letter */}
            <div style={{
                fontSize: '180px',
                fontWeight: '900',
                fontFamily: "'Bebas Neue', 'Arial Black', Impact, sans-serif",
                color: '#e50914',
                textShadow: phase === 'glow'
                    ? '0 0 40px rgba(229,9,20,0.6), 0 0 80px rgba(229,9,20,0.3), 0 0 120px rgba(229,9,20,0.15)'
                    : '0 0 0px rgba(229,9,20,0)',
                transform: phase === 'enter'
                    ? 'scale(0.3)'
                    : phase === 'glow'
                        ? 'scale(1)'
                        : 'scale(1.15)',
                opacity: phase === 'enter' ? 0 : 1,
                transition: 'transform 0.9s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.6s ease-out, text-shadow 1.2s ease-out',
                userSelect: 'none',
                lineHeight: 1,
                letterSpacing: '4px',
                position: 'relative',
                zIndex: 1,
            }}>
                N
            </div>

            {/* Subtle horizontal light sweep */}
            <div style={{
                position: 'absolute',
                width: '300px',
                height: '2px',
                background: 'linear-gradient(90deg, transparent, rgba(229,9,20,0.5), transparent)',
                opacity: phase === 'glow' ? 1 : 0,
                transform: phase === 'glow' ? 'scaleX(1)' : 'scaleX(0)',
                transition: 'opacity 0.8s ease-out 0.5s, transform 0.8s ease-out 0.5s',
            }} />
        </div>
    );
};

function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

export default SplashScreen;
