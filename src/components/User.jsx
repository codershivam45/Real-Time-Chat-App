import React from 'react'
import useUserStore from '../lib/useStore'
const User = () => {
  const {currentUser}=useUserStore();

  // console.log(currentUser.avatar);
  return (
    <div className='flex p-4 justify-between items-center text-white bg-[#110f0f49] sticky top-0 z-10 opacity-100 backdrop-blur-3xl'>
      <div className='flex  items-center gap-2'>
        <div className='w-[48px] h-[48px]  rounded-[50%] overflow-clip'>
          <img src={currentUser.avatar? currentUser.avatar :'./avatar.png'} alt="" className='w-[48px] h-[48px] ' />
        </div>
        <div className=' text-lg cursor-pointer'>{currentUser.username}</div>
      </div>
      <div className='flex gap-2 items-center '>
        <div><img src="./edit.png" alt="" width="20" className='cursor-pointer' /></div>
        <div><img src="./more.png" alt=""  width="20" className='cursor-pointer'/></div>
      </div>
    </div>
  )
}

export default User
