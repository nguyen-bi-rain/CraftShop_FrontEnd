import React, {useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

const Blog = (props) => {
  const param =useParams()
    // const  [data,setData] = useState([])

    // useEffect(() =>{
    //     fetch("https://localhost:7188/api/Product/GetAllProduct")
    //     .then((res) =>{
    //         return res.json()
    //     }).then((data) =>{
    //         console.log(data.result);
    //         setData(data.result)
    //     })
    // },[])
  return (
    <div className="text-cyan-500">Blog {param.id}</div>
  )
}

export default Blog