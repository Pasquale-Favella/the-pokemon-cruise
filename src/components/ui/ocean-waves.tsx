"use client";
// src/components/ui/ocean-waves.tsx
import React from 'react';

const OceanWaves = () => {
  return (
    <>
      <div className="absolute bottom-0 left-0 w-full h-[60px] sm:h-[80px] md:h-[120px] lg:h-[150px] overflow-hidden z-0 pointer-events-none">
        <svg
          className="absolute bottom-0 left-0 w-full h-full"
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
          viewBox="0 24 150 28"
          preserveAspectRatio="none"
          shapeRendering="auto"
        >
          <defs>
            <path
              id="gentle-wave"
              d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z"
            />
          </defs>
          <g>
            <use href="#gentle-wave" x="48" y="0" fill="rgba(255,255,255,0.2)" className="wave-animation-1" />
            <use href="#gentle-wave" x="48" y="3" fill="rgba(255,255,255,0.35)" className="wave-animation-2" />
            <use href="#gentle-wave" x="48" y="5" fill="rgba(255,255,255,0.5)" className="wave-animation-3" />
            <use href="#gentle-wave" x="48" y="7" fill="rgba(255,255,255,0.7)" className="wave-animation-4" />
          </g>
        </svg>
      </div>
      <style jsx>{`
        @keyframes move-forever {
          0% {
            transform: translate3d(-90px, 0, 0);
          }
          100% {
            transform: translate3d(85px, 0, 0);
          }
        }
        .wave-animation-1 {
          animation: move-forever 25s cubic-bezier(0.55, 0.5, 0.45, 0.5) infinite;
        }
        .wave-animation-2 {
          animation: move-forever 18s cubic-bezier(0.55, 0.5, 0.45, 0.5) infinite;
          animation-delay: -5s;
        }
        .wave-animation-3 {
          animation: move-forever 15s cubic-bezier(0.55, 0.5, 0.45, 0.5) infinite;
          animation-delay: -3s;
        }
        .wave-animation-4 {
          animation: move-forever 12s cubic-bezier(0.55, 0.5, 0.45, 0.5) infinite;
          animation-delay: -1s;
        }
      `}</style>
    </>
  );
};

export default OceanWaves;

