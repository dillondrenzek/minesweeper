import React from "react";
import { Game } from "./game";

describe("Game", () => {
  it("does not throw", () => {
    expect(() => (
      <Game config={{ width: 10, height: 10, numMines: 10 }} />
    )).not.toThrow();
  });
});
