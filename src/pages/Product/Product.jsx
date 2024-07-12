import { useEffect, useState } from "react"
import FilterItem from "../../components/FilterItem/FilterItem"
import ProductList from "../../components/ProductList/ProductList"
import { fetchData } from "../../services"
import ReactPaginate from 'react-paginate'
import './style.css'

const Product = () => {
  const filter = [
    { text: "state" },
    { text: "Coopper" },
    { text: "Bardot" },
    { text: "Alfani" },
    { text: "Cece" },
    { text: "Donna ricco" }
  ]
  const [data, setData] = useState([])
  const [totalItems, setToalItems] = useState(0)
  const [totalPage, setTotalPage] = useState(0)
  useEffect(() => {
    callApi(1)
  }, [])

  const callApi = async (page) => {
    await fetchData(2, page).then((res) => {
      console.log(res);
      setData(res.data.result)
      setTotalPage(res.pagination.TotalPage)
      setToalItems(res.pagination.TotalCount)
    })
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
          <FilterItem filterBy="Price" filteValue={filter} />
        </div>
      </div>
      <div className='col-start-2 col-end-10'>
        <div className="flex justify-between">
          <p>{totalItems} item found</p>
          <select className="border-[1px] px-3 py-2 border-black capitalize " onChange={(e) =>handleFilter(e)}>
            <option value="null">----select price----</option>
            <option value="1">price (high to low)</option>
            <option value="2">price (low to high)</option>
          </select>
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