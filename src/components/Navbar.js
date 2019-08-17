import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Logo from '../assets/images/logo.svg'
import { FaAlignJustify } from 'react-icons/fa'

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)

  const handleToggle = () => {
    setIsOpen(!isOpen)
  }

  return (
    <nav className="navbar">
      <div className="nav-center">
        <div className="nav-header">
          <Link to="/">
            <img src={Logo} alt="" />
          </Link>
          <button onClick={handleToggle} type="button" className="nav-btn">
            <FaAlignJustify className="nav-icon" />
          </button>
        </div>
        <ul className={isOpen ? 'nav-links show-nav' : 'nav-links'}>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/rooms">Rooms</Link>
          </li>
        </ul>
      </div>
    </nav>
  )
}

export default Navbar
