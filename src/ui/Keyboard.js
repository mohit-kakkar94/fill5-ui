import { useGame } from "../contexts/GameContext";

export default function Keyboard() {
  const { onSelectCharacter, isCurrentSelectedLetterCorrect, isGameOver } =
    useGame();
  const keyboardKeys = [
    ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
    ["A", "S", "D", "F", "G", "H", "J", "K", "L"],
    ["Z", "X", "C", "V", "B", "N", "M"],
  ];
  return (
    <div className="flex justify-center items-center">
      <div className="max-w-screen-sm w-full px-2">
        {keyboardKeys.map((row, rowIndex) => (
          <div
            key={rowIndex}
            className="my-2 flex justify-center gap-1 sm:gap-2"
          >
            {row.map((char, charIndex) => (
              <button
                key={charIndex}
                className={`w-8 h-10 sm:w-10 sm:h-12 border rounded bg-zinc-100 shadow-sm`}
                onClick={() => onSelectCharacter(char)}
                disabled={
                  isGameOver || isCurrentSelectedLetterCorrect === false
                }
              >
                {char}
              </button>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
