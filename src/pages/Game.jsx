import React from "react";
import Bigbutton from '../components/Bigbutton';
function Game() {
    return (
      <>
        <div className="main-page-heading-box">
          <h1>2048 Game</h1>
        </div>
        <div className="grid-box">
        <>
          <div class="game">
      <div class="grid">
        <div class="row">
          <div class="cell"></div>
          <div class="cell"></div>
          <div class="cell"></div>
          <div class="cell"></div>
        </div>
        <div class="row">
          <div class="cell"></div>
          <div class="cell"></div>
          <div class="cell"></div>
          <div class="cell"></div>
        </div>
        <div class="row">
          <div class="cell"></div>
          <div class="cell"></div>
          <div class="cell"></div>
          <div class="cell"></div>
        </div>
        <div class="row">
          <div class="cell"></div>
          <div class="cell"></div>
          <div class="cell"></div>
          <div class="cell"></div>
        </div>
      </div>
      <div class="playground">
      </div>
    </div> 
    </>
    </div>
    <div className="arrow-box">
    <Bigbutton buttonDisplay="↑" />
    <Bigbutton buttonDisplay="↓" />
    <Bigbutton buttonDisplay="→" />
    <Bigbutton buttonDisplay="←" />
    </div>


      </>
    );
  }
  export default Game;