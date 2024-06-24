import React, { useEffect, useState } from 'react';
import ProductItem from '../ProductItem/ProductItem';
import {fetchData} from '../../services/index';

const ProductList = ({ numberItems, number }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchData(1,5).then((res) => {
      setData(res.data.result);
    });
  }, []);
  const gridClass = numberItems === 5
    ? 'grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-5'
    : 'grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-5';
  return (
    <div className={gridClass}>
      {data.map((x, i) =>
        <div  key={i}>
          <ProductItem id={x.id} image={x.productImage?.imageThumb} name={x.productName} description={x.productDescription} price={x.productPrice} />
        </div>
      )}
    </div>
  );
};

export default ProductList;