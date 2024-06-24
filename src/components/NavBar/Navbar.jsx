import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
    return (
        <nav> 
            <ul className='flex justify-center items-center text-white uppercase text-sm'>
                <li className='p-5 '><Link to="/" href="#">Home</Link></li>
                <li className='p-5 '><Link to={"/product"} href="#">Shop</Link></li>
                <li className='p-5 '><a href="#">Blog</a></li>
                <li className='p-5 '><a href="#">Testimonial</a></li>
                <li className='p-5 '><a href="#">Contact</a></li>
            </ul>
        </nav>
    )
}

export default Navbar