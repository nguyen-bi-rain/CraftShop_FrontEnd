import React from 'react'
import IMG from "../../assets/material.png"
import style from "./style.module.css"


const Material = () => {
    const data = [
        {
            src: IMG,
            name: "Iron"
        },
        {
            src: IMG,
            name: "Steel"
        },
        {
            src: IMG,
            name: "Brass"
        },
        {
            src: IMG,
            name: "Ceramic "
        },
        {
            src: IMG,
            name: "Terracotta"
        },
        {
            src: IMG,
            name: "Wood"
        },

    ]
    return (
        <div className='md:flex grid grid-cols-2 justify-center align-middle gap-5 px-5 '>
            {data.map((d,i) => {
                return (
                    <div className={`${style.container}`} key={i}>
                        <img src={d.src} alt="" />
                        <h3 className={`${style.center_text} text-white font-medium text-base`} >{d.name}</h3>
                    </div>
                )
            })}
        </div>
    )
}

export default Material