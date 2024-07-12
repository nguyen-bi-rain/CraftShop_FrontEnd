import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './pages/Layout';
import Home from './pages/Home/Home';
import Product from './pages/Product/Product';
import ProductDetail from './pages/ProductDetail/ProductDetail'; // import the new page
import Signin from './auth/Signin'
import Signup from './auth/Signup';
import { ToastContainer } from 'react-toastify';
import Cart from './components/Cart/Cart';
import 'react-toastify/dist/ReactToastify.css';
import Account from './pages/Account/Account';
import { PATH } from './constant/path';

export default function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route path={PATH.HOME} element={<Home />} />
            <Route path={PATH.PRODUCT} element={<Product />} />
            <Route path={`${PATH.PRODUCT}/:id`} element={<ProductDetail />} /> {/* add the new route */}
            <Route path={PATH.LOGIN} element={<Signin />} />
            <Route path={PATH.REGISTER} element={<Signup />} />
            <Route path={PATH.CART} element={<Cart/>}/>
            <Route path='/editaccount' element={<Account />} />
            <Route path={PATH.ACCOUNT} element={<Account />} />
            <Route path='/orders' element={<Account />} />
            <Route path='/action' element={<Account />} />
          </Route>
          
        </Routes>
        <ToastContainer
          closeOnClick
          autoClose={2000}
          position="top-right"
          pauseOnHover={false}
        />
      </BrowserRouter>
    </>
  );
}