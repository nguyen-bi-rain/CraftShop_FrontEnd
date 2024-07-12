import { useState } from "react";
import { FaRegHeart } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";
import styles from "./style.module.css"
import { useSelector,useDispatch  } from 'react-redux';
import { toast } from 'react-toastify';
import { addToCart } from "../../stores/cart";
const ProductItem = ({ image, name, price, id }) => {
    const [like, setLike] = useState(false)
    const handleHeartClick = () => {
        setLike(!like)
    }

    const carts = useSelector(state => state.cart.items);
    const dispatch = useDispatch();

    const handleAddToCart = (id) => {
        if (localStorage.getItem('user') == null) {
            toast.error('Please login to add to cart');
        } else {
            const existingCart = JSON.parse(sessionStorage.getItem('cart')) || [];
            const existingItem = existingCart.find(item => item.id === id);

            if (!existingItem) {
                dispatch(addToCart({ productId: id, quantity: 1 }))
                toast.success('Item added to cart');
            } else {
                toast.info('Item already in cart');
            }
        }
    };
    const path = require(`../../assets/${image}`)
    return (
        <div className="font-['Poppins']">
            <div className={`relative mb-4 overflow-hidden ${styles.card}`}>
                <a href={`/product/${id}`}>
                    <img src={path} alt="product" />
                </a>
                {like ? <FaHeart className="text-white absolute top-2 right-2 cursor-pointer z-10" onClick={handleHeartClick} /> : <FaRegHeart className="text-white absolute top-2 right-2 cursor-pointer z-10" onClick={handleHeartClick} />}
                <button className={`w-full bg-white absolute ${styles.cardItem}`} onClick={() =>handleAddToCart(id)}>Add To Cart</button>
            </div>
            <div>
                <span className="w-1/3 block h-[1px] bg-[#913B10] mt-4 mb-6"></span>
                <h3 className="text-[#3E402D] text-lg font-light">{name}</h3>
                <p className="text-base font-medium py-4">{price}</p>
                
            </div>
        </div>
    )
}

export default ProductItem