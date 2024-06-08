import React from 'react'
import Logo from "../../assets/logo.svg"
import { CiSearch } from "react-icons/ci";
import { FaRegUser } from "react-icons/fa";
import { FaRegHeart } from "react-icons/fa";
import { PiShoppingBag } from "react-icons/pi";
import styles from "./style.module.css"
import Navbar from '../NavBar/Navbar';
import { Link } from 'react-router-dom';

const Header = (props) => {

  return (
      <header className='bg-[#913B10]'>
        <div className='md:container md:mx-auto'>
          <div className='flex items-center justify-between  border-b-2 pb-4' >
            <div className='text-white'>
              <p><CiSearch className='inline w-6 h-6' /><span className='hidden md:inline'> What are you looking for</span> </p>
            </div>
            <Link to="/">
            <img src={Logo} alt='logo'></img>
            </Link>
            <div className='flex items-center justify-center text-white gap-3 font-medium'>
              <FaRegUser />
              <FaRegHeart />
              <PiShoppingBag className={styles.cart} />

            </div>
          </div>
          <Navbar />
        </div>
      </header>
  )
}

export default Header