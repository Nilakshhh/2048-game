import React from "react";
import Grid from "../components/Grid";

function Game() {
    return (
      <>
        <div className="main-page-heading-box">
          <h1>2048 Game</h1>
        </div>
        <div className="grid-box">
        <Grid />
        </div>

      </>
    );
  }
  export default Game;