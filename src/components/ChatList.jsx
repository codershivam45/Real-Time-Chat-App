// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react'
import AddUser from './AddUser'


const ChatList = () => {
    const [add, setadd] = useState(false)
    
    return (
        <>
        
        <div className=''>
            <div className="search p-4 flex items-center justify-between ">
                <div className="flex bg-[#4A4A58] border border-transparent hover:border-white items-center p-1 rounded w-[85%]">
                    <img src="./search.png" alt="" width="24" />
                    <input
                        type="text"
                        className="bg-[#4A4A58] text-white focus:outline-none ml-2"
                        placeholder="Search..."
                    />
                </div>
                <div className="add bg-[#4A4A58] p-2 rounded"><img src={add ? './minus.png' : './plus.png'} alt="" width="18" onClick={() => { setadd((prev) => { return !prev }) }} className="cursor-pointer" /></div>
            </div>
            <div className="list">
                <div className='hover:bg-[#5A5A68]'>
                    <div className='text-white flex m-4 py-2 gap-2 border border-transparent border-b-[#b9b7b71d] '>
                        <div className='w-[36px] h-[36px]  rounded-[50%] overflow-clip'>
                            <img src="./avatar.png" alt="" className='w-[36px] h-[36px] brightness-200' />
                        </div>
                        <div className="text">
                            <div className="name">Ava Thomas</div>
                            <div className="lastmsg text-sm text-gray-500">Hey what are you doing</div>
                        </div>
                    </div>
                </div>
                <div className='hover:bg-[#5A5A68]'>
                    <div className='text-white flex m-4 py-2 gap-2 border border-transparent border-b-[#b9b7b71d] '>
                        <div className='w-[36px] h-[36px]  rounded-[50%] overflow-clip'>
                            <img src="./avatar.png" alt="" className='w-[36px] h-[36px] brightness-200' />
                        </div>
                        <div className="text">
                            <div className="name">Ava Thomas</div>
                            <div className="lastmsg text-sm text-gray-500">Hey what are you doing</div>
                        </div>
                    </div>
                </div>
                <div className='hover:bg-[#5A5A68]'>
                    <div className='text-white flex m-4 py-2 gap-2 border border-transparent border-b-[#b9b7b71d] '>
                        <div className='w-[36px] h-[36px]  rounded-[50%] overflow-clip'>
                            <img src="./avatar.png" alt="" className='w-[36px] h-[36px] brightness-200' />
                        </div>
                        <div className="text">
                            <div className="name">Ava Thomas</div>
                            <div className="lastmsg text-sm text-gray-500">Hey what are you doing</div>
                        </div>
                    </div>
                </div>
                <div className='hover:bg-[#5A5A68]'>
                    <div className='text-white flex m-4 py-2 gap-2 border border-transparent border-b-[#b9b7b71d] '>
                        <div className='w-[36px] h-[36px]  rounded-[50%] overflow-clip'>
                            <img src="./avatar.png" alt="" className='w-[36px] h-[36px] brightness-200' />
                        </div>
                        <div className="text">
                            <div className="name">Ava Thomas</div>
                            <div className="lastmsg text-sm text-gray-500">Hey what are you doing</div>
                        </div>
                    </div>
                </div>
                <div className='hover:bg-[#5A5A68]'>
                    <div className='text-white flex m-4 py-2 gap-2 border border-transparent border-b-[#b9b7b71d] '>
                        <div className='w-[36px] h-[36px]  rounded-[50%] overflow-clip'>
                            <img src="./avatar.png" alt="" className='w-[36px] h-[36px] brightness-200' />
                        </div>
                        <div className="text">
                            <div className="name">Ava Thomas</div>
                            <div className="lastmsg text-sm text-gray-500">Hey what are you doing</div>
                        </div>
                    </div>
                </div>
                <div className='hover:bg-[#5A5A68]'>
                    <div className='text-white flex m-4 py-2 gap-2 border border-transparent border-b-[#b9b7b71d] '>
                        <div className='w-[36px] h-[36px]  rounded-[50%] overflow-clip'>
                            <img src="./avatar.png" alt="" className='w-[36px] h-[36px] brightness-200' />
                        </div>
                        <div className="text">
                            <div className="name">Ava Thomas</div>
                            <div className="lastmsg text-sm text-gray-500">Hey what are you doing</div>
                        </div>
                    </div>
                </div>
                <div className='hover:bg-[#5A5A68]'>
                    <div className='text-white flex m-4 py-2 gap-2 border border-transparent border-b-[#b9b7b71d] '>
                        <div className='w-[36px] h-[36px]  rounded-[50%] overflow-clip'>
                            <img src="./avatar.png" alt="" className='w-[36px] h-[36px] brightness-200' />
                        </div>
                        <div className="text">
                            <div className="name">Ava Thomas</div>
                            <div className="lastmsg text-sm text-gray-500">Hey what are you doing</div>
                        </div>
                    </div>
                </div>
                <div className='hover:bg-[#5A5A68]'>
                    <div className='text-white flex m-4 py-2 gap-2 border border-transparent border-b-[#b9b7b71d] '>
                        <div className='w-[36px] h-[36px]  rounded-[50%] overflow-clip'>
                            <img src="./avatar.png" alt="" className='w-[36px] h-[36px] brightness-200' />
                        </div>
                        <div className="text">
                            <div className="name">Ava Thomas</div>
                            <div className="lastmsg text-sm text-gray-500">Hey what are you doing</div>
                        </div>
                    </div>
                </div>
                <div className='hover:bg-[#5A5A68]'>
                    <div className='text-white flex m-4 py-2 gap-2 border border-transparent border-b-[#b9b7b71d] '>
                        <div className='w-[36px] h-[36px]  rounded-[50%] overflow-clip'>
                            <img src="./avatar.png" alt="" className='w-[36px] h-[36px] brightness-200' />
                        </div>
                        <div className="text">
                            <div className="name">Ava Thomas</div>
                            <div className="lastmsg text-sm text-gray-500">Hey what are you doing</div>
                        </div>
                    </div>
                </div>

               
                
                
            </div>
        </div>
        {add && <AddUser/>}
        </>
    )
}

export default ChatList
