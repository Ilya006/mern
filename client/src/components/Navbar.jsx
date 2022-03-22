import React, { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'

export const Navbar = () => {
  const auth = useContext(AuthContext)
  const navigation = useNavigate()

  const logoutHandler = (event) => {
    event.preventDefault()
    auth.logout()
    navigation('/')
  }

  return (
    <nav>
      <div className="nav-wrapper" style={{ padding: '0 2rem' }}>
        <span className="brand-logo">Logo</span>
        <ul id="nav-mobile" className="right hide-on-med-and-down">
          <li><Link to='create'>Создать</Link></li>
          <li><Link to='links'>Ссылки</Link></li>
          <li><a href="/" onClick={logoutHandler}>Выйти</a></li>
        </ul>
      </div>
    </nav>
  )
}
