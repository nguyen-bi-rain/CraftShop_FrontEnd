import React, { useEffect, useState } from 'react';
import ProductItem from '../ProductItem/ProductItem';
import { Link } from 'react-router-dom';

const ProductList = ({ numberItems, number }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("https://localhost:7188/api/Product/GetAllProduct")
      .then((res) => {
        return res.json()
      })
      .then((d) => {
        setData(d.result);
        console.log(d.result);
      })
      .catch((err) => {
        console.log("loi roi ");
      })
  }, []);
  const gridClass = numberItems === 5
    ? 'grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-5'
    : 'grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-5';
  return (
    <div className={gridClass}>
      {data.map((x, i) =>
        <Link to={`/product/${x.id}`} key={i}>
          <ProductItem key={i} image={x.productImage?.imageThumb} name={x.productName} description={x.productDescription} price={x.productPrice} />
        </Link>
      )}
    </div>
  );
};

export default ProductList;