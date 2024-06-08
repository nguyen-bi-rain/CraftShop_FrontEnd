import { useState } from "react";
import { FaRegHeart } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";

const ProductItem = ({image,name,description,price}) => {
    const [like,setLike] = useState(false)
    const handleHeartClick = () =>{
        setLike(!like)
    }
    const path = require(`../../assets/${image}`)
    return (
        <div className="font-['Poppins']">
            <div className="relative mb-4">
                <img src={path} alt="product" />
                {like ? <FaHeart className="text-white absolute top-2 right-2 cursor-pointer" onClick={handleHeartClick}/> : <FaRegHeart className="text-white absolute top-2 right-2 cursor-pointer" onClick={handleHeartClick}/> }
            </div>
            <div>
                <span className="w-1/3 block h-[1px] bg-[#913B10] mt-4 mb-6"></span>
                <h3 className="text-[#3E402D] text-lg font-light">{name}</h3>
                <p className="text-base font-medium py-4">{description}</p>
                <p className="text-base font-medium py-4">{price}</p>
            </div>
        </div>
    )
}

export default ProductItem