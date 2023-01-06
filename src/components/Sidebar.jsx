
import { useState } from "react";
import { NavLink } from "react-router-dom";
import { RiCloseLine } from 'react-icons/ri';

import { logo } from '../assets';
import { links } from '../assets/constants';
import { HiOutlineMenu } from "react-icons/hi";


const NavLinks = ({ handlClick }) =>( 
  <div className="mt-10">
    {links.map((item) => (
      <NavLink className="flex flex-row justify-start items-center my-8 
      text-sm font-medium text-gray-400 hover:text-gray-600"
      key={item.name}
      to = {item.to}
      onClick = {() => handlClick && handlClick()}
      >
        <item.icon className="w-6 h-6 mr-2" />
        {item.name}
      </NavLink>
    ))}
  </div>
)

const Sidebar = () => {
  const [mobileMenu, setMobileMenu] = useState(false);
 
  return (
    <>
      <div className="md:flex hidden flex-col w-[240px] py-10 px-4 bg-gradient-to-tl from-black  to-gray-800">
        <img src={logo} alt="logo" className="w-full h-14 object-contain" />
        <div className="flex flex-row justify-center mt-2">
        <p className="font-extrabold text-transparent text-xl bg-clip-text bg-gradient-to-l from-red-500  to-purple-700"
        >Mel</p> 
        <p className="font-extrabold text-transparent text-xl bg-clip-text bg-gradient-to-r from-purple-500  to-orange-500">ody</p>   
        </div>
        
        <NavLinks />
      </div>
      <div className={ mobileMenu ? `absolute md:hidden block top-6 right-3` : `absolute md:hidden block top-6 left-3`}>
        {mobileMenu  ? <RiCloseLine onClick={()=> setMobileMenu(false)} className="w-6 h-6 text-white mr-2" />: <HiOutlineMenu onClick={()=> setMobileMenu(true)} className="w-6 h-6 text-white mr-2" />}
      </div>
      <div className={`absolute top-0 h-screen w-2/3 bg-gradient-to-tl from-white/10 to-[#483D8B] backdrop-blur-lg z-10 p-6 md:hidden smooth-transition ${mobileMenu ? 'left-0' : '-left-full'}`}>
        <img src={logo} alt="logo" className="w-full h-14 object-contain" />
        <div className="flex flex-row justify-center mt-2">
        <p className="font-extrabold text-transparent text-xl bg-clip-text bg-gradient-to-l from-red-500  to-purple-700"
        >Mel</p> 
        <p className="font-extrabold text-transparent text-xl bg-clip-text bg-gradient-to-r from-purple-500  to-orange-500">ody</p>   
        </div>
        <NavLinks handlClick={() => setMobileMenu(false)} />
      </div>
    </>
  )
};

export default Sidebar;
