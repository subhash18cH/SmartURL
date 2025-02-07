import React, { useState } from 'react';
import { MdOutlineHome } from "react-icons/md";
import { FiLink } from "react-icons/fi";
import { QrCode } from 'lucide-react';
import { IoAnalytics } from "react-icons/io5";
import { IoMdLogOut } from "react-icons/io";
import { IoMdCreate } from "react-icons/io";
import { Link, useNavigate } from 'react-router-dom';
import ButtonSide from './ButtonSide';
import logo from '/src/assets/logo.jpg';
import CreateModal from './CreateModal ';

const Sidebar = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navigate = useNavigate()
  const handleClickOpen = () => {
    localStorage.removeItem("JWT");
    navigate("/");
  };

  return (
    <>
      <button
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        className="fixed top-4 left-4 z-50 p-2 rounded-lg bg-white shadow-md sm:hidden"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d={isMobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
          />
        </svg>
      </button>

      <div className={`
        w-52 h-screen fixed flex flex-col justify-between py-4 bg-blue-50 shadow-md
        transform transition-transform duration-300 ease-in-out z-40
        ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}
        sm:translate-x-0
      `}>
        <div className='flex flex-col justify-between'>

          <div className='flex pl-3 items-center px-2 gap-2'>
            <Link to="/home" className=''>
              <img className='rounded-full w-12 sm:w-12' src={logo} alt="SmartUrl" />
            </Link>
            <span className='text-lg sm:text-2xl font-semibold text-[#5052ce]'>SmartUrl</span>
          </div>

          <div className='flex flex-col space-y-4 sm:space-y-6 justify-center items-center mt-6'>
            <button
              onClick={() => {
                setIsModalOpen(true);
                setIsMobileMenuOpen(false);
              }}
              className="flex items-center space-x-3 sm:space-x-5 px-6 sm:px-5 py-2 rounded-lg hover:bg-blue-200 w-full font-semibold text-sm sm:text-base"
            >
              <IoMdCreate className='text-2xl sm:text-2xl ' />
              <span className='font-semibold'>Create</span>
            </button>

            <ButtonSide
              label="Links"
              route="/link-page"
              icon={<FiLink />}
              onClick={() => setIsMobileMenuOpen(false)}
            />
            <ButtonSide
              label="Qr Code"
              route="/qr-code"
              icon={<QrCode />}
              onClick={() => setIsMobileMenuOpen(false)}
            />
            <ButtonSide
              label="Analytics"
              route="/analytics"
              icon={<IoAnalytics />}
              onClick={() => setIsMobileMenuOpen(false)}
            />
            {/* <ButtonSide
              label="Logout"
              route="/logout"
              icon={<IoMdLogOut />}
              isLogout={true}
              onClick={() => setIsMobileMenuOpen(false)}
            /> */}
            <button onClick={handleClickOpen} className='flex items-center font-semibold  hover:bg-red-600 hover:text-white w-full py-2 px-5 space-x-5 rounded-md'>
              <span className='text-2xl'><IoMdLogOut /></span>
              <span className='font-semibold'>Logout</span>

            </button>

          </div>

        </div>
      </div>

      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 sm:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      <CreateModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
};

export default Sidebar;