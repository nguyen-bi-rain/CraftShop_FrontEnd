import React, { useEffect, useState } from 'react'
import Logo from "../../assets/logo.svg"
import { CiSearch } from "react-icons/ci";
import { FaRegUser } from "react-icons/fa";
import { FaRegHeart } from "react-icons/fa";
import { PiShoppingBag } from "react-icons/pi";
import styles from "./style.module.css"
import Navbar from '../NavBar/Navbar';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Header = (props)  =>{

  const [totalQuantity, setTotalQuantity] = useState(0);
    const carts = useSelector(store => store.cart.items);
    useEffect(() => {
        let total = 0;
        carts.forEach(item => total += item.quantity);
        setTotalQuantity(total);
    }, [carts])
    const token = localStorage.getItem('user');
  const handleLogout = () => {
    localStorage.removeItem('user');
    sessionStorage.removeItem('cart');
    window.location.reload()
  }

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
            {token != null ? <div className='flex items-center justify-center text-white gap-3 font-medium relative'>

              <FaRegUser onClick={handleLogout} />
              <FaRegHeart />
              <Link to='cart'><PiShoppingBag /></Link>
              <p className={styles.cart} >{totalQuantity}</p>
            </div>
              : <span><Link to='/signin'>Sing in </Link>/ <Link to='/signup'>Sign up</Link></span>
            }
          </div>
        </div>
        <Navbar />
      </div>
    </header>
  )
}

export default Header