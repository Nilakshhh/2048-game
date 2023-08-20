import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [highscore] = useState(0); // Assuming highscore is not relevant for login
  const [responseMessage, setResponseMessage] = useState('');

  const onChangeUsername = (e) => {
    setUsername(e.target.value);
  }

  const onChangePassword = (e) => {
    setPassword(e.target.value);
  }

  const onSubmit = (e) => {
    e.preventDefault();

    const user = {
      username: username,
      password: password,
      highscore: highscore
    }

    axios.post('https://two048-backend.onrender.com/users/login', user)
      .then(res => {
        setResponseMessage(res.data.token);
        console.log(res);
        const textElement = document.getElementById("textToUpdate");
        textElement.textContent = username;
        setTimeout(() => {
          navigate("/game");
        }, 1000);
      })
      .catch(error => {
        setResponseMessage(error.response.data.password || error.response.data.username || error.response.data);
        console.log(error);
      });

    setUsername('');
    setPassword('');
  }

  return (
    <div className='flex justify-center items-center h-screen'>
      <div className='w-full max-w-xs'>
        <form className="bg-white shadow-md rounded-xl px-8 pt-6 pb-8 mb-4" onSubmit={onSubmit} >
          <h3 className='text-gray text-3xl font-mono pb-4 flex justify-center'>Login</h3>
          <div className="mb-4"> 
            <label className='block text-gray-700 text-sm font-bold mb-2'>Username:</label>
            <input
              type="text"
              required
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder='Username'
              value={username}
              onChange={onChangeUsername}
            />
          </div>
          <div className='mb-4'>
            <label className='block text-gray-700 text-sm font-bold mb-2'>Password:</label>
            <input
              type="password"
              required
              placeholder='Pass****'
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value={password}
              onChange={onChangePassword}
            />
          </div>
          <div className="flex items-center justify-between">
            <input type="submit" value="Login" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" />
            <Link to="/signup">        
              <button className='inline-block align-baseline font-bold text-blue-500 hover:text-blue-800 text-sm '><span>Signup here!</span></button>
            </Link>
          </div>
        </form>
        <p className="text-center text-gray-500 text-lg">{responseMessage}</p>
      </div>
    </div>
  );
}

export default Login;
