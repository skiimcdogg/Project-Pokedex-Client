import React, { Component } from 'react';
import { withRouter, Redirect } from 'react-router-dom';
import apiHandler from '../../api/apiHandler';
import { withUser } from '../Auth/withUser';

class FormSignin extends Component {
  state = {
    email: '',
    password: '',
  };

  handleChange = (event) => {
    const key = event.target.name;
    const value = event.target.value;

    this.setState({ [key]: value });
  };

  handleSubmit = (event) => {
    event.preventDefault();

    apiHandler
      .signin(this.state)
      .then((data) => {
        this.props.context.setUser(data);
      })
      .catch((error) => {
        console.log(error);
        // Display error message here, if you set the state
      });
  };

  render() {
    if (this.props.context.user) {
      return <Redirect to='/' />;
    }

    return (
      <div className='form-container'>
        <form
            className='form'
            onChange={this.handleChange}
            onSubmit={this.handleSubmit}
        >
          <label 
            className='label' 
            htmlFor='email'>
            Email
          </label>
          <input 
            className='input' 
            type='email' 
            id='email' 
            name='email' />
          <label 
            className='label' 
            htmlFor='password'>
          Password
          </label>
          <input
            className='input'
            type='password'
            id='password'
            name='password'
          />
          <button 
            className='btn'>Submit</button>
        </form>
      </div>
    );
  }
}

export default withRouter(withUser(FormSignin));
