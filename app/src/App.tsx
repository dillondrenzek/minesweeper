import React from 'react';
import { Game } from './components/game/game';
import './App.scss';

function App() {
  return (
    <Game width={5} height={7} numMines={10} />
  );
}

export default App;
