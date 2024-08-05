import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Input } from 'antd';
import { toast } from 'react-toastify';

export default function Login() {

  const [state, setState] = useState({ name: "", email: "", password: "" });
  const navigate = useNavigate();
  const handleChange = e => setState(s => ({ ...s, [e.target.name]: e.target.value }));

  const handleSubmit = e => {
    e.preventDefault();

    let { name, email, password } = state;
    const id = Math.random().toString(36).slice(2);
    if (!name || !email || !password) return toast.error("Please Fill Inputs Correctly", { position: "bottom-left" });
    const formData = { name, email, password, user_id: id };

    let users = JSON.parse(localStorage.getItem('users')) || []
    let userExists = users.find(u => u.email === email);

    if (!userExists) {
      users.push(formData);
      localStorage.setItem("users", JSON.stringify(users));
      toast.success("User Registered Successfully!", { position: "bottom-left" });
      navigate("/auth/login");
    } else {
      return toast.error("User Already Exists", { position: "bottom-left" });
    }
  };

  return (
    <>
      <div style={{ backgroundColor: '#003049', height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <form className='border border-dark rounded-2 px-5 py-3' onSubmit={handleSubmit} style={{ backgroundColor: '#fff' }}>
          <div className="mb-3">
            <h1>Register</h1>
            <p className='small'>to get started!</p>
          </div>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">Name</label>
            <Input type="text" name='name' id="name" onChange={handleChange} />
          </div>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email address</label>
            <Input type="email" name='email' id="email" onChange={handleChange} />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">Password</label>
            <Input.Password type="password" name='password' id="password" onChange={handleChange} />
          </div>
          <button type="submit" className="btn btn-primary w-100 mb-3">Register</button>
          <p className='small text-center'>Already have an account? <Link to='/auth/login' style={{ color: 'black' }}>Login</Link></p>
        </form>
      </div>
    </>
  );
}
