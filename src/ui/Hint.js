import { useMemo, useState } from "react";
import { IconContext } from "react-icons";
import { TbBulb } from "react-icons/tb";

import { useGame } from "../contexts/GameContext";

export default function Hint() {
  const { correctWord, hintRef, isGameOver } = useGame();
  const [showHint, setShowHint] = useState(false);

  function handleShowHint() {
    if (isGameOver || !hintRef.current) return;
    setShowHint(true);
  }

  const shuffledWordArray = useMemo(() => {
    // Compute shuffled array
    const shuffleArray = Array.from(correctWord);
    let shuffledWordString = shuffleArray.join("");

    // Shuffle word
    while (correctWord === shuffledWordString) {
      for (let i = 0; i < shuffleArray.length; ++i) {
        const randomInd = Math.floor(Math.random() * shuffleArray.length);
        [shuffleArray[i], shuffleArray[randomInd]] = [
          shuffleArray[randomInd],
          shuffleArray[i],
        ];
      }
      shuffledWordString = shuffleArray.join("");
    }

    return shuffleArray;
  }, [correctWord]);

  return (
    <div>
      <div className="flex items-center justify-end pr-10">
        {showHint && (
          <div>
            {shuffledWordArray.map((ch, i) => (
              <button
                key={i}
                className={`w-6 h-6 bg-red-300 text-white border rounded shadow-sm`}
              >
                {shuffledWordArray[i]}
              </button>
            ))}
          </div>
        )}
        <IconContext.Provider
          value={{
            color: `${!isGameOver && hintRef.current ? "green" : "grey"}`,
          }}
        >
          <span onClick={() => handleShowHint()}>
            <TbBulb />
          </span>
        </IconContext.Provider>
      </div>
    </div>
  );
}
