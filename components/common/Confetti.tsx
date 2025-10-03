import React, { useEffect, useState } from 'react';

export const Confetti: React.FC = () => {
  // Fix: Replaced `JSX.Element` with `React.ReactElement` to resolve the 'Cannot find namespace JSX' error.
  const [pieces, setPieces] = useState<React.ReactElement[]>([]);

  useEffect(() => {
    const generateConfetti = () => {
      const newPieces = Array.from({ length: 50 }).map((_, i) => {
        const style: React.CSSProperties = {
          left: `${Math.random() * 100}%`,
          animationDuration: `${Math.random() * 3 + 2}s`,
          animationDelay: `${Math.random() * 2}s`,
          backgroundColor: `hsl(${Math.random() * 360}, 70%, 50%)`,
          transform: `rotate(${Math.random() * 360}deg)`,
        };
        return <div key={i} className="confetti-piece" style={style}></div>;
      });
      setPieces(newPieces);
    };

    generateConfetti();

    const styleSheet = document.createElement("style");
    styleSheet.innerText = `
      .confetti-container {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        overflow: hidden;
        pointer-events: none;
        z-index: 9999;
      }
      .confetti-piece {
        position: absolute;
        width: 8px;
        height: 16px;
        opacity: 0;
        animation-name: fall;
        animation-timing-function: linear;
        animation-iteration-count: infinite;
      }
      @keyframes fall {
        0% { transform: translateY(-10vh) rotate(0deg); opacity: 1; }
        100% { transform: translateY(110vh) rotate(720deg); opacity: 0; }
      }
    `;
    document.head.appendChild(styleSheet);

    return () => {
      document.head.removeChild(styleSheet);
    };
  }, []);

  return <div className="confetti-container">{pieces}</div>;
};
