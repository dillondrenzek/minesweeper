import React from "react";
import { Game } from "./components/game/game";
import "./App.scss";

function App() {
  const width = 10;
  const height = 10;
  const numMines = 10;

  console.log("render app");

  return (
    <>
      <Game width={width} height={height} numMines={numMines} />
      <div>
        Width: {width} - Height: {height} - Number of Mines: {numMines}
      </div>
    </>
  );
}

export default App;
