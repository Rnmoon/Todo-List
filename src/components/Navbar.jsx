import React from 'react'

const Home = () => {
  return (
    <div className=' bg-[#322f82] text-white flex justify-around py-3'>
        <div className="logo font-bold text-xl cursor-pointer">iTask</div>
        <nav>
          <ul className='flex gap-10 font-semibold '>
            <li className='cursor-pointer'>Home</li>
            <li className='cursor-pointer'>Your Task</li>
          </ul>
        </nav>
    </div>
  )
}

export default Home
