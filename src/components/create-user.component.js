import React, { useState } from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";

function CreateUser() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [highscore, setHighscore] = useState(0);
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

    axios.post('https://two048-backend.onrender.com/users/register', user)
      .then(res => {
        setResponseMessage(res.data);
      })
      .catch(error => {
        setResponseMessage(error.response.data.password || error.response.data);
        console.log(error);
      });

    setUsername('');
    setPassword('');
    setHighscore(0);
  }

  return (
    <div className='flex justify-center items-center h-screen'>
      <div className='w-full max-w-xs'>
        <form className="bg-white shadow-md rounded-xl px-8 pt-6 pb-8 mb-4" onSubmit={onSubmit}>
          <h3 className='text-gray text-3xl font-mono pb-4 flex justify-center'>Signup</h3>
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
            <input type="submit" value="Create User" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" />
            <Link to="/login">        
              <button className='inline-block align-baseline font-bold text-blue-500 hover:text-blue-800 text-sm '><span>Already an user?</span></button>
            </Link>
          </div>
        </form>
        <p className="text-center text-gray-500 text-lg">{responseMessage}</p>
      </div>
    </div>
  );
}

export default CreateUser;
