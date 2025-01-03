import Loader from "./Loader";
import Error from "./Error";
import Welcome from "./Welcome";
import { GameProvider } from "../contexts/GameContext";
import Progress from "./Progress";
import Word from "./Word";
import Keyboard from "./Keyboard";
import Modal from "./Modal";
import Instructions from "./Instructions";
import WordReveal from "./WordReveal";
import {
  BONUS_TIME,
  GAME_DURATION,
  GAME_LOST_MESSAGE,
  GAME_WIN_MESSAGE,
} from "../utils/constants";
import { useEffect, useReducer } from "react";
import { URL_GET_WORD } from "../utils/URLConstants";

const initialState = {
  status: "loading", // Possible values: "loading", "error", "loaded", "ready", "active", "over", "results"
  conf: {},
  secondsRemaining: GAME_DURATION,
  bonusTime: 0,
  isGameOver: false,
  gameOverMessage: "", // Possible values: "", GAME_WIN_MESSAGE, GAME_LOST_MESSAGE
};

function reducer(state, action) {
  switch (action.type) {
    case "dataReceived":
      return { ...state, status: "loaded", conf: action.payload };
    case "dataFailed":
      return { ...state, status: "error" };
    case "setupGame":
      return { ...state, status: "ready" };
    case "startGame":
      return { ...state, status: "active" };
    case "tick":
      if (state.isGameOver) return state;
      if (state.secondsRemaining === 0)
        return {
          ...state,
          isGameOver: true,
          status: "over",
          gameOverMessage: GAME_LOST_MESSAGE,
        };
      return {
        ...state,
        secondsRemaining: state.secondsRemaining - 1,
      };
    case "addBonusTime":
      const bonus =
        state.secondsRemaining > GAME_DURATION - BONUS_TIME &&
        state.secondsRemaining <= GAME_DURATION
          ? GAME_DURATION - state.secondsRemaining
          : BONUS_TIME;
      return {
        ...state,
        secondsRemaining: state.secondsRemaining + bonus,
        bonusTime: bonus,
      };
    case "guessedWord":
      return {
        ...state,
        isGameOver: true,
        status: "over",
        gameOverMessage: GAME_WIN_MESSAGE,
      };
    case "goBack":
      return {
        ...state,
        status: "results",
      };
    case "restoreGame":
      if (action.payload.status === "results") {
        return {
          ...action.payload,
          status: "over",
        };
      }
      return action.payload;
    default:
      throw new Error("Unknown action!");
  }
}

export default function Game() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { status, conf, gameOverMessage } = state;

  useEffect(function () {
    async function getTodaysWord() {
      try {
        const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
        const url = URL_GET_WORD + timezone;
        const res = await fetch(url);
        const data = await res.json();
        dispatch({ type: "dataReceived", payload: data.data });
      } catch (err) {
        dispatch({ type: "dataFailed" });
      }
    }
    getTodaysWord();
  }, []);

  return (
    <div className="h-full">
      {status === "loading" && <Loader />}
      {status === "error" && <Error />}
      {status === "loaded" && <Welcome dispatch={dispatch} />}
      {(status === "ready" ||
        status === "active" ||
        status === "over" ||
        status === "results") && (
        <>
          {status === "ready" && (
            <Modal isStart={true} dispatch={dispatch}>
              <Instructions />
            </Modal>
          )}
          <div className="h-full py-6 flex flex-col items-center">
            <h2 className="game-title tracking-wide">Fill5</h2>
            <div className="mobile:max-sm:w-full grow mt-8 px-2 flex flex-col justify-between">
              <GameProvider state={state} dispatch={dispatch}>
                <Progress />
                <Word />
                <Keyboard />
              </GameProvider>
            </div>
          </div>
          {status === "over" && (
            <Modal isStart={false} dispatch={dispatch}>
              <WordReveal gameOverMessage={gameOverMessage} conf={conf} />
            </Modal>
          )}
        </>
      )}
    </div>
  );
}
