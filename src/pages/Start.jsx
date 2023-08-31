import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from 'axios';

function Start() {
  var doc = document;
  const name = doc.getElementById("textToUpdate").textContent; 
  const [users, setUsers] = useState([]);

  useEffect(() => {
    async function fetchUsers() {
      try {
        const response = await axios.get('https://two048-backend.onrender.com/users/top');
        setUsers(response.data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    }

    fetchUsers();
  }, []);

  const handleClick = () => {
    console.log("Button clicked!");
    var texttoUpdate = doc.getElementById("textToUpdate")
    texttoUpdate.textContent = "";
    window.location.reload();
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
      <div className="leaderboard">
        <h1>leaderboard</h1>
          <ol>
            {users.map(user => (
              <li>
                <mark>{user.username}</mark>
                <small>{user.highscore}</small>
              </li>
            ))}
          </ol>

      </div>
    </>
  );
}
export default Start;