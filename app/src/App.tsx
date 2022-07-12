import React from "react";
import { Game } from "./components/game/game";
import "./App.scss";
import { GameConfig } from "./types/game";

function App() {
  const config: GameConfig = {
    width: 10,
    height: 10,
    numMines: 10,
  };

  return (
    <>
      <Game config={config} />
      <div>
        Width: {config.width} - Height: {config.height} - Number of Mines:{" "}
        {config.numMines}
      </div>
    </>
  );
}

export default App;
