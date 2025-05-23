// Keep all imports same
import React, { useState, useRef, useEffect } from "react";
import confetti from "canvas-confetti";

const colors = ["red", "black", "pink", "orange"];

export default function App() {
  const [prediction, setPrediction] = useState("");
  const [winner, setWinner] = useState("");
  const [result, setResult] = useState("");
  const [racing, setRacing] = useState(false);
  const [raceDurations, setRaceDurations] = useState({});
  const [positions, setPositions] = useState({});
  const finishedRef = useRef([]);

  useEffect(() => {
    if (!racing && winner) {
      setTimeout(() => {
        setPositions(colors.reduce((acc, color) => {
          acc[color] = 0;
          return acc;
        }, {}));
      }, 300);
    }
  }, [racing, winner]);

  const handleRace = () => {
    if (!prediction) return;
    setWinner("");
    setResult("");
    setRacing(false);
    finishedRef.current = [];

    const resetPositions = {};
    colors.forEach((color) => (resetPositions[color] = 0));
    setPositions(resetPositions);

    setTimeout(() => {
      setRacing(true);
      const durations = {};
      const newPositions = {};
      colors.forEach((color) => {
        durations[color] = Math.floor(Math.random() * 2000) + 2000;
        newPositions[color] = 90;
      });
      setRaceDurations(durations);
      setPositions(newPositions);
    }, 500);
  };

  const handleTortoiseFinish = (color) => {
    if (!finishedRef.current.includes(color)) {
      finishedRef.current.push(color);
    }
    if (finishedRef.current.length === 1) {
      setWinner(color);
      if (prediction === color) {
        confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
        setResult("🎉 You win the game!");
      } else {
        setResult("😔 Better luck next time.");
      }
      setRacing(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-indigo-800 flex flex-col items-center pt-20 px-4 lg:px-12 pb-10 text-white relative overflow-hidden">
      <h1 className="text-3xl md:text-6xl font-extrabold drop-shadow-xl text-center mb-2">🐢 Epic Tortoise Race</h1>
      <p className="text-md md:text-xl text-white font-medium mb-6 text-center">Choose your champion and cheer them to victory!</p>

      <div className="flex flex-wrap gap-4 justify-center mb-6">
        {colors.map((color) => (
          <button
            key={color}
            onClick={() => setPrediction(color)}
            disabled={racing}
            className={`px-5 py-2 md:px-6 md:py-2.5 rounded-full shadow-xl font-bold text-sm md:text-lg transition transform hover:scale-110 duration-300 ${prediction === color ? "ring-4 ring-offset-2 ring-black" : ""}`}
            style={{ backgroundColor: color, color: "#fff" }}
          >
            {color.toUpperCase()}
          </button>
        ))}
      </div>

      <button
        onClick={handleRace}
        disabled={!prediction || racing}
        className="mb-6 px-8 md:px-10 py-3 md:py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-full text-lg md:text-xl shadow-lg hover:scale-105 transition disabled:opacity-50"
      >
        {racing ? "🏁 Racing..." : "🚀 Start Race"}
      </button>

      <div className="w-full max-w-4xl space-y-6">
        {colors.map((color) => (
          <div key={color} className="relative h-20 md:h-24 bg-white rounded-full overflow-hidden border-4 border-indigo-200 shadow-md">
            <div className="absolute left-2 top-1/2 -translate-y-1/2 text-xl md:text-2xl">🎉</div>
            <div
              className="absolute h-full w-12 md:w-16 rounded-full flex items-center justify-center text-white text-xl md:text-2xl font-bold animate-bounce-slow"
              style={{
                backgroundColor: color,
                left: `${positions[color]}%`,
                transition: `left ${raceDurations[color] || 0}ms ease-out`,
              }}
              onTransitionEnd={() => {
                if (positions[color] === 90) handleTortoiseFinish(color);
              }}
            >
              🐢
            </div>
            <div className="absolute right-4 top-1/2 -translate-y-1/2 text-2xl md:text-3xl">🏁</div>
          </div>
        ))}
      </div>

      {winner && (
        <div className="mt-10 text-center space-y-3">
          <h2 className="text-2xl md:text-3xl font-bold tracking-wide">
            Winner:{" "}
            <span style={{ color: winner }} className="capitalize underline">
              {winner}
            </span>
          </h2>
          <p className={`text-lg md:text-2xl font-semibold ${result.includes("win") ? "text-green-400" : "text-red-400"}`}>
            {result}
          </p>
        </div>
      )}

      <style>
        {`
          @keyframes bounce-slow {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-5px); }
          }
          .animate-bounce-slow {
            animation: bounce-slow 1.5s infinite;
          }
        `}
      </style>
    </div>
  );
}
