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
import { FaSellcast } from 'react-icons/fa';

export default function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route path='/' element={<Home />} />
            <Route path='/product' element={<Product />} />
            <Route path='/product/:id' element={<ProductDetail />} /> {/* add the new route */}
            <Route path='/signin' element={<Signin />} />
            <Route path='/signup' element={<Signup />} />
            <Route path='/cart' element={<Cart/>}/>
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