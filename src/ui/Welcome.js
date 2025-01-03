export default function Welcome({ dispatch }) {
  return (
    <div className="bg-zinc-100 h-full flex flex-col justify-center items-center">
      <h1 className="game-title tracking-normal">Fill5</h1>
      <h4>Can you keep the streak alive?</h4>
      <button
        className="bg-zinc-950 text-white rounded-full w-36 sm:w-48 px-6 py-2 mt-5"
        onClick={() => dispatch({ type: "setupGame" })}
      >
        Play
      </button>
    </div>
  );
}
