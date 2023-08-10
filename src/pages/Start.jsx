import React from "react";
import { Link } from "react-router-dom";

function Start() {
  
  return (
    <>
      <div>
        <div className="heading">
          <h1>2048</h1>
        </div>
      </div>
      <Link to="/signup">        
        <button class="custom-btn btn-7 f"><span>Login</span></button>
      </Link>
      <Link to="/game">        
        <button class="custom-btn btn-7 s"><span>Play as Guest</span></button>
      </Link>
    </>
  );
}
export default Start;
