import React from "react";
import Bigbutton from "../components/Bigbutton";
//import Clippy from "../components/Clippy";
import { Link } from "react-router-dom";
function Game() {
    return (
      <>
          <h1>hi</h1>
          <Link to="/">
          <Bigbutton buttonDisplay="Return to home"/>
          </Link>
      </>
    );
  }
  export default Game;