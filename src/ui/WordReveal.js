import { useEffect, useState } from "react";
import { getFormattedDate } from "../utils/helpers";

export default function WordReveal({ gameOverMessage, conf }) {
  const [currentStreak, setCurrentStreak] = useState(0);

  useEffect(function () {
    const todaysDate = getFormattedDate(new Date());
    const savedState = localStorage.getItem(todaysDate);
    if (savedState) {
      const { activeStreak } = JSON.parse(savedState);
      setCurrentStreak(activeStreak);
    }
  }, []);

  const { word: wordOfTheDay } = conf;
  return (
    <div className="flex flex-col gap-10">
      <h3 className="text-center">{gameOverMessage}</h3>
      <div className="flex flex-col gap-10">
        <h4 className="italic">
          Word of the day -{" "}
          <span className="font-semibold">{wordOfTheDay}</span>
        </h4>
        <div>
          <p className="mb-2">
            Active streak:{" "}
            <span className="font-semibold">
              {currentStreak} {currentStreak > 1 ? "days" : "day"}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}
