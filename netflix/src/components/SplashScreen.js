import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setShowSplash } from "../redux/userSlice";
import { playNetflixSound } from "../utils/netflixSound";

const SplashScreen = () => {
  const dispatch = useDispatch();
  const [phase, setPhase] = useState("enter");

  useEffect(() => {
    let mounted = true;

    const startSplash = async () => {
      // Initial delay
      await delay(200);

      if (!mounted) return;
      setPhase("glow");

      // Play intro sound
      await playNetflixSound();

      // Small pause after sound
      await delay(300);

      if (!mounted) return;
      setPhase("exit");

      // Exit animation
      await delay(700);

      if (mounted) {
        dispatch(setShowSplash(false));
      }
    };

    startSplash();

    return () => {
      mounted = false;
    };
  }, [dispatch]);

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        background: "#000",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        opacity: phase === "exit" ? 0 : 1,
        transition: "opacity 0.9s ease",
      }}
    >
      {/* Background Glow */}
      <div
        style={{
          position: "absolute",
          width: "600px",
          height: "600px",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(229,9,20,0.30) 0%, rgba(229,9,20,0.12) 35%, rgba(229,9,20,0) 75%)",
          opacity: phase === "glow" ? 1 : 0,
          transform: phase === "glow" ? "scale(1)" : "scale(0.5)",
          transition: "opacity 1.2s ease, transform 1.5s ease",
        }}
      />

      {/* Netflix N */}
      <div
        style={{
          fontSize: "260px",
          fontWeight: 900,
          fontFamily: "'Bebas Neue','Arial Black',Impact,sans-serif",
          color: "#E50914",
          lineHeight: 1,
          letterSpacing: "6px",
          userSelect: "none",
          position: "relative",
          zIndex: 2,

          opacity: phase === "enter" ? 0 : 1,

          transform:
            phase === "enter"
              ? "scale(0.2)"
              : phase === "glow"
                ? "scale(1)"
                : "scale(1.18)",

          textShadow:
            phase === "glow"
              ? `
                0 0 20px rgba(229,9,20,.9),
                0 0 45px rgba(229,9,20,.7),
                0 0 90px rgba(229,9,20,.45),
                0 0 150px rgba(229,9,20,.25)
              `
              : "none",

          transition:
            "transform 1s cubic-bezier(.16,1,.3,1), opacity .6s ease, text-shadow 1.3s ease",
        }}
      >
        N
      </div>

      {/* Light Sweep */}
      <div
        style={{
          position: "absolute",
          width: "420px",
          height: "3px",
          background:
            "linear-gradient(90deg, transparent, rgba(255,255,255,.85), transparent)",

          opacity: phase === "glow" ? 1 : 0,

          transform: phase === "glow" ? "scaleX(1)" : "scaleX(0)",

          transition: "opacity .8s ease .4s, transform .8s ease .4s",

          zIndex: 1,
        }}
      />
    </div>
  );
};

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export default SplashScreen;
