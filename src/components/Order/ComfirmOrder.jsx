import React from 'react'
import { date } from 'yup'

const ComfirmOrder = (orderId,address,country,state,city) => {
    const formatDate = (dateStr) => {
        // Parse the date string to a Date object
        const dateObj = new Date(dateStr);

        // Format the date object to the desired format
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        return dateObj.toLocaleDateString('en-GB', options);
    };
    return (
        <section class="bg-white py-8 antialiased dark:bg-gray-900 md:py-16">
            <div class="mx-auto max-w-2xl px-4 2xl:px-0">
                <h2 class="text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl mb-2">Thanks for your order!</h2>
                <p class="text-gray-500 dark:text-gray-400 mb-6 md:mb-8">Your order <a href="#" class="font-medium text-gray-900 dark:text-white hover:underline">#7564804</a> will be processed within 24 hours during working days. We will notify you by email once your order has been shipped.</p>
                <div class="space-y-4 sm:space-y-2 rounded-lg border border-gray-100 bg-gray-50 p-6 dark:border-gray-700 dark:bg-gray-800 mb-6 md:mb-8">
                    <dl class="sm:flex items-center justify-between gap-4">
                        <dt class="font-normal mb-1 sm:mb-0 text-gray-500 dark:text-gray-400">Date</dt>
                        <dd class="font-medium text-gray-900 dark:text-white sm:text-end">{formatDate(new Date())}</dd>
                    </dl>
                    <dl class="sm:flex items-center justify-between gap-4">
                        <dt class="font-normal mb-1 sm:mb-0 text-gray-500 dark:text-gray-400">Payment Method</dt>
                        <dd class="font-medium text-gray-900 dark:text-white sm:text-end">Cash on Delivery</dd>
                    </dl>
                    <dl class="sm:flex items-center justify-between gap-4">
                        <dt class="font-normal mb-1 sm:mb-0 text-gray-500 dark:text-gray-400">Name</dt>
                        <dd class="font-medium text-gray-900 dark:text-white sm:text-end">{sessionStorage.getItem("userName")}</dd>
                    </dl>
                    <dl class="sm:flex items-center justify-between gap-4">
                        <dt class="font-normal mb-1 sm:mb-0 text-gray-500 dark:text-gray-400">Address</dt>
                        <dd class="font-medium text-gray-900 dark:text-white sm:text-end">{`${address}, ${city}, ${state}, ${country}`}</dd>
                    </dl>
                    <dl class="sm:flex items-center justify-between gap-4">
                        <dt class="font-normal mb-1 sm:mb-0 text-gray-500 dark:text-gray-400">Phone</dt>
                        <dd class="font-medium text-gray-900 dark:text-white sm:text-end">{sessionStorage.getItem("userPhone")}</dd>
                    </dl>
                </div>
                <div class="flex items-center space-x-4">
                    <a href="#" class="text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800">Track your order</a>
                    <a href="#" class="py-2.5 px-5 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">Return to shopping</a>
                </div>
            </div>
        </section>
    )
}

export default ComfirmOrder