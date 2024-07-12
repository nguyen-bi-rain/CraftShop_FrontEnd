import ProductItem from '../ProductItem/ProductItem';

const ProductList = ({ numberItems, number ,dataSet}) => {


  const gridClass = numberItems === 5
    ? 'grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-5'
    : 'grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-5';
  return (
    <div className={gridClass}>
      {dataSet.map((x, i) =>
        <div  key={i}>
          <ProductItem id={x.id} image={x.productImage?.imageThumb} name={x.productName} description={x.productDescription} price={x.productPrice} />
        </div>
      )}
    </div>
  );
};

export default ProductList;