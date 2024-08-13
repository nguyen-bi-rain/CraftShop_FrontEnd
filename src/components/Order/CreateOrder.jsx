import React, { useState } from 'react'
import { toast } from 'react-toastify'
import { CreateOrderAPI, CreateOrderItem, CreatePayment, CreateShipment } from '../../services'
import { useNavigate } from 'react-router-dom'
const CreateOrder = ({ totalPrice, orderItem }) => {
    const nagivate = useNavigate()
    const [deliveryMethod, setDeliveryMethod] = useState('DHL')
    const [payment, setPayment] = useState(1)
    const [totalCost, setTotalCost] = useState(totalPrice + 15000)
    const [shipmentValues, setShipmentValues] = useState({
        address: '',
        city: '',
        country: '',
        state: '',
        zipcode: ''
    });
    const handleDeliveryMethod = (e) => {

        setDeliveryMethod(e.target.value)
        if (e.target.value === 'DHL') {
            setTotalCost(totalPrice + 30000)
        } else if (e.target.value === 'FED') {
            setTotalCost(totalPrice + 15000)
        }
        else if (e.target.value === 'EX') {
            setTotalCost(totalPrice + 49000 + 15000)
        }

    }
    const handelInputChange = (e) => {
        const { name, value } = e.target;
        console.log(name, value);
        setShipmentValues({ ...shipmentValues, [name]: value });
    };
    const handleConfirmOrder = async (e) => {
        e.preventDefault();

        if (orderItem.length === 0) {
            toast.error('Cart is empty');
            return;
        }

        const userId = localStorage.getItem("userId");
        try {
            // Create Payment
            const payment = await CreatePayment({
                paymentMethod: "Cash on Delivery",
                amount: totalCost,
                applicationUserId: userId
            });

            // Create Shipment
            const shipment = await CreateShipment({
                address: shipmentValues.address,
                city: shipmentValues.city,
                country: shipmentValues.country,
                state: shipmentValues.state,
                zipcode: shipmentValues.zipcode,
                ApplicationUserId: userId
            });

            console.log(shipment.result.shipmentId);
            console.log(payment.result);

            // Create Order
            const order = await CreateOrderAPI({
                paymentId: payment.result.id,
                shipmentId: shipment.result.shipmentId,
                applicationUserId: userId,
                totalPrice: totalPrice
            });

            console.log(order.result);

            // Create Order Items
            const orderItemPromises = orderItem.map(c =>
                CreateOrderItem({
                    orderId: order.id,
                    productId: c.productId,
                    quantity: c.quantity,
                    price: c.price
                })
            );

            await Promise.all(orderItemPromises);


            toast.success('Order placed successfully!');
            sessionStorage.removeItem('cart')
            nagivate('/orderconfirm',{state : {orderId: order.id,address : shipmentValues.address,country:shipmentValues.country,state:shipmentValues.state,city:shipmentValues.city}})
        } catch (error) {
            console.error('Error placing order:', error);
            toast.error('There was an error placing your order. Please try again.');
        }
    };


    return (
        <section className="bg-white py-8 antialiased dark:bg-gray-900 md:py-16" >
            <form action="#" className="mx-auto max-w-screen-xl px-4 2xl:px-0">


                <div className="mt-6 sm:mt-8 lg:flex lg:items-start lg:gap-12 xl:gap-16">
                    <div className="min-w-0 flex-1 space-y-8">
                        <div className="space-y-4">
                            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Delivery Details</h2>


                            <div>
                                <label for="address" className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"> Address </label>
                                <input type="text" id="address" name='address' className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500" placeholder="Enter your address" value={shipmentValues.address} onChange={handelInputChange} required />
                            </div>
                            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                <div>
                                    <label for="your_name" className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"> Your name </label>
                                    <input type="text" id="your_name" className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500" placeholder="Enter your name" required />
                                </div>

                                <div>
                                    <label for="your_email" className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"> Your email* </label>
                                    <input type="email" id="your_email" className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500" placeholder="name@flowbite.com" required />
                                </div>

                                <div>
                                    <div className="mb-2 flex items-center gap-2">
                                        <label for="select-country-input-3" className="block text-sm font-medium text-gray-900 dark:text-white"> Country* </label>
                                    </div>
                                    <select id="select-country-input-3" name='country' value={shipmentValues.country} onChange={handelInputChange} className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500">
                                        <option selected>United States</option>
                                        <option value="AS">Australia</option>
                                        <option value="FR">France</option>
                                        <option value="ES">Spain</option>
                                        <option value="UK">United Kingdom</option>
                                    </select>
                                </div>

                                <div>
                                    <div className="mb-2 flex items-center gap-2">
                                        <label for="select-city-input-3" className="block text-sm font-medium text-gray-900 dark:text-white"> City* </label>
                                    </div>
                                    <select id="select-city-input-3" name='city' value={shipmentValues.city} onChange={handelInputChange} className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500">
                                        <option selected>San Francisco</option>
                                        <option value="NY">New York</option>
                                        <option value="LA">Los Angeles</option>
                                        <option value="CH">Chicago</option>
                                        <option value="HU">Houston</option>
                                    </select>
                                </div>



                                <div>
                                    <label for="state" className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"> State </label>
                                    <input type="text" name="state" value={shipmentValues.state} onChange={handelInputChange} className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500" placeholder="State" required />
                                </div>

                                <div>
                                    <label for="zipcode" className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"> ZipCode </label>
                                    <input type="text" name="zipcode" value={shipmentValues.zipcode} onChange={handelInputChange} className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500" placeholder="Zipcode" required />
                                </div>



                                <div className="sm:col-span-2">
                                    <button type="submit" className="flex w-full items-center justify-center gap-2 rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white dark:focus:ring-gray-700">
                                        <svg className="h-5 w-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12h14m-7 7V5" />
                                        </svg>
                                        Add new address
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Payment</h3>

                            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                                <div className="rounded-lg border border-gray-200 bg-gray-50 p-4 ps-4 dark:border-gray-700 dark:bg-gray-800">
                                    <div className="flex items-start">
                                        <div className="flex h-5 items-center">
                                            <input id="pay-on-delivery" checked aria-describedby="pay-on-delivery-text" type="radio" name="payment-method" value="" className="h-4 w-4 border-gray-300 bg-white text-primary-600 focus:ring-2 focus:ring-primary-600 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-primary-600" />
                                        </div>

                                        <div className="ms-4 text-sm">
                                            <label for="pay-on-delivery" className="font-medium leading-none text-gray-900 dark:text-white"> Payment on delivery </label>
                                            <p id="pay-on-delivery-text" className="mt-1 text-xs font-normal text-gray-500 dark:text-gray-400">+$15 payment processing fee</p>
                                        </div>
                                    </div>


                                </div>
                                <div className="rounded-lg border border-gray-200 bg-gray-50 p-4 ps-4 dark:border-gray-700 dark:bg-gray-800">
                                    <div className="flex items-start">
                                        <div className="flex h-5 items-center">
                                            <input id="credit-card" disabled aria-describedby="credit-card-text" type="radio" name="payment-method" value="" className="h-4 w-4 border-gray-300 bg-white text-primary-600 focus:ring-2 focus:ring-primary-600 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-primary-600" />
                                        </div>

                                        <div className="ms-4 text-sm">
                                            <label for="credit-card" className="font-medium leading-none text-gray-900 dark:text-white"> Credit Card </label>
                                            <p id="credit-card-text" className="mt-1 text-xs font-normal text-gray-500 dark:text-gray-400">Pay with your credit card</p>
                                        </div>
                                    </div>


                                </div>



                                <div className="rounded-lg border border-gray-200 bg-gray-50 p-4 ps-4 dark:border-gray-700 dark:bg-gray-800">
                                    <div className="flex items-start">
                                        <div className="flex h-5 items-center">
                                            <input id="paypal-2" disabled aria-describedby="paypal-text" type="radio" name="payment-method" value="" className="h-4 w-4 border-gray-300 bg-white text-primary-600 focus:ring-2 focus:ring-primary-600 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-primary-600" />
                                        </div>

                                        <div className="ms-4 text-sm">
                                            <label for="paypal-2" className="font-medium leading-none text-gray-900 dark:text-white"> Paypal account </label>
                                            <p id="paypal-text" className="mt-1 text-xs font-normal text-gray-500 dark:text-gray-400">Connect to your account</p>
                                        </div>
                                    </div>


                                </div>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Delivery Methods</h3>

                            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                                <div className="rounded-lg border border-gray-200 bg-gray-50 p-4 ps-4 dark:border-gray-700 dark:bg-gray-800">
                                    <div className="flex items-start">
                                        <div className="flex h-5 items-center">
                                            <input id="dhl" onChange={handleDeliveryMethod} aria-describedby="dhl-text" type="radio" name="delivery-method" value="DHL" className="h-4 w-4 border-gray-300 bg-white text-primary-600 focus:ring-2 focus:ring-primary-600 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-primary-600" checked={deliveryMethod === 'DHL'} />
                                        </div>

                                        <div className="ms-4 text-sm">
                                            <label for="dhl" className="font-medium leading-none text-gray-900 dark:text-white"> $15 - DHL Fast Delivery </label>
                                            <p id="dhl-text" className="mt-1 text-xs font-normal text-gray-500 dark:text-gray-400">Get it by Tommorow</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="rounded-lg border border-gray-200 bg-gray-50 p-4 ps-4 dark:border-gray-700 dark:bg-gray-800">
                                    <div className="flex items-start">
                                        <div className="flex h-5 items-center">
                                            <input id="fedex" onChange={handleDeliveryMethod} aria-describedby="fedex-text" type="radio" name="delivery-method" value="FED" className="h-4 w-4 border-gray-300 bg-white text-primary-600 focus:ring-2 focus:ring-primary-600 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-primary-600" checked={deliveryMethod === 'FED'} />
                                        </div>

                                        <div className="ms-4 text-sm">
                                            <label for="fedex" className="font-medium leading-none text-gray-900 dark:text-white"> Free Delivery - FedEx </label>
                                            <p id="fedex-text" className="mt-1 text-xs font-normal text-gray-500 dark:text-gray-400">Get it by Friday, 13 Dec 2023</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="rounded-lg border border-gray-200 bg-gray-50 p-4 ps-4 dark:border-gray-700 dark:bg-gray-800">
                                    <div className="flex items-start">
                                        <div className="flex h-5 items-center">
                                            <input id="express" onChange={handleDeliveryMethod} checked={deliveryMethod === 'EX'} aria-describedby="express-text" type="radio" name="delivery-method" value="EX" className="h-4 w-4 border-gray-300 bg-white text-primary-600 focus:ring-2 focus:ring-primary-600 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-primary-600" />
                                        </div>

                                        <div className="ms-4 text-sm">
                                            <label for="express" className="font-medium leading-none text-gray-900 dark:text-white"> $49 - Express Delivery </label>
                                            <p id="express-text" className="mt-1 text-xs font-normal text-gray-500 dark:text-gray-400">Get it today</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div>
                            <label for="voucher" className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"> Enter a gift card, voucher or promotional code </label>
                            <div className="flex max-w-md items-center gap-4">
                                <input type="text" id="voucher" disabled className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500" placeholder="" required />
                                <button type="button" disabled className="flex items-center justify-center rounded-lg bg-gray-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-gray-800 focus:outline-none focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Apply</button>
                            </div>
                        </div>
                    </div>

                    <div className="mt-6 w-full space-y-6 sm:mt-8 lg:mt-0 lg:max-w-xs xl:max-w-md">
                        <div className="flow-root">
                            <div className="-my-3 divide-y divide-gray-200 dark:divide-gray-800">
                                <dl className="flex items-center justify-between gap-4 py-3">
                                    <dt className="text-base font-normal text-gray-500 dark:text-gray-400">Subtotal</dt>
                                    <dd className="text-base font-medium text-gray-900 dark:text-white">{totalPrice}</dd>
                                </dl>

                                <dl className="flex items-center justify-between gap-4 py-3">
                                    <dt className="text-base font-normal text-gray-500 dark:text-gray-400">Delivery</dt>
                                    <dd className="text-base font-medium text-gray-900">0</dd>
                                </dl>

                                <dl className="flex items-center justify-between gap-4 py-3">
                                    <dt className="text-base font-normal text-gray-500 dark:text-gray-400 capitalize">Payment process fee </dt>
                                    <dd className="text-base font-medium text-gray-900">0</dd>
                                </dl>


                                <dl className="flex items-center justify-between gap-4 py-3">
                                    <dt className="text-base font-bold text-gray-900 dark:text-white">Total</dt>
                                    <dd className="text-base font-bold text-gray-900 dark:text-white">{totalCost}</dd>
                                </dl>
                            </div>
                        </div>

                        <div className="space-y-3">
                            <button onClick={handleConfirmOrder} className="flex w-full items-center justify-center rounded-lg bg-primary-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-primary-800 focus:outline-none focus:ring-4  focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Proceed to Payment</button>

                            <p className="text-sm font-normal text-gray-500 dark:text-gray-400">One or more items in your cart require an account. <a href="#" title="" className="font-medium text-primary-700 underline hover:no-underline dark:text-primary-500">Sign in or create an account now.</a>.</p>
                        </div>
                    </div>
                </div>
            </form>
        </section>
    )
}

export default CreateOrder