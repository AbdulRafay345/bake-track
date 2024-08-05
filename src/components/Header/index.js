import React from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'

export default function Header() {

  const { state, logout } = useAuth()

  return (
    <nav className="navbar navbar-expand-lg bg-primary">
      <div className="container">
        <Link className="navbar-brand text-white" to='/'>Bake-Track</Link>
        <button className="navbar-toggler bg-white" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link active text-white" aria-current="page" to='/'>Home</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link active text-white" aria-current="page" to='/menu'>Add-Menu</Link>
            </li>
          </ul>
          {state.isAuthenticated && (
              <div className="d-flex align-items-center">
                <span className="navbar-text me-3 text-white">
                  Welcome! {state.user.name}
                </span>
                <button className="btn btn-danger" onClick={logout}>
                  Logout
                </button>
              </div>
          )
          }

        </div>
      </div>
    </nav>
  )
}