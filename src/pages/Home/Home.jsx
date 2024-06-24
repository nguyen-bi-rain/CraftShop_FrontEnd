import Hero from '../../components/Hero/Hero'
import Category from '../../components/Category/Category'
import Material from '../../components/Material/Material'
import ProductList from '../../components/ProductList/ProductList'
import N from "../../assets/native1.svg"
import InfoImage from "../../assets/Insta_600x.png.png"
import styles from "./style.module.css"
import Item from "../../assets/items1.png"
import Item2 from "../../assets/items2.png"
import { Link } from 'react-router-dom'



const Home = () => {
  const Images = [
    {
      src: "https://ik.imagekit.io/tvlk/blog/2023/01/go-and-share-trai-nghiem-lam-gom-bat-trang-13.jpg"
    }
  ]

    
  return (
    <div>
      <div className='mb-3'>
        <Hero images={Images} />
      </div>
      <Category />
      <Material />
      <div className="container mx-auto mt-5 py-[3.125rem]">
        <div className='flex justify-between items-center mb-9'>
          <div>
            <span className="text-base font-medium text-[#282828] capitalize mb-3 block">Lorem ipsum</span>
            <h2 className="text-3xl font-medium text-[#282828] capitalize font-['Lora'] ">New Product <span className='inline-block w-[85px] h-[2px] bg-[#913B10] ml-1'></span></h2>
          </div>
          <div>
            <Link to='/product' className='text-medium text-base text-[#282828] px-5 py-[0.625rem] border-2 border-black hover:bg-black hover:text-white transition ease-in-out duration-150'>SEE ALL</Link>
          </div>
        </div>
        <div className='px-4'>
          <ProductList number={5} numberItems={5}/>
        </div>

      </div>
      <div className="flex justify-center  items-center">
        <div className="bg-[#913B10] font-['DM Sans'] flex rounded-full">
          <div className='py-7 px-14 border-r-[1px]'>
            <img src={N} alt='native' className='mx-auto mb-2' />
            <p className='text-xs text-white'>Support Independent Brands</p>
          </div>
          <div className='py-7 px-14 border-r-[1px]'>
            <img src={N} alt='native' className='mx-auto mb-2' />
            <p className='text-xs text-white'>Support Independent Brands</p>
          </div>
          <div className='py-7 px-14 border-r-[1px]'>
            <img src={N} alt='native' className='mx-auto mb-2' />
            <p className='text-xs text-white'>Support Independent Brands</p>
          </div>
          <div className='py-7 px-14'>
            <img src={N} alt='native' className='mx-auto mb-2' />
            <p className='text-xs text-white'>Support Independent Brands</p>
          </div>
        </div>
      </div>
      <div className='flex justify-center items-center  mx-auto py-12 container mt-5'>
        <div className={`mr-9 relative ${styles.image_behide}`}>
          <img src={InfoImage} alt="hehe" />
        </div>
        <div className='max-w-lg '>
          <span className="text-xs font-medium font['DM Sans'] uppercase">Lorem ipsum</span>
          <h3 className="text-3xl font-['Lora'] font-normal my-6">Lorem Ipsum is simply dummy text of the printing.</h3>
          <p className="text-base font-normal font['DM Sans']">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
        </div>
      </div>
      <div className="container mx-auto mt-5 py-[3.125rem]">
        <div className='flex justify-between items-center mb-9'>
          <div>
            <span className="text-base font-medium text-[#282828] capitalize mb-3 block">Lorem ipsum</span>
            <h2 className="text-3xl font-medium text-[#282828] capitalize font-['Lora'] ">New Product <span className='inline-block w-[85px] h-[2px] bg-[#913B10] ml-1'></span></h2>
          </div>
          <div>
            <Link to='/product' className='text-medium text-base text-[#282828] px-5 py-[0.625rem] border-2 border-black hover:bg-black hover:text-white transition ease-in-out duration-150'>SEE ALL</Link>
          </div>
        </div>
        <div className='px-4 mb-9'>
          <ProductList number={10} numberItems={5}/>
        </div>
        <div className="text-center">
          <Link to={'/product'} className='px-9 py-4 bg-[#778C7E] font-medium text-white'>VIEW ALL</Link>
        </div>
      </div>
      <div className='bg-[#913B10] pb-24 pt-16'>
        <div className="container mx-auto mt-5  ">
          <div className='flex justify-between items-center mb-9'>
            <div>
              <span className="text-base font-medium text-white capitalize mb-3 block">Lorem ipsum</span>
              <h2 className="text-3xl font-medium text-white capitalize font-['Lora'] ">New Product <span className='inline-block w-[85px] h-[2px] bg-white ml-1'></span></h2>
            </div>
            <div>
              <button className='text-medium text-base text-white px-5 py-[0.625rem] border-2 border-white hover:bg-white hover:text-black transition ease-in-out duration-150'>SEE ALL</button>
            </div>
          </div>
          <div className='grid grid-cols-3 gap-4'>
            <div className='grid grid-cols-2 gap-3'>
              <img src={Item} alt="items" />
              <img src={Item} alt="items" />
              <img src={Item} alt="items" />
              <img src={Item} alt="items" />
            </div>
            <div>
              <img src={Item2} alt="items" />
            </div>
            <div className='grid grid-cols-2 gap-3'>
              <img src={Item} alt="items" />
              <img src={Item} alt="items" />
              <img src={Item} alt="items" />
              <img src={Item} alt="items" />
            </div>
          </div>
          
        </div>
      </div>
    </div>
  )
}

export default Home