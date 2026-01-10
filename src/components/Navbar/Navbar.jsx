import React, { useEffect, useRef } from 'react'
import './Navbar.css'
import logo from '../../assets/logo.png'
import search_Icon from '../../assets/search_icon.png'
import profile_img from '../../assets/profile_img.png'
import caret_icon from '../../assets/caret_icon.png'
import { logout } from '../../feature/auth/authSlice'
import { useDispatch } from 'react-redux'


const Navbar = () => {
  const navRef = useRef();
  const dispatch = useDispatch()

  useEffect(() => {
    window.addEventListener('scroll', () => {
      if (window.scrollY >= 80) {
        navRef.current.classList.add('nav-dark')
      } else {
        navRef.current.classList.remove('nav-dark')
      }
    })
  }, [])


  //---------------send Logout data to store
  const handleLogOut = () => {
    dispatch(logout())
    { console.log("Button chal rahi he")}
  }

  return (

    /* -------------- Navbar -------------- */

    <div ref={navRef} className='navbar'>

      {/* -------------- Navbar Left Side -------------- */}
      <div className="navbar-left">
        <img src={logo} alt="" />
        <ul >
          <li >Home</li>
          <li>TV Shows</li>
          <li>Movies</li>
          <li>My List</li>
          <li>Browse by Languages</li>
        </ul>
      </div>


      {/* -------------- Navbar Right Side -------------- */}
      <div className="navbar-right">
        <img src={search_Icon} alt="" className='icons' />
        <p>children</p>



        <div className="navbar-profile">
          <img src={profile_img} alt="" className='profile' />
          <img src={caret_icon} alt="" className='caret-icon' />

          <button className="dropdown" onClick={handleLogOut}>
            <p>Sign out of Netflix</p>
           
            
          </button>
        </div>
      </div>
    </div>
  )
}

export default Navbar
