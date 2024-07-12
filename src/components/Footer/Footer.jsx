import GGP from "../../assets/GooglePlay.svg"
import APP from "F:/document/CraftShop/frontend/src/assets/AppStore.svg"
import ORI from "../../assets/Original.svg"
import BOX from "../../assets/box.svg"
import { FaSquareFacebook } from "react-icons/fa6";
import { BsTwitterX } from "react-icons/bs";
import { IoLogoYoutube } from "react-icons/io";
import { ImInstagram } from "react-icons/im";
const Footer = () => {
    return (
        <footer className="bg-[#778C7E] w-screen sm:p-0 font-['Poppins'] md:pt-12 mt-8">
            <div className="md:max-w-5xl w-full h-full mx-auto  text-white md:flex gap-16  pb-8 border-b-[1px]">    
                <div>   
                    <div className="capitalize mb-6">
                        <h5 className="uppercase font-medium text-sm mb-5">online shopping</h5>
                        <div className="flex text-sm flex-col gap-1">
                            <p>men</p>
                            <p>women</p>
                            <p>kids</p>
                            <p>home & living </p>
                            <p>beauty</p>
                            <p>gift cards </p>
                        </div>
                    </div>
                    <div className="capitalize ">
                        <h5 className="uppercase font-medium text-sm mb-5">usefull links</h5>
                        <div className="flex text-sm flex-col gap-1">
                            <p>blog</p>
                            <p>careers</p>
                            <p>site map </p>
                            <p>Corporate Information </p>
                            <p>Whitehat</p>
                        </div>
                    </div>
                </div>
                <div className="capitalize ">
                    <h5 className="uppercase font-medium text-sm mb-5">usefull links</h5>
                    <div className="flex text-sm flex-col gap-1">
                        <p>blog</p>
                        <p>careers</p>
                        <p>site map </p>
                        <p>Corporate Information </p>
                        <p>Whitehat</p>
                    </div>

                </div>
                <div className="capitalize ">
                    <div className="mb-6">
                        <h5 className="uppercase font-medium text-sm mb-5">usefull links</h5>
                        <div className="text-sm flex">
                            <img className="mr-3" src={GGP} alt="google play" />
                            <img className="" src={APP} alt="app store" />
                        </div>
                    </div>
                    <div>
                        <h5 className="uppercase font-medium text-sm mb-5">usefull links</h5>
                        <div className="flex text-2xl gap-3 ">
                            <FaSquareFacebook />
                            <BsTwitterX />
                            <IoLogoYoutube />
                            <ImInstagram />
                        </div>
                    </div>


                </div>
                <div>
                    <div className="flex items-center gap-3 mb-5">
                        <div>
                            <img src={ORI} alt="origin" />
                        </div>
                        <div>
                            <p className="text-sm font-semibold">100% ORIGINAL guarantee</p>
                            <p className="text-sm font-normal">for all products</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                        <div>
                            <img src={BOX} alt="origin" />
                        </div>
                        <div>
                            <p className="text-sm font-semibold">Return within 30days</p>
                            <p className="text-sm font-normal">Return within 30days</p>
                        </div>
                    </div>
                </div>
                
            </div>
            <div className="md:flex max-w-5xl mx-auto text-white justify-between py-3 px-0">
                <p>In case of any concern, Contact Us</p>
                <p>© 2023 www.dreamkart.com. All rights reserved.</p>
            </div>
        </footer>
    )
}

export default Footer