import React, { useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import logo from '/src/assets/logo.jpg'

const Navbar = () => {
  return (
    <>
      <nav className='bg-white shadow-lg fixed w-full  '>
        <div className='flex justify-between items-center p-3'>
          <div className='flex justify-center items-center gap-2 '>
            <img className='rounded-full lg:w-14 md:w-14 w-12' src={logo} alt="Logo" />
            <h1 className='font-bold md:text-2xl lg:text-2xl text-xl text-[#5052ce]'>
              <span className=''>Smart</span>
              <span>Url</span>

            </h1>
          </div>

          <div className='lg:space-x-8'>

            <NavLink to={"/signin"} className='py-2 px-4 font-bold rounded-lg text-[#5052ce] hover:text-[#6a6bd5] hover:underline '>Log In</NavLink>
            <NavLink to={"/signup"} className=' outline-none py-3 px-4 border bg-[#5052ce] text-white hover:bg-[#6a6bd5] font-semibold rounded-md'>Sign Up</NavLink>
          </div>
        </div>
      </nav>
    </>
  )
}

export default Navbar