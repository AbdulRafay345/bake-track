import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import ForgotPassword from './ForgotPassword'
import Login from './Login'
import Register from './Register'
import { useAuth } from '../../context/AuthContext'

export default function Auth() {

    const { state } = useAuth()

    return (
        <Routes>
            <Route path='/login' element={state.isAuthenticated ? <Navigate to='/' /> : <Login />} />
            <Route path='/register' element={state.isAuthenticated ? <Navigate to='/' /> : <Register />} />
            <Route path='/forgot-password' element={state.isAuthenticated ? <Navigate to='/' /> : <ForgotPassword />} />
            <Route path='*' element={<p className='text-center fs-1'>Page Not Found. 404 Error</p>} />
        </Routes>
    )
}