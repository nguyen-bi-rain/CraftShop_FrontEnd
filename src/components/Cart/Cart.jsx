import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getProductById } from '../../services'
const Cart = () => {
    const [cartData, setCartData] = useState([])
    const [totalPrice, setTotalPrice] = useState(0)
    const [renderCount, setRenderCount] = useState(0)
    const item = JSON.parse(sessionStorage.getItem('cart'))



    useEffect(() => {
        retrieveData()
        console.log(cartData);
        if (renderCount === 0) {
            setRenderCount(1);
        }
    }, [renderCount])

    const retrieveData = async () => {
        let sum = 0;
        if (item != null) {
            const CartList = await Promise.all(
                item.map(async (c) => {
                    const res = await getProductById(c.productId);
                    sum += res.result.productPrice * c.quantity;

                    return { data: res.result, quantity: c.quantity };
                })
            );
            setTotalPrice(sum);
            setCartData([...CartList]);
        }
    };

    const handleRemove = (id) => {
        const newCart = item.filter((c) => c.id !== id);
        sessionStorage.setItem('cart', JSON.stringify(newCart));
        setRenderCount(renderCount + 1);
    }

    const handleQuantityOfItemChange = () => {

        const sum = cartData.reduce((totalPrice, c) => totalPrice + c.data.productPrice * c.quantity, 0)
        setTotalPrice(sum)
    }
    const formateCurenncy = new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' })
    return (
        <div className="container mx-auto mt-10">
            <div className="flex shadow-md my-10">
                <div className="w-3/4 bg-white px-10 py-10">
                    <div className="flex justify-between border-b pb-8">
                        <h1 className="font-semibold text-2xl">Shopping Cart</h1>
                        <h2 className="font-semibold text-2xl">{item != null ? item.length : 0} Items</h2>
                    </div>
                    <div className="flex mt-10 mb-5">
                        <h3 className="font-semibold text-gray-600 text-xs uppercase w-2/5">Product Details</h3>
                        <h3 className="font-semibold  text-gray-600 text-xs uppercase w-1/5 text-center">Quantity</h3>
                        <h3 className="font-semibold  text-gray-600 text-xs uppercase w-1/5 text-center">Price</h3>
                        <h3 className="font-semibold  text-gray-600 text-xs uppercase w-1/5 text-center">Total</h3>
                    </div>

                    {cartData.map((c, i) => (

                        <div className="flex items-center hover:bg-gray-100 -mx-8 px-6 py-5" key={i}>
                            <div className="flex w-2/5">
                                <div className="w-20">
                                    <img className="h-24" src={require(`../../assets/${c.data.productImage.imageThumb}`)} alt={c.data.productName} />
                                </div>
                                <div className="flex flex-col justify-between ml-4 flex-grow">
                                    <Link to={`/product/${c.data.id}`}>
                                        <span className="font-bold text-sm">{c.data.productName}</span>
                                    </Link>
                                    <span className="text-red-500 text-xs">{c.data.category.categoryName}</span>
                                    <button className="text-left font-semibold hover:text-red-500 text-gray-500 text-xs" onClick={() => handleRemove(c.data.id)}>Remove</button>
                                </div>
                            </div>
                            <div className="flex justify-center w-1/5">
                                <svg onClick={handleQuantityOfItemChange} className="fill-current text-gray-600 w-3" viewBox="0 0 448 512"><path d="M416 208H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h384c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z" />
                                </svg>

                                <input className="mx-2 border text-center w-8" type="text" value={c.quantity} />

                                <svg onClick={handleQuantityOfItemChange} className="fill-current text-gray-600 w-3" viewBox="0 0 448 512">
                                    <path d="M416 208H272V64c0-17.67-14.33-32-32-32h-32c-17.67 0-32 14.33-32 32v144H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h144v144c0 17.67 14.33 32 32 32h32c17.67 0 32-14.33 32-32V304h144c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z" />
                                </svg>
                            </div>
                            <span className="text-center w-1/5 font-semibold text-sm">{formateCurenncy.format(c.data.productPrice)}</span>
                            <span className="text-center w-1/5 font-semibold text-sm">{formateCurenncy.format(c.data.productPrice * c.quantity)}</span>
                        </div>
                    )
                    )}



                    <Link to={'/product'} className="flex font-semibold text-indigo-600 text-sm mt-10">

                        <svg className="fill-current mr-2 text-indigo-600 w-4" viewBox="0 0 448 512"><path d="M134.059 296H436c6.627 0 12-5.373 12-12v-56c0-6.627-5.373-12-12-12H134.059v-46.059c0-21.382-25.851-32.09-40.971-16.971L7.029 239.029c-9.373 9.373-9.373 24.569 0 33.941l86.059 86.059c15.119 15.119 40.971 4.411 40.971-16.971V296z" /></svg>
                        Continue Shopping
                    </Link>
                </div>

                <div id="summary" className="w-1/4 px-8 py-10">
                    <h1 className="font-semibold text-2xl border-b pb-8">Order Summary</h1>
                    <div className="flex justify-between mt-10 mb-5">
                        <span className="font-semibold text-sm uppercase">Items {item ? item.length : 0}</span>
                        <span className="font-semibold text-sm">{formateCurenncy.format(totalPrice)}</span>
                    </div>
                    <div>
                        <label className="font-medium inline-block mb-3 text-sm uppercase">Shipping</label>
                        <select className="block p-2 text-gray-600 w-full text-sm">
                            <option>Standard shipping - 10.000 đ</option>
                        </select>
                    </div>

                    <div className="border-t mt-8">
                        <div className="flex font-semibold justify-between py-6 text-sm uppercase">
                            <span>Total cost</span>
                            <span>{formateCurenncy.format(totalPrice + 10000)}</span>
                        </div>
                        <button className="bg-indigo-500 font-semibold hover:bg-indigo-600 py-3 text-sm text-white uppercase w-full">Checkout</button>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default Cart