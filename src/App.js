import { Analytics } from "@vercel/analytics/react";
import Game from "./ui/Game";

function App() {
  return (
    <div className="h-full">
      <Game />
      <Analytics />
    </div>
  );
}

export default App;
