import './App.css';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
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
import { PATH } from './constant/index';
import { AuthProvidder, UseAuth } from './Context/AuthContext';
import ComfirmOrder from './components/Order/ComfirmOrder';


function AuthenticateRoute({children}) {
  const Auth = UseAuth()
  console.log(Auth.auth);
  return Auth.auth ? children : <Navigate to='/signin' />

}

export default function App() {
  
  return (
    <>
      <AuthProvidder>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route path={PATH.HOME} element={<Home />} />
              <Route path={PATH.PRODUCT} element={<Product />} />
              <Route path={`${PATH.PRODUCT}/:id`} element={<AuthenticateRoute><ProductDetail /></AuthenticateRoute>} /> {/* add the new route */}
              <Route path={PATH.LOGIN} element={<Signin />} />
              <Route path={PATH.REGISTER} element={<Signup />} />
              <Route path={PATH.CART} element={<AuthenticateRoute><Cart /></AuthenticateRoute>} />
              <Route path='/editaccount' element={<AuthenticateRoute><Account/></AuthenticateRoute>} />
              <Route path={PATH.ACCOUNT} element={<AuthenticateRoute><Account/></AuthenticateRoute>} />
              <Route path='/orders' element={<AuthenticateRoute><Account/></AuthenticateRoute>} />
              <Route path='/action' element={<AuthenticateRoute><Account/></AuthenticateRoute>} />
              <Route path='/orderconfirm' element={<AuthenticateRoute><ComfirmOrder/></AuthenticateRoute>}/>
            </Route>

          </Routes>
          <ToastContainer
            closeOnClick
            autoClose={2000}
            position="top-right"
            pauseOnHover={false}
          />
        </BrowserRouter>
      </AuthProvidder>
    </>
  );
}