import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = ({title,otherMaps}) => {
  return (
    <nav className='h-14 bg-gradient-to-r from-green-400 to-blue-500 flex items-center justify-between px-6 shadow-md'>
      <h1 className='text-2xl font-bold text-white'>{title}</h1>
      <div className='flex'>
        {otherMaps.map((map,index)=>{
          return (
            <Link key={index} to={map.link} className='mx-3 text-lg font-semibold text-white hover:text-green-200'>
              {map.name}
            </Link>
          )
        })}
      </div>
    </nav>
  )
}

export default Navbar
