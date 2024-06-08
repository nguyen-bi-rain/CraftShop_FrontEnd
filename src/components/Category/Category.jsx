import React from 'react'
import IMG from "../../assets/handi.png"


const CategyItem = (props) => {
    return (
        <div>
            <img src={props.categoryImage} alt="category" className='w-40 h-40 rounded-full' />
            <h3 className='text-center text-white text-xl font-medium'>
                {props.categoryName}
            </h3>
        </div>
    )
}

const Category = () => {
    const category = [
        {
            src: IMG,
            name: "Handicraft Items"
        },
        {
            src: IMG,
            name: "Water Fountains"
        },
        {
            src: IMG,
            name: "Buddha Idols"
        },
        {
            src: IMG,
            name: "Pendulum Clocks"
        },
        {
            src: IMG,
            name: "Wall Hangings"
        },
        {
            src: IMG,
            name: "Buddha Paintings"
        }

    ]
    return (
        <div className='bg-[#778C7E] py-8 px-5 md:flex grid grid-cols-3 justify-center align-middle gap-10 mb-5'>
            {category.map((cate,i) => <CategyItem key={i} categoryName={cate.name} categoryImage={cate.src} />)}
        </div>
    )
}

export default Category