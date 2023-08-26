import React from "react";
import { Link } from "react-router-dom";

function Start() {
  var doc = document;
  const name = doc.getElementById("textToUpdate").textContent; 
  const handleClick = () => {
    console.log("Button clicked!");
    var texttoUpdate = doc.getElementById("textToUpdate")
    texttoUpdate.textContent = "";
    window.location.reload();
    // You can perform any actions you want here
  };
  
  return (
    <>
      <div>
        <div className="heading">
          <h1 className="flex-auto font-bold">2048</h1>
        </div>
      </div>

      {((name === "") && 
      <>
      <Link to="/login">        
        <button className="custom-btn btn-7 f"><span>Login</span></button>
      </Link>
      <Link to="/game">        
        <button className="custom-btn btn-7 s"><span>Play as Guest</span></button>
      </Link>
      </>

      ) || (
        <>
        <button onClick={handleClick} className="custom-btn btn-7 f"><span>Logout</span></button>
      <Link to="/game">        
        <button className="custom-btn btn-7 s"><span>Play</span></button>
      </Link>
      </>


      )}
    </>
  );
}
export default Start;