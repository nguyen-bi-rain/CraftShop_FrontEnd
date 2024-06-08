import './App.css';
import { BrowserRouter, Routes, Route, useParams } from 'react-router-dom';
import Layout from './pages/Layout';
import Home from './pages/Home/Home';
import Product from './pages/Product/Product';
import ProductDetail from './pages/ProductDetail/ProductDetail'; // import the new page

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path='/' element={<Home />} />
          <Route path='/product' element={<Product />} />
          <Route path='/product/:id' element={<ProductDetail />} /> {/* add the new route */}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}