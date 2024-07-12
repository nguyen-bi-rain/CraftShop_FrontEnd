import { Link, useNavigate, useParams } from 'react-router-dom';
import { MdOutlineLocalShipping } from "react-icons/md";
import { HiOutlineShoppingBag } from "react-icons/hi";
import { GrFormPrevious } from "react-icons/gr";
import { GrFormNext } from "react-icons/gr";
import Star from "../../assets/star.svg";
import HalfStar from "../../assets/half-star.svg";
import EmptyStar from "../../assets/empty-star.svg";
import { useEffect, useState } from 'react';
import { FaRegHeart, FaHeart } from "react-icons/fa";
import ProductList from '../../components/ProductList/ProductList';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, changeQuantity } from '../../stores/cart';
import { fetchData } from '../../services';

export default function ProductDetail() {
    const { id } = useParams();
    const [wishlist, setWishlist] = useState(false);
    const [quantity, setQuantity] = useState(1);
    const [data, setData] = useState(null);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [list,setList] = useState([])

    //redux handle add to cart
    const cart = useSelector(state => state.cart.items);
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchProduct = async () => {

            try {
                const response = await fetch(`https://localhost:7188/api/Product/${id}`)

                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }

                const result = await response.json();
                setData(result.result);
            } catch (error) {
                console.error("Error fetching product data:", error);
            }
        };

        fetchProduct();
        listProduct();
    }, []);
    function listProduct(){
        fetchData(5,1).then((res) =>{
            setList(res.data.result)
        })
    }
    if (!data) {
        return <div>Loading...</div>;
    }

    const images = [data.productImage.imageThumb, data.productImage.image1, data.productImage.image2, data.productImage.image3, data.productImage.image4];
    console.log(images);
    const nextImage = () => {
        setCurrentImageIndex((currentImageIndex + 1) % images.length);
    };

    const prevImage = () => {
        setCurrentImageIndex((currentImageIndex - 1 + images.length) % images.length);
    };

    const handleClickDownQuantity = () => {
        if (quantity > 1) {
            setQuantity(quantity - 1);
        }
    };

    const handleClickUpQuantity = () => {
        setQuantity(quantity + 1);
    };

    

    const handleAddToCart = (id) => {
        if (localStorage.getItem('user') == null) {
            toast.error('please login to add to cart', { position: 'top-right' })
        }
        else 
        {
            const existingItem = cart.find(item => item.id === data.id);
            if (existingItem) {
                // If the item exists, create a new array where the quantity of the existing item is updated
                dispatch(changeQuantity({ productId: data.id, quantity: quantity }))
            } else {    
                // If the item doesn't exist, add it to the end of the array
                dispatch(addToCart({ productId: data.id, quantity: quantity }))
            }
            // Store the updated cart in sessionStorage
            toast.success('Added to cart')
        }
    }

    return (
        <div className='max-w-5xl mx-auto'>
            <span className='block'>
                Home / Product / {data.productName}
            </span>
            <div className='flex gap-14 justify-center items-center mt-5'>
                <div className='max-w-xl '>
                    <div className=''>
                        <img src={require(`../../assets/${images[currentImageIndex]}`)} alt='product' className='w-full' />
                    </div>
                    <div className='flex justify-center items-center gap-2'>
                        <button onClick={prevImage} ><GrFormPrevious /></button>
                        {images.map((item, index) => (
                            <div key={index} className='mt-4'>
                                <img
                                    src={require(`../../assets/${item}`)}
                                    alt='product'
                                    className={`w-30 h-40 cursor-pointer ${index === currentImageIndex ? 'border-2 border-blue-500' : ''}`}
                                    onClick={() => setCurrentImageIndex(index)}
                                />
                            </div>
                        ))}
                        <button onClick={nextImage}><GrFormNext /></button>
                    </div>
                </div>
                <div className='text-center max-w-[490px]'>
                    <div className='flex justify-center items-center '>
                        <img src={Star} alt="star" />
                        <img src={Star} alt="star" />
                        <img src={Star} alt="star" />
                        <img src={HalfStar} alt="star" />
                        <img src={EmptyStar} alt="star" />
                    </div>
                    <div>
                        <h2 className='text-4xl mb-2 font-medium'>{data.productName}</h2>
                        <p className='text-base mb-5'>{data.productDescription}</p>
                        <div className='flex items-center justify-center text-left gap-5 mb-8'>
                            <div className='mt-3'>
                                <p className='text-sm font-medium uppercase'>Quantity</p>
                                <div className='flex border-[1px] mt-3'>
                                    <button className='px-4 py-2 bg-white' onClick={handleClickDownQuantity}>-</button>
                                    <input type="text" className='w-10 text-center' value={quantity} readOnly />
                                    <button className='px-4 py-2 bg-white' onClick={handleClickUpQuantity}>+</button>
                                </div>
                            </div>
                            <div>
                                <p className='text-sm font-medium uppercase'>Price </p>
                                <span className='mt-4 block text-xl font-bold uppercase'>$ {data.productPrice}</span>
                            </div>
                        </div>
                        <div className='mb-7'>
                            <button className='px-10 bg-[#0C2B63] text-base uppercase text-white font-semibold py-3 border-[#0C2B63] ml-5' onClick={handleAddToCart} type='button'>Add to cart</button>
                            <button className='px-10 py-3 text-base uppercase border-2 border-[#0C2B63] ml-5' onClick={() => setWishlist(!wishlist)}>
                                {wishlist ? <FaHeart className='inline-block mb-1 mr-2' /> : <FaRegHeart className='inline-block mb-1 mr-2' />} Save
                            </button>
                        </div>
                        <div className='p-4 text-left bg-white'>
                            <div className='pb-4 border-b-[1px] flex'>
                                <MdOutlineLocalShipping className='block mr-3 text-2xl' />
                                <div>
                                    <p className='text-base font-semibold capitalize'>Free Shipping</p>
                                    <p className='text-sm text-[#726C6C] font-medium'>Enter your Postal code for Delivery Availability</p>
                                </div>
                            </div>
                            <div className='pt-4 flex'>
                                <HiOutlineShoppingBag className='mr-3 text-2xl' />
                                <div>
                                    <p className='text-base font-semibold capitalize'>Return Delivery</p>
                                    <p className='text-sm text-[#726C6C] font-medium'>Free 30 days Delivery Return. Details</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div >

            <div class="border-b border-gray-300 pb-2 mb-4 mt-10">
                <ul class="flex space-x-4 justify-center" >
                    <li class="font-bold text-gray-700 border-b-2 border-gray-700 pb-1">DESCRIPTION</li>
                    <li class="text-gray-500">REVIEWS</li>
                </ul>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                    <h2 class="font-bold text-lg mb-2">ABOUT PRODUCT</h2>
                    <p class="mb-4">Cool off this summer in the Mini Ruffle Smocked Tank Top from our very own LA Hearts. This tank features a smocked body, adjustable straps, scoop neckline, ruffled hems, and a cropped fit.</p>

                    <h3 class="font-bold text-lg mb-2">ADVANTAGES</h3>
                    <ul class="list-disc pl-5 space-y-1 mb-4">
                        <li>Smocked body</li>
                        <li>Adjustable straps</li>
                        <li>Scoop neckline</li>
                        <li>Ruffled hems</li>
                        <li>Cropped length</li>
                        <li>Model is wearing a small</li>
                        <li>100% rayon</li>
                        <li>Machine washable</li>
                    </ul>

                    <h3 class="font-bold text-lg mb-2">ADVANTAGES</h3>
                    <ul class="list-disc pl-5 space-y-1">
                        <li>Smocked body</li>
                        <li>Adjustable straps</li>
                        <li>Scoop neckline</li>
                    </ul>
                </div>

                <div>
                    <h2 class="font-bold text-lg mb-2">SHIPPING</h2>
                    <p class="mb-4">We offer Free Standard Shipping for all orders over $75 to the 50 states and the District of Columbia. The minimum order value must be $75 before taxes, shipping and handling. Shipping fees are non-refundable.</p>
                    <p class="mb-4">Please allow up to 2 business days (excluding weekends, holidays, and sale days) to process your order.</p>
                    <p class="font-bold">Processing Time + Shipping Time = Delivery Time</p>
                </div>
            </div>

            <div class="border-t border-gray-300 mt-8 pt-4 border-b pb-4">
                <p class="font-bold text-lg">Other information</p>
            </div>
            <div className="container mx-auto mt-5 py-[3.125rem]">
                <div className='flex justify-between items-center mb-9'>
                    <div>
                        <span className="text-base font-medium text-[#282828] capitalize mb-3 block">Lorem ipsum</span>
                        <h2 className="text-3xl font-medium text-[#282828] capitalize font-['Lora'] ">You Will Like<span className='inline-block w-[85px] h-[2px] bg-[#913B10] ml-1'></span></h2>
                    </div>
                    <div>
                        <Link to='/product' className='text-medium text-base text-[#282828] px-5 py-[0.625rem] border-2 border-black hover:bg-black hover:text-white transition ease-in-out duration-150' >SEE ALL</Link>
                    </div>
                </div>
                <div className='px-4'>
                    <ProductList number={5} numberItems={5} dataSet={list}/>
                </div>

            </div>
        </div>
    );
}
