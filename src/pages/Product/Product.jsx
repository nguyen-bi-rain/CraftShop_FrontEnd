import { useEffect, useState } from "react"
import FilterItem from "../../components/FilterItem/FilterItem"
import ProductList from "../../components/ProductList/ProductList"
import { fetchCategory, fetchData } from "../../services"
import ReactPaginate from 'react-paginate'
import { CiSearch } from "react-icons/ci";

import './style.css'

const Product = () => {
  const [filter, setFilter] = useState([])
  const [data, setData] = useState([])
  const [totalItems, setToalItems] = useState(0)
  const [totalPage, setTotalPage] = useState(0)

  const getCategory = async () => {
    await fetchCategory().then((res) => {
      console.log(res.result);
      setFilter(res.result)
    }).catch((err) => {
      console.log(err);
    })
  }

  const callApi = async (page) => {
    await fetchData(2, page).then((res) => {
      console.log(res);
      setData(res.data.result)
      setTotalPage(res.pagination.TotalPage)
      setToalItems(res.pagination.TotalCount)
    })
  }

  useEffect(() => {
    callApi(1)
  }, [])
  useEffect(() =>{
    getCategory()
    
  },[])
  
  const handelCategorySearch = () =>{
    await 
  }

  const handlePageClick = (event) => {
    callApi(event.selected + 1)
  }
  const handleFilter = (e) => {
    console.log(e.target.value);
    if (e.target.value === '1') {
      const sortData = data.sort((a, b) => b.productPrice - a.productPrice)
      setData([...sortData])

    } else if (e.target.value === '2') {
      const sortData = data.sort((a, b) => a.productPrice - b.productPrice)
      setData([...sortData])

    }
  }
  return (
    <div className='grid max-w-6xl mx-auto mt-14 gap-20'>
      <div className='col-start-1 col-end-2 '>
        <span className="font-medium text-sm">Home/Product</span>
        <h3 className="font-semibold text-2xl mb-7">Refine By</h3>
        <div >
          <FilterItem filterBy="Category" filteValue={filter} />
        
        </div>

        <div>
          {/* <FilterItem filterBy="Price" filteValue={filter} /> */}
        </div>
        <button onClick={() => handelCategorySearch()} className="px-4 py-2 rounded-sm text-white bg-[#913B10]">Filter </button>
      </div>
      <div className='col-start-2 col-end-10'>
        <div className="flex justify-between">
          <p>{totalItems} item found</p>
          <div className="flex gap-2 ">
            <select className="border-[1px] px-3 py-2 border-black capitalize " onChange={(e) => handleFilter(e)}>
              <option value="null">----select price----</option>
              <option value="1">price (high to low)</option>
              <option value="2">price (low to high)</option>
            </select>
            <div className="flex items-center bg-white px-2">
              <CiSearch className="w-5 h-5" />
              <input type="text" className="focus:outline-none" />
            </div>
          </div>
        </div>
        <ProductList number={12} numberItems={4} dataSet={data} />
        <ReactPaginate
          breakLabel="..."
          nextLabel="next >"
          onPageChange={handlePageClick}
          pageRangeDisplayed={5}
          pageCount={totalPage}
          previousLabel="< previous"
          renderOnZeroPageCount={null}
          containerClassName="pagination"
          activeClassName="current"

        />
      </div>
    </div>
  )
}

export default Product