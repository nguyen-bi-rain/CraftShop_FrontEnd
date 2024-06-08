import React from 'react'

const Navbar = () => {
    return (
        <nav> 
            <ul className='flex justify-center items-center text-white uppercase text-sm'>
                <li className='p-5 '><a href="#">Home</a></li>
                <li className='p-5 '><a href="#">About</a></li>
                <li className='p-5 '><a href="#">Blog</a></li>
                <li className='p-5 '><a href="#">Testimonial</a></li>
                <li className='p-5 '><a href="#">Contact</a></li>
            </ul>
        </nav>
    )
}

export default Navbar