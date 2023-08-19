/*import React from "react";
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
        <button className="custom-btn btn-7 f"><span>Login</span></button>
      </Link>
      <Link to="/game">        
        <button className="custom-btn btn-7 s"><span>Play as Guest</span></button>
      </Link>
    </>
  );
}
export default Start;
*/
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

const Start = () => {
  const navigate = useNavigate();
  const [cookies, removeCookie] = useCookies([]);
  const [username, setUsername] = useState("");
  useEffect(() => {
    const verifyCookie = async () => {
      const { data } = await axios.post(
        "http://localhost:4000",
        {},
        { withCredentials: true }
      );
      const { status, user } = data;
      setUsername(user);
      return status
        ? toast(`Hello ${user}`, {
            position: "top-right",
          })
        : (removeCookie("token"), navigate("/login"));
    };
    verifyCookie();
  }, [cookies, navigate, removeCookie]);
  const Logout = () => {
    removeCookie("token");
    navigate("/signup");
  };
  return (
    <>
      <div>
        <div className="heading">
          <h1 className="flex-auto font-bold">2048</h1>
        </div>
      </div>
      <Link to="/login">        
        <button className="custom-btn btn-7 f"><span>Login</span></button>
      </Link>
      <Link to="/game">        
        <button className="custom-btn btn-7 s"><span>Play as {username}</span></button>
      </Link>
    </>
  );
};

export default Start;
