import { useEffect, useRef } from "react";
import { useGame } from "../contexts/GameContext";
import styles from "./Progress.module.css";
import { GAME_CLIMAX_TIME, GAME_DURATION } from "../utils/constants";

export default function Progress() {
  const {
    status,
    isCurrentSelectedLetterCorrect,
    dispatch,
    secondsRemaining,
    bonusTime,
    hintRef,
    isGameOver,
  } = useGame();
  const progressEl = useRef(null);
  const minutes = Math.floor(secondsRemaining / 60);
  const seconds = secondsRemaining % 60;

  useEffect(
    function () {
      if (status === "active") {
        const intervalId = setInterval(() => {
          dispatch({ type: "tick" });
        }, 1000);

        return () => clearInterval(intervalId);
      }
    },
    [dispatch, status]
  );

  useEffect(
    function () {
      const percentage = Math.floor((secondsRemaining / GAME_DURATION) * 100);

      // Retrieve the root element and CSS variables
      const rootStyles = getComputedStyle(document.documentElement);
      const climaxColor = rootStyles.getPropertyValue("--climax-color").trim();
      const successColor = rootStyles
        .getPropertyValue("--success-color")
        .trim();

      progressEl.current.style.width = `${percentage}%`;
      if (secondsRemaining <= GAME_CLIMAX_TIME) {
        progressEl.current.style.backgroundColor = climaxColor;
        if (!hintRef.current) hintRef.current = true;
      } else progressEl.current.style.backgroundColor = successColor;
    },
    [secondsRemaining, hintRef]
  );

  return (
    <div className="flex flex-col items-center">
      <div className="relative">
        <span>
          {`0${minutes}`}:{`${seconds < 10 ? "0" : ""}${seconds}`}
        </span>
        {!isGameOver && isCurrentSelectedLetterCorrect && bonusTime > 0 ? (
          <span className="absolute text-emerald-500 animate-riseFade">
            +{bonusTime}
          </span>
        ) : null}
      </div>
      <div className={styles.progressBar}>
        <div ref={progressEl} className={styles.progressValue}></div>
      </div>
    </div>
  );
}
