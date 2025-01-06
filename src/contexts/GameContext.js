import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import {
  GAME_WIN_MESSAGE,
  IS_CURRENT_SELECTED_LETTER_CORRECT_RESET_DURATION,
  WORD_REVEAL_MODAL_OPEN_DELAY,
} from "../utils/constants";
import { getFormattedDate } from "../utils/helpers";

const GameContext = createContext();

function GameProvider({ state, dispatch, children }) {
  const { status, conf, secondsRemaining, bonusTime, isGameOver } = state;

  const [formedWordArray, setFormedWordArray] = useState(function () {
    const [pre1, pre2] = conf.pre;
    const word = new Array(5).fill("");
    word[pre1] = conf.word[pre1].toUpperCase();
    word[pre2] = conf.word[pre2].toUpperCase();
    return word;
  });

  const [currentSelectedSlot, setCurrentSelectedSlot] = useState(null);
  const [isCurrentSelectedLetterCorrect, setIsCurrentSelectedLetterCorrect] =
    useState(null);
  const hintRef = useRef(false);

  const saveGameState = useCallback(
    function () {
      let saveStateToday = {
        state: state,
        formedWordArray,
      };

      let streak;

      if (state.isGameOver) {
        // Check if user won today
        const didUserWinToday = state.gameOverMessage === GAME_WIN_MESSAGE;

        // Get yesterdays date
        const today = new Date();
        const yesterday = new Date(today);
        yesterday.setDate(today.getDate() - 1);
        const yesterdaysDate = getFormattedDate(yesterday);

        // Check game status for yesterday
        const savedStateYesterday = localStorage.getItem(yesterdaysDate);
        if (savedStateYesterday) {
          const { activeStreak: activeStreakYesterday, state: stateYesterday } =
            JSON.parse(savedStateYesterday);
          const { gameOverMessage: gameOverMessageYesterday } = stateYesterday;

          const didUserWinYesterday =
            gameOverMessageYesterday === GAME_WIN_MESSAGE;

          if (!didUserWinToday) streak = 0;
          else streak = didUserWinYesterday ? activeStreakYesterday + 1 : 1;
        } else {
          streak = didUserWinToday ? 1 : 0;
        }

        saveStateToday = {
          ...saveStateToday,
          activeStreak: streak,
        };
      }

      const todaysDate = getFormattedDate(new Date());
      localStorage.setItem(todaysDate, JSON.stringify(saveStateToday));
    },
    [formedWordArray, state]
  );

  useEffect(
    function () {
      if (state.isGameOver) saveGameState();
    },
    [state.isGameOver, saveGameState]
  );

  useEffect(
    function () {
      window.addEventListener("beforeunload", saveGameState);
      return () => window.removeEventListener("beforeunload", saveGameState);
    },
    [saveGameState]
  );

  useEffect(
    function () {
      const todaysDate = getFormattedDate(new Date());
      const savedState = localStorage.getItem(todaysDate);
      if (savedState) {
        const { state, formedWordArray } = JSON.parse(savedState);
        dispatch({ type: "restoreGame", payload: state });
        setFormedWordArray(formedWordArray);
      }
    },
    [dispatch]
  );

  const correctWord = conf.word.toUpperCase();

  function handleCharacterSelection(char) {
    // Determine which slot the letter is to be added
    const ind =
      currentSelectedSlot == null
        ? formedWordArray.findIndex((ch) => ch === "")
        : currentSelectedSlot;

    // Add letter to the determined slot
    setFormedWordArray((word) =>
      word.map((ch, i) => {
        if (i === ind) return char;
        return ch;
      })
    );

    // Free up selection
    setCurrentSelectedSlot(null);

    // Determine if selected letter is correct and corresponding logic

    const isLetterSelectionCorrect = correctWord[ind] === char;

    const temp = [...formedWordArray];
    temp[ind] = char;
    if (temp.join("") === correctWord) {
      setTimeout(() => {
        dispatch({ type: "guessedWord" });
      }, WORD_REVEAL_MODAL_OPEN_DELAY);
      return;
    }

    setIsCurrentSelectedLetterCorrect(isLetterSelectionCorrect);
    if (isLetterSelectionCorrect) {
      dispatch({ type: "addBonusTime" });
      setTimeout(
        () => setIsCurrentSelectedLetterCorrect(null),
        IS_CURRENT_SELECTED_LETTER_CORRECT_RESET_DURATION
      );
    } else {
      setTimeout(() => {
        setFormedWordArray((word) =>
          word.map((ch, i) => {
            if (i === ind) return "";
            return ch;
          })
        );
        setIsCurrentSelectedLetterCorrect(null);
      }, IS_CURRENT_SELECTED_LETTER_CORRECT_RESET_DURATION);
    }
  }

  return (
    <GameContext.Provider
      value={{
        status,
        correctWord,
        formedWordArray,
        currentSelectedSlot: currentSelectedSlot,
        onSelectSlot: setCurrentSelectedSlot,
        onSelectCharacter: handleCharacterSelection,
        isCurrentSelectedLetterCorrect,
        dispatch,
        secondsRemaining,
        bonusTime,
        hintRef,
        isGameOver,
      }}
    >
      {children}
    </GameContext.Provider>
  );
}

function useGame() {
  const context = useContext(GameContext);
  if (context === undefined)
    throw new Error("GameContext was used outside of GameProvider!");
  return context;
}

export { GameProvider, useGame };
