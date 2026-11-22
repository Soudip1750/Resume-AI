import React from 'react'
import { Link } from 'react-router'
import "../auth.form.scss"

const Register = () => {
  const handleSubmit = (e) => {
    e.preventDefault()
  }
  return (
    <main>
      <div className="form-container">
        <h1 className='main-heading'>Register</h1>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label>Username</label>
            <input type='text' id='username' name='username' placeholder='Enter your username'></input>
          </div>
          <div className="input-group">
            <label>Email</label>
            <input type='email' id = 'email' name = 'email' placeholder='Enter your email'></input>
          </div>
          <div className="input-group">
            <label>Password</label>
            <input type='password' id='password' name='password' placeholder='Enter your password'></input>
          </div>
          <button type='submit' className='button primary-button'>Register</button>
        </form>
        <p className='switch-login-register'><Link to={"/login"}> Already have an account ?</Link></p>
      </div>
    </main>
  )
}

export default Register