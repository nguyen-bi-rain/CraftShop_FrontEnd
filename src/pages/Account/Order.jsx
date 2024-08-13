import React, { useState }  from 'react';
import OrderItem from '../../components/Order/OrderItem';

const Order = () => {

  const [isOpen, setIsOpen] = useState(false)

  return (
    <div>
      <div className='flex justify-between'>
        <h2 className='font-bold text-xl'>All Orders</h2>
        <div className="flex items-center justify-center flex-col relative">
          <button
            onClick={() => setIsOpen(!isOpen)}
            id="dropdownDefault"
            className="text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-4 py-2 text-center inline-flex items-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
            type="button"
          >
            Filter
            <svg
              className="w-4 h-4 ml-2"
              aria-hidden="true"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </button>

          {isOpen === true ? <div id="dropdown" className="transition ease-in-out delay-200 absolute top-10 left-0 z-10 mt-2 w-56 p-3 bg-white rounded-lg shadow dark:bg-gray-700">
            <ul className="space-y-2 text-sm">
              <li className="flex items-center">
                <input
                  id="apple"
                  type="checkbox"
                  value=""
                  className="w-4 h-4 bg-gray-100 border-gray-300 rounded text-primary-600 focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                />
                <label
                  htmlFor="apple"
                  className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-100"
                >
                  Apple (56)
                </label>
              </li>
            </ul>
          </div> : ""}
        </div>
      </div>
      <OrderItem/>
    </div>
  );
};

export default Order;
