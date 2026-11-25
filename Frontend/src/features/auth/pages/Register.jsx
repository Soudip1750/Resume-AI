import React, { useState } from 'react'
import { Link } from 'react-router'
import "../auth.form.scss"
import { useAuth } from '../hooks/useAuth'
import {useNavigate} from 'react-router'

const Register = () => {
  const navigate = useNavigate()
  const [loading, handleRegister] = useAuth()

  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleSubmit = async (e) => {
    e.preventDefault()
    await handleRegister({username, email, password})
    navigate('/login')
  }

  if(loading) {
    return (
      <main>
        <h1>The page is loading....</h1>
      </main>
    )
  }

  return (
    <main>
      <div className="form-container">
        <h1 className='main-heading'>Register</h1>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label>Username</label>
            <input type='text' id='username' name='username' placeholder='Enter your username' onChange={(e) => {setUsername(e.target.value)}}></input>
          </div>
          <div className="input-group">
            <label>Email</label>
            <input type='email' id = 'email' name = 'email' placeholder='Enter your email' onChange={(e) => {setEmail(e.target.value)}}></input>
          </div>
          <div className="input-group">
            <label>Password</label>
            <input type='password' id='password' name='password' placeholder='Enter your password' onChange={(e) => {setPassword(e.target.value)}}></input>
          </div>
          <button type='submit' className='button primary-button'>Register</button>
        </form>
        <p className='switch-login-register'><Link to={"/login"}> Already have an account ?</Link></p>
      </div>
    </main>
  )
}

export default Register