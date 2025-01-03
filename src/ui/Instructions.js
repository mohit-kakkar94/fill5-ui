import { TbBulb } from "react-icons/tb";
import { GAME_CLIMAX_TIME } from "../utils/constants";

export default function Instructions() {
  return (
    <div className="flex flex-col gap-10">
      <h3 className="text-center font-semibold">How To Play</h3>
      <ul className="list-disc">
        <li>Guess the 5-letter word within 2 minutes.</li>
        <li>Two letters are pre-filled to help you start.</li>
        <li>
          Tap a blank box to select it, or simply pick a letter to fill the
          first empty slot.
        </li>
        <li>
          <p>
            Correct letter: Turns{" "}
            <span className="text-emerald-500">green</span>
          </p>
          <p>
            Incorrect letter: Turns <span className="text-zinc-500">grey</span>{" "}
            and gets removed.
          </p>
        </li>
        <li>
          In the last {GAME_CLIMAX_TIME} seconds, the hint icon{" "}
          <span>
            (<TbBulb />)
          </span>{" "}
          gets enabled. Tap it to see a hint!
        </li>
      </ul>
    </div>
  );
}
