import React from 'react'
import { Link } from 'react-router'
import "../auth.form.scss"
import { useAuth } from '../hooks/useAuth'
import { useState } from 'react'
import { useNavigate } from 'react-router'

const Login = () => {

  const {loading, handleLogin} = useAuth()
  const navigate = useNavigate()

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleSubmit = async (e) => {
    e.preventDefault()
    await handleLogin({email, password})
    navigate("/")
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
        <h1 className='main-heading'>Login</h1>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label>Email</label>
            <input type='email' id = 'email' name = 'email' placeholder='Enter your email' onChange={(e) =>{setEmail(e.target.value)}}></input>
          </div>
          <div className="input-group">
            <label>Password</label>
            <input type='password' id='password' name='password' placeholder='Enter your password' onChange={(e) => {setPassword(e.target.value)}}></input>
          </div>
          <button type='submit' className='button primary-button'>Login</button>
        </form>
        <p className='switch-login-register'><Link to={"/register"}>Don't have an account ?</Link></p>
      </div>
    </main>
  )
}

export default Login