import { useEffect, useState } from "react";

export default function Loader() {
  const [numDots, setNumDots] = useState(1);

  useEffect(function () {
    const intervalId = setInterval(() => {
      setNumDots((n) => {
        if (n < 3) return n + 1;
        else return 1;
      });
    }, 400);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="bg-zinc-100 h-full flex flex-col justify-center items-center">
      Loading{numDots === 1 && "."}
      {numDots === 2 && ".."}
      {numDots === 3 && "..."}
    </div>
  );
}
