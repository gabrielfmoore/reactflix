import React from 'react'

const TabbedPrimaryNav = () => {
  return (
    <ul className='justify-between hidden 2xl:flex px-[5px] gap-[18px] md:text-[8px] 2xl:text-[10px] font-[400] text-[clamp(10px,1vw,14px)]'>
        <li className='font-bold'>Home</li>
        <li>Shows</li>
        <li>Movies</li>
        <li>Games</li>
        <li>New & Popular</li>
        <li>My List</li>
        <li>Browse by Languages</li>
    </ul>
  )
}

export default TabbedPrimaryNav