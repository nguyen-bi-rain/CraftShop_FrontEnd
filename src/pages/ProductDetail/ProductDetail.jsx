import { useParams } from 'react-router-dom';
import { MdOutlineLocalShipping } from "react-icons/md";
import { HiOutlineShoppingBag } from "react-icons/hi";
import Star from "../../assets/star.svg"
import h_Strar from "../../assets/half-star.svg"
import empty from "../../assets/empty-star.svg"
import { useEffect, useState } from 'react';
import { getProductById } from "../../services/index.js"
import { FaRegHeart } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";


export default function ProductDetail() {
    let { id } = useParams()
    console.log(id);
    const intialPrice = 150
    const [wishlist, setWishlist] = useState(false)
    const [price, setPrice] = useState(intialPrice)
    const [quantity, setQuantity] = useState(1)
    const [data, setData] = useState({})
    useEffect(() => {
        getProductById(id).then((res) => {
            console.log(res.result);
            setData(res.result)
        }).catch((err) => {
            console.log("loi");
        })
    }, [])
    useEffect(() => {
        setPrice(intialPrice * quantity)
    }, [quantity])
    const images = [data?.imageThumb, data?.image1, data?.image2, data?.image3, data?.image4];
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    console.log(images[currentImageIndex]);
    debugger
    const nextImage = () => {
        setCurrentImageIndex((currentImageIndex + 1) % images.length);
    };

    const prevImage = () => {
        setCurrentImageIndex((currentImageIndex - 1 + images.length) % images.length);
    };

    const handleClickDownQuantity = () => {
        if (quantity > 0) {

            setQuantity(quantity - 1)
        }
    }
    const handleClickUpQuantity = () => {

        setQuantity(quantity + 1)
    }
    const path = require('../../assets/' + images[currentImageIndex])
    return (
        <div>
            <div className='max-w-5xl mx-auto'>
                <span className='block'>
                    Home / Stellar Dainty Diamond Hoop
                </span>
                <div className='flex gap-14 justify-center items-center mt-5'>
                    <div className='w-full'>
                        <div className='w-full'>
                            <img src={path} alt='product' />
                        </div>
                        <div className='flex justify-center items-center'>
                            <button onClick={prevImage}>--</button>
                            {
                                images.map((item, index) => {
                                    return (
                                        <div key={index} >
                                            <img src={require(`../../assets/${item}`)} alt='product' />
                                        </div>
                                    )
                                })
                            }

                            <button onClick={nextImage}>++</button>
                        </div>
                    </div>
                    <div className='text-center max-w-[490px]'>
                        <div className='flex justify-center items-center '>
                            <img src={Star} alt="star" />
                            <img src={Star} alt="star" />
                            <img src={Star} alt="star" />
                            <img src={h_Strar} alt="star" />
                            <img src={empty} alt="star" />
                        </div>
                        <div>
                            <h2 className='text-4xl mb-2 font-medium'>Handmade Sabai Grass Roti Box</h2>
                            <p className='text-base mb-5'>A Master piece indeed. The convex wall mirror with rosewood frame is intricately hand carved, over days by our expert artisan, who has honed the skill for generations. The dark lustre of rosewood carved with floral motifs revives the royalty that once was in the princely town of ‘Mysore’, the birthplace of the craft.</p>
                            <div className='flex items-center justify-center text-left gap-5 mb-8'>
                                <div className='mt-3'>
                                    <p className='text-sm font-medium uppercase'>quantity</p>
                                    <div className='flex border-[1px]  mt-3'>
                                        <button className='px-4 py-2 bg-white' onClick={handleClickDownQuantity}>-</button>
                                        <input type="text" className='w-10 text-center' value={quantity} />
                                        <button className='px-4 py-2 bg-white' onClick={handleClickUpQuantity}>+</button>
                                    </div>
                                </div>
                                <div >
                                    <p className='text-sm font-medium uppercase'>price total</p>
                                    <span className='mt-3 block text-xl font-bold uppercase'>$ {price} / Cái</span>
                                </div>
                            </div>
                            <div className='mb-7'>
                                <button className='px-10 bg-[#0C2B63] text-base uppercase text-white font-semibold py-3 border-[#0C2B63] ml-5'>Add to cart</button>
                                <button className='px-10 py-3 text-base uppercase border-2 border-[#0C2B63] ml-5' onClick={() => setWishlist(!wishlist)}>{wishlist ? <FaHeart className='inline-block mb-1 mr-2' /> : <FaRegHeart className='inline-block mb-1 mr-2' />} Save</button>
                            </div>
                            <div className='p-4 text-left bg-white' >
                                <div className='pb-4 border-b-[1px] flex'>
                                    <MdOutlineLocalShipping className='block mr-3 text-2xl' />
                                    <div>
                                        <p className='text-base font-semibold capitalize'>Free Shipping</p>
                                        <p className='text-sm text-[#726C6C] font-medium'>Enter your Postal code for Deliver Availability </p>
                                    </div>

                                </div>
                                <div className='pt-4 flex'>
                                    <HiOutlineShoppingBag className=' mr-3 text-2xl' />
                                    <div>
                                        <p className='text-base font-semibold capitalize'>Return Delivery</p>
                                        <p className='text-sm text-[#726C6C] font-medium'>Free 30 days Delivery Return. Details</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )

}