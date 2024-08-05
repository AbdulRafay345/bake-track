import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Input } from 'antd'
import { useAuth } from '../../context/AuthContext'
import { toast } from 'react-toastify'

export default function Login() {

  let [loginState, setloginState] = useState({ email: "", password: "" })
  const { login } = useAuth()
  const navigate = useNavigate()
  const handleChange = e => setloginState(s => ({ ...s, [e.target.name]: e.target.value }))

  const handleSubmit = e => {
    e.preventDefault()
    let { email, password } = loginState
    if (!email || !password) return toast.error("Please Fill All Inputs Correctly", { position: 'bottom-left' })

    const handleLogin = login(email, password)
    if (handleLogin) {
      navigate("/")
    }
  }

  return (
    <>
      <div style={{ backgroundColor: ' #003049', height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <form className='border border-dark rounded-2 p-5' onSubmit={handleSubmit} style={{ backgroundColor: '#fff' }}>
          <div className="mb-3">
            <h1>Login</h1>
            <p className='small'>Welcome Back!</p>
          </div>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email address</label>
            <Input type="email" name='email' id="email" aria-describedby="emailHelp" onChange={handleChange} />
          </div>
          <div className="mb-3" style={{ position: "relative" }}>
            <Link to='/auth/forgot-password' className='small' style={{ position: "absolute", right: "0", textDecoration: "none" }}>Forgot Password</Link>
            <label htmlFor="password" className="form-label">Password</label>
            <Input.Password type="password" name='password' id="password" onChange={handleChange} />
          </div>
          <button type="submit" className="btn btn-primary w-100 mb-3">Login</button>
          <p className='small text-center'>Don't have an account? <Link to='/auth/register' style={{ color: 'black' }}>Register</Link></p>
        </form>
      </div>
    </>
  )
}