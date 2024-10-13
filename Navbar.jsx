import React from 'react'

const Navbar = () => {
  return (
    <div className="Navbar flex justify-evenly bg-[#998f42]  min-h-8 items-center">
        <span className='font-semibold text-lg'>ITask</span>
        <ul className='flex gap-5  ml-44 text-gray-600 '>
            <li className="cursor-pointer font-normal  transition-all hover:font-semibold hover:text-gray-900" >Home</li> 
             <li className="cursor-pointer font-normal trasistion-all hover:font-semibold hover:text-gray-900">Your Todos</li>
        </ul>
    </div>
  )
}

export default Navbar