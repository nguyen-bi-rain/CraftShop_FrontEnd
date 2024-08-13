// Account.js
import React from 'react';
import Info from './Info';
import EditAccount from './EditAccount';
import Order from './Order';
const Account = () => {

  // const [active ,setActive] = useState('/info'); 
  const path = window.location.pathname;
  var element = <Info />;
  if(path === '/action') {
    
    // element = <Action />;
  }else if(path === '/orders') {
    element = <Order />;
  }else if(path === '/editaccount') {
    element = <EditAccount />;
    // setActive(path);
  }


  return (
    <div>
      <div className='text-center mt-4'>
        <h4 className='text-[#828282]'>Home / Account</h4>
        <h1 className='text-2xl mt-3 font-semibold'>My Dashboard</h1>
      </div>
      <div className='max-w-4xl w-full mx-auto grid grid-cols-12 mt-9'>
        <div className='col-span-3 bg-white h-max list-none'>
          <a href='/account' className={`${path === '/account' ? 'px-2 py-2 bg-black text-white' :'px-2 py-2 block'} `}>Account Dashboard</a>
          <li className='px-2 py-2'>Account Information</li>
          <a href='/orders' className={`${path === '/orders' ? ' block px-2 py-2 bg-black text-white' :'px-2 py-2 block'} `}>Orders</a>
          <a href='/editaccount'  className={`${path === '/editaccount' ? 'block px-2 py-2 bg-black text-white' :'px-2 py-2 block'} `}>Settings</a>
        </div>
        <div className='bg-white col-span-9 p-9'>
          {element}
        </div>
      </div>
    </div>
  );
};

export default Account;
