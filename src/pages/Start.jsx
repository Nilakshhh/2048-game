import React from "react";
import { Link } from "react-router-dom";

function Start() {
  
  return (
    <>
      <div>
        <div className="heading">
          <h1 className="flex-auto font-bold">2048</h1>
        </div>
      </div>
      <Link to="/login">        
        <button class="custom-btn btn-7 f"><span>Login</span></button>
      </Link>
      <Link to="/game">        
        <button class="custom-btn btn-7 s"><span>Play as Guest</span></button>
      </Link>
    </>
  );
}
export default Start;
