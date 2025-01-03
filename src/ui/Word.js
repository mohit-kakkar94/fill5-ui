import { useGame } from "../contexts/GameContext";
import Hint from "./Hint";

export default function Word() {
  const {
    correctWord,
    formedWordArray,
    currentSelectedSlot,
    onSelectSlot,
    isCurrentSelectedLetterCorrect,
    isGameOver,
  } = useGame();
  return (
    <div className="flex flex-col gap-10">
      <div className="flex justify-center gap-2">
        {Array.from({ length: 5 }, (_, i) => i).map((pl, i) => (
          <button
            key={i}
            className={`w-10 h-10 text-white border rounded shadow-md ${
              i === currentSelectedSlot ? "border-2 border-zinc-400" : ""
            } ${
              formedWordArray[i] === ""
                ? ""
                : formedWordArray[i] === correctWord[i]
                ? "bg-emerald-500"
                : "bg-zinc-500 animate-fadeOut"
            }`}
            disabled={
              isGameOver ||
              isCurrentSelectedLetterCorrect === false ||
              formedWordArray[i] === correctWord[i]
            }
            onClick={() => onSelectSlot(i)}
          >
            {formedWordArray[i]}
          </button>
        ))}
      </div>
      <Hint />
    </div>
  );
}
