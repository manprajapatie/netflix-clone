import React, { useEffect, useRef } from 'react'
import './Navbar.css'
import logo from '../../assets/logo.png'
import search_Icon from '../../assets/search_icon.png'
import bell_Icon from '../../assets/bell_icon.png'
import profile_img from '../../assets/profile_img.png'
import caret_icon from '../../assets/caret_icon.png'


const Navbar = () => {
  const navRef = useRef();

  useEffect(()=>{
    window.addEventListener('scroll', ()=>{
      if(window.scrollY >= 80){
        navRef.current.classList.add('nav-dark')
      }else{
        navRef.current.classList.remove('nav-dark')
      }
    })
  },[])


  return (

      /* -------------- Navbar -------------- */ 

    <div ref={navRef} className='navbar'>

      {/* -------------- Navbar Left Side -------------- */ }
      <div className="navbar-left">
      <img src = {logo} alt="" />
      <ul>
        <li>Home</li>
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

        <img src={bell_Icon} alt="" className='icons' />

        <div className="navbar-profile">
          <img src={profile_img} alt="" className='profile' />
          <img src={caret_icon} alt="" className='caret-icon' />

          <div className="dropdown">
            <p>Sign out of Netflix</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Navbar
