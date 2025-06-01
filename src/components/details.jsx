// eslint-disable-next-line no-unused-vars
import React from 'react'
import useUserStore from '../lib/useStore'
import chatStore from '../lib/chatStore';
// import { toast } from 'react-toastify';

const Details = () => {
    const { logout, currentUser } = useUserStore();
    const { receiverUser, toggleBlock } = chatStore();
    console.log(receiverUser , currentUser)
    const handleLogout = () => {
        logout();
    }
    return (
        <div className='text-white bg-gradient-to-b from-[#0f0f0f] to-[#1a1a1a] h-[100vh]' >
            <div className="user flex flex-col items-center mt-0 m-4 gap-4 py-6 border-b border-gray-800/50 sticky top-0 backdrop-blur-xl bg-[#1a1a1a]/80">
                <div className='relative'>
                    <div className='w-[120px] h-[120px] rounded-[50%] overflow-clip border-2 border-gray-700 shadow-lg'>
                        <img src={receiverUser.avatar && !receiverUser.isReceiverBlocked ? receiverUser.avatar : "./avatar.png"} alt="" className='w-[120px] h-[120px] object-cover' />
                    </div>
                    {/* {!receiverUser.isSenderBlocked && <div className="absolute bottom-2 right-2 w-4 h-4 bg-green-500 rounded-full border-2 border-[#1a1a1a]"></div>} */}
                </div>
                <div className="text">
                    <div className="name text-2xl font-semibold text-center">{receiverUser?.username && !receiverUser.isReceiverBlocked  ? receiverUser.username : "User"}</div>
                    {!receiverUser.isReceiverBlocked && <div className="desc text-md text-gray-400 text-center mt-1">Available</div>}
                </div>
            </div>
            <div className="other flex flex-col p-4 gap-4">
                {/* <div className="chatSettings px-4 py-2">
                    <div className="head flex justify-between">
                        <div className="heading">Chat Settings  </div>
                        <div className="icon bg-[#4A4A58] flex justify-center p-2 rounded-full items-center cursor-pointer"><img src="./arrowDown.png" alt="" width="12" /></div>
                    </div>
                    <div className="content"></div>
                </div> */}
                {/* <div className="Privacy px-4 py-2">
                    <div className="head flex justify-between">
                        <div className="heading">Privacy</div>
                        <div className="icon bg-[#4A4A58] flex justify-center p-2 rounded-full items-center cursor-pointer"><img src="./arrowDown.png" alt="" width="12" /></div>
                    </div>
                    <div className="content"></div>
                </div> */}
                {/* <div className="SharedPhotos px-4 py-2">
                    <div className="head flex justify-between">
                        <div className="heading">Shared Photos</div>
                        <div className="icon bg-[#4A4A58] flex justify-center p-2 rounded-full items-center cursor-pointer"><img src="./arrowDown.png" alt="" width="12" /></div>
                    </div>
                    <div className="content py-3 flex flex-col gap-2">

                        <div className="photo flex justify-between items-center">
              <div className="img flex items-center gap-2  ">
                <div><img src="https://th.bing.com/th/id/OIP.GvntOdvz80txbfbW4rz2kAHaEo?w=1920&h=1200&rs=1&pid=ImgDetMain" alt="" width="32" /></div>
                <div className="name text-sm text-gray-300">photo_10.12.2024</div>
              </div>
              <div className="icon"><img src="./download.png" alt="" width="16" /></div>
            </div>
                    </div>
                </div> */}
                {/* <div className="SharedFiles px-4 py-2">
                    <div className="head flex justify-between">
                        <div className="heading">Shared Files</div>
                        <div className="icon bg-[#4A4A58] flex justify-center p-2 rounded-full items-center cursor-pointer"><img src="./arrowDown.png" alt="" width="12" /></div>
                    </div>
                    <div className="content"></div>
                </div> */}
                <div className="blockUser flex justify-center">
                    <button
                        className={`p-3 rounded-xl w-full transition-all duration-200 font-medium ${receiverUser.isSenderBlocked
                            ? 'bg-green-500 hover:bg-green-600'
                            : 'bg-red-500 hover:bg-red-600'
                            }`}
                        onClick={() => { toggleBlock(receiverUser, currentUser.id, receiverUser.id) }}
                    >
                        {receiverUser.isSenderBlocked ? "Unblock User" : "Block User"}
                    </button>
                </div>
                <div className="Logout flex justify-center w-full">
                    <button
                        className='bg-blue-500 hover:bg-blue-600 p-3 rounded-xl w-full transition-all duration-200 font-medium'
                        onClick={handleLogout}
                    >
                        Logout
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Details
