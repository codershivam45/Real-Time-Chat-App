import React from 'react'

const AddUser = () => {
  return (
      <div className='absolute top-0 bottom-0 left-0 right-0 w-max h-max p-2 rounded-md m-auto bg-[#110f0f49] backdrop-blur-3xl z-10'>
            <div className="search py-4 px-2  flex gap-2">
                <input type="text" placeholder='Enter Username ' className='py-1 rounded-md'  />
                <button className=" px-2 py-1 text-white bg-blue-500 rounded-md">Search </button>
            </div>
          <div className="list px-2 flex flex-col gap-5">
                <div className="user flex justify-between text-sm items-center">
                    
                    <div className="user-info text-white flex items-center gap-2">
                      <div className='w-[28px] h-[28px]  rounded-[50%] overflow-clip'>
                          <img src="./avatar.png" alt="" className='w-[28px] h-[28ppx] brightness-200' />
                      </div>
                      <span>Ava Thomas</span>
                    </div>
                  <button className=" px-2 py-1 text-white bg-blue-500 rounded-md">Add User</button>
                </div>
                <div className="user flex justify-between text-sm items-center">
                    
                    <div className="user-info text-white flex items-center gap-2">
                      <div className='w-[28px] h-[28px]  rounded-[50%] overflow-clip'>
                          <img src="./avatar.png" alt="" className='w-[28px] h-[28ppx] brightness-200' />
                      </div>
                      <span>Ava Thomas</span>
                    </div>
                  <button className=" px-2 py-1 text-white bg-blue-500 rounded-md">Add User</button>
                </div>
                <div className="user flex justify-between text-sm items-center">
                    
                    <div className="user-info text-white flex items-center gap-2">
                      <div className='w-[28px] h-[28px]  rounded-[50%] overflow-clip'>
                          <img src="./avatar.png" alt="" className='w-[28px] h-[28ppx] brightness-200' />
                      </div>
                      <span>Ava Thomas</span>
                    </div>
                  <button className=" px-2 py-1 text-white bg-blue-500 rounded-md">Add User</button>
                </div>
                <div className="user flex justify-between text-sm items-center">
                    
                    <div className="user-info text-white flex items-center gap-2">
                      <div className='w-[28px] h-[28px]  rounded-[50%] overflow-clip'>
                          <img src="./avatar.png" alt="" className='w-[28px] h-[28ppx] brightness-200' />
                      </div>
                      <span>Ava Thomas</span>
                    </div>
                  <button className=" px-2 py-1 text-white bg-blue-500 rounded-md">Add User</button>
                </div>
            </div>
    </div>
  )
}

export default AddUser
