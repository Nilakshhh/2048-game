import React, { Component } from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";

export default class CreateUser extends Component {
    constructor(props) {
        super(props);
    
        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    
        this.state = {
          username: '',
          password: '',
          highscore: 0,
          responseMessage: '' // Add this state variable
        }
      }
    
      onChangeUsername(e) {
        this.setState({
          username: e.target.value
        })
      }
      
      onChangePassword(e) {
        this.setState({
          password: e.target.value
        })
      }
    
      onSubmit(e) {
        e.preventDefault();
    
        const user = {
          username: this.state.username,
          password: this.state.password,
          highscore: this.state.highscore
        }
    
        axios.post('https://two048-backend.onrender.com/users/login', user)
          .then(res => {
            this.setState({
              responseMessage: res.data.token // Update the response message
            });
            console.log(res)
          })
          .catch(error => {
            this.setState({
              responseMessage: error.response.data.password || error.response.data.username || error.response.data // Update the response message on error
            });
            console.log(error)
          });
    
        this.setState({
          username: '',
          password: '',
          highscore: 0
        });
      }  
    render() {    
      return (
        <div className='flex justify-center items-center h-screen'>
      <div className='w-full max-w-xs'>
        <form className="bg-white shadow-md rounded-xl px-8 pt-6 pb-8 mb-4" onSubmit={this.onSubmit} >
          <h3 className='text-gray text-3xl font-mono pb-4 flex justify-center'>Login</h3>
          <div className="mb-4"> 
            <label className='block text-gray-700 text-sm font-bold mb-2'>Username:</label>
            <input
              type="text"
              required
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder='Username'
              value={this.state.username}
              onChange={this.onChangeUsername}
            />
          </div>
          <div className='mb-4'>
            <label className='block text-gray-700 text-sm font-bold mb-2'>Password:</label>
            <input
              type="password"
              required
              placeholder='Pass****'
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value={this.state.password}
              onChange={this.onChangePassword}
            />
          </div>
          <div className="flex items-center justify-between">
            <input type="submit" value="Login" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" />
            <Link to="/signup">        
              <button className='inline-block align-baseline font-bold text-blue-500 hover:text-blue-800 text-sm '><span>Signup here!</span></button>
            </Link>
          </div>
          
        </form>
        <p className="text-center text-gray-500 text-lg">{this.state.responseMessage}</p>
      </div>
      </div>
    )
    }
  }
  