import { useEffect, useState } from "react"
import FilterItem from "../../components/FilterItem/FilterItem"
import ProductItem from "../../components/ProductItem/ProductItem"
import ProductList from "../../components/ProductList/ProductList"
import { fetchData } from "../../services"


const Product = () => {
  const filter = [
    { text: "state" },
    { text: "Coopper" },
    { text: "Bardot" },
    { text: "Alfani" },
    { text: "Cece" },
    { text: "Donna ricco" }
  ]
  const [data,setData] = useState([])
  
  useEffect(() =>{
    fetchData().then((res) =>{
      console.log(res);
      setData(res.result)
    })
  },[])

  
  return (
    <div className='grid max-w-6xl mx-auto mt-14 gap-20'>
      <div className='col-start-1 col-end-2 '>
        <span className="font-medium text-sm">Home/Product</span>
        <h3 className="font-semibold text-2xl mb-7">Refine By</h3>
        <div >
          <FilterItem filterBy="Category" filteValue={filter} />
        </div>

        <div>
          <FilterItem filterBy="Price" filteValue={filter} />
        </div>
      </div>
      <div className='col-start-2 col-end-10'>
        <div className="flex justify-between">
          <p>1,000 item found</p>
          <select className="border-2 border-black">
            <option value="price(low to high)">price (high to low)</option>
            <option value="price(high to low)">price (low to high)</option>
          </select>
        </div>
        <ProductList number={12} numberItems={4} data={data}/>
      </div>
    </div>
  )
}

export default Product