import React from 'react'
import { FiBox } from "react-icons/fi";
import De from '../../assets/product1.png'
import { FaArrowRight } from 'react-icons/fa';
const OrderItem = ({ status, dateDeliver, paymentmethod, volume, crateDate }) => {
    return (
        <div className='mt-4'>
            <div className='flex items-center mb-2'>
                <FiBox size={25} />
                <div className='ml-4'>
                    <p className='font-bold text-lg text-yellow-700'>Pending</p>
                    <p className='text-[#9A9A9A] text-sm '>On Fri 6, May 2023</p>
                </div>
            </div>
            <div className='flex justify-between items-center bg-[#F1F1F1] p-3 rounded'>
                <div className='flex items-center'>
                    <img src={De} alt="imege" className='w-16 h-20 mr-4 rounded' />
                    <div className='text-[#6D6D6D]'>
                        <h2 className='capitalize'>cash on delivery</h2>
                        <p>Size : 34</p>
                    </div>
                </div>
                <FaArrowRight />
            </div>
        </div>
    )
}

export default OrderItem