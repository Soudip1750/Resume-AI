import React from 'react'
import { Link } from 'react-router'
import "../auth.form.scss"

const Login = () => {

  const handleSubmit = (e) => {
    e.preventDefault()
  }

  return (
    <main>
      <div className="form-container">
        <h1 className='main-heading'>Login</h1>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label>Email</label>
            <input type='email' id = 'email' name = 'email' placeholder='Enter your email'></input>
          </div>
          <div className="input-group">
            <label>Password</label>
            <input type='password' id='password' name='password' placeholder='Enter your password'></input>
          </div>
          <button type='submit' className='button primary-button'>Login</button>
        </form>
        <p className='switch-login-register'><Link to={"/register"}>Don't have an account ?</Link></p>
      </div>
    </main>
  )
}

export default Login