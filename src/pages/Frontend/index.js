import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import Home from './Home'
import Orders from './Orders'
import Menu from './Menu'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import { useAuth } from '../../context/AuthContext'

export default function Frontend() {

  const { state } = useAuth()

  return (
    <>
      <Header />
      <Routes>
        <Route path='/' element={state.isAuthenticated ? <Home /> : <Navigate to='/auth/login' />} />
        <Route path='/orders' element={state.isAuthenticated ? <Orders /> : <Navigate to='/auth/login' />} />
        <Route path='/menu' element={state.isAuthenticated ? <Menu /> : <Navigate to='/auth/login' />} />
        <Route path='*' element={<p className='text-center fs-1'>Page Not Found. 404 Error</p>} />
      </Routes>
      <Footer />
    </>
  )
}
