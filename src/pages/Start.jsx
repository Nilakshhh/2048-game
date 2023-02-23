import React from "react";
import Clippy from "../components/Clippy";
import Bigbutton from "../components/Bigbutton";
import { Link } from "react-router-dom";

function Start() {
  return (
    <>
        <div>
        <div className="main-page-heading-box">
        <h1>Welcome to 2048</h1>
        </div>
        <Link to="/">        
          <Bigbutton buttonDisplay="Login"/>
        </Link>
        <Link to="/game">
          <Bigbutton buttonDisplay="Start Game as Guest"/>
        </Link>
        <Link to="/rules">
          <Bigbutton buttonDisplay="Rules"/>
        </Link>
        
        </div>
    </>
  );
}
export default Start;
