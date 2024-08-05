import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Input } from 'antd'
import { toast } from 'react-toastify'

export default function ForgotPassword() {

  let [state, setState] = useState({ email: "", newPassword: "", confirmPassword: "" })
  const navigate = useNavigate()

  const handleChange = e => setState(s => ({ ...s, [e.target.name]: e.target.value }))

  const handleSubmit = e => {
    e.preventDefault()

    let { email, newPassword, confirmPassword } = state

    if (!email || !newPassword || !confirmPassword) return toast.error("Please Fill All Input Correctly", { position: "bottom-left" })
    if (newPassword !== confirmPassword) return toast.error("Passwords Doesn't Match", { position: "bottom-left" })

    let users = JSON.parse(localStorage.getItem("users")) || []
    let userExists = users.find(u => u.email === email)

    if (!userExists) { return toast.error("User Not Found", { position: "bottom-left" }) }

    users = users.map(user => user.email === email ? { ...user, password: newPassword } : user)
    localStorage.setItem("users", JSON.stringify(users))
    toast.success("Password Updated Succesfully!", { position: "bottom-left" })
    navigate('/auth/login')
  }

  return (
    <>
      <div style={{ backgroundColor: ' #003049', height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <form className='border border-dark rounded-2 px-5 py-3' onSubmit={handleSubmit} style={{ backgroundColor: '#fff' }}>
          <div className="mb-3">
            <h2>Forgot Password</h2>
            <p className='small'>Enter Email & Password</p>
          </div>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email address</label>
            <Input type="email" name='email' id="email" aria-describedby="emailHelp" onChange={handleChange} />
          </div>
          <div className="mb-3">
            <label htmlFor="newPassword" className="form-label">New Password</label>
            <Input.Password type="password" name='newPassword' id="newPassword" onChange={handleChange} />
          </div>
          <div className="mb-3">
            <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
            <Input.Password type="password" name='confirmPassword' id="confirmPassword" onChange={handleChange} />
          </div>
          <button type="submit" className="btn btn-primary w-100 mb-3">Register</button>
          <p className='small text-center'>Don't have an account? <Link to='/auth/register' style={{ color: 'black' }}>Register</Link></p>
        </form>
      </div>
    </>
  )
}
