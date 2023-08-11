import React, { Component } from 'react';
import axios from 'axios';

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

    axios.post('https://two048-backend.onrender.com/users/register', user)
      .then(res => {
        this.setState({
          responseMessage: res.data // Update the response message
        });
      })
      .catch(error => {
        this.setState({
          responseMessage: error.response.data.password || error.response.data // Update the response message on error
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
      <div>
        <h3>Create New User</h3>
        <form onSubmit={this.onSubmit}>
          <div className="form-group"> 
            <label>Username: </label>
            <input  type="text"
                required
                className="form-control"
                value={this.state.username}
                onChange={this.onChangeUsername}
                />
            <label>Password: </label>
            <input  type="password"
                required
                className="form-control"
                value={this.state.password}
                onChange={this.onChangePassword}
                />
          </div>
          <div className="form-group">
            <input type="submit" value="Create User" className="btn btn-primary" />
          </div>
        </form>
        <p>{this.state.responseMessage}</p>
      </div>
    )
  }
}
