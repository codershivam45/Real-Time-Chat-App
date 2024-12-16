// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from 'react'
import EmojiPicker from 'emoji-picker-react'
import { useRef } from 'react'
const chat = () => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [open, setopen] = useState(false)
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [msg, setmsg] = useState('')
  const scrollRef = useRef(null)

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behaviour: "smooth" })
  }, [])

  const setEmoji = (e) => {
    setmsg((prev) => {
      prev = prev + e.emoji
      return prev
    })
    setopen(false)
  }
  const handleChange = (e) => {
    setmsg((prev) => {
      prev = e.value
      return prev
    })
  }

  return (
    <div className='flex flex-col justify-between h-[100vh]'>

      <div className='user flex p-4 justify-between items-center text-white bg-[#110f0f49] sticky top-0 z-10 opacity-100 backdrop-blur-3xl'>
        <div className='flex  items-center gap-3'>
          <div className="dp  ">
            <img src="./avatar.png" alt="" className='rounded-[50%] brightness-200 w-[48px] h-[48px]' />
          </div>
          <div className=' text-lg cursor-pointer '>
            <div className="name">Ava Thomas</div>
            <div className="desc text-sm text-gray-500">Available</div>
          </div>

        </div>
        <div className='flex gap-2 items-center '>
          <div><img src="./phone.png" alt="" width="20" className='cursor-pointer' /></div>
          <div><img src="./video.png" alt="" width="20" className='cursor-pointer' /></div>
          <div><img src="./info.png" alt="" width="20" className='cursor-pointer' /></div>
        </div>

      </div>
      <div className="chats flex flex-col gap-2 h-[80vh] overflow-y-auto no-scrollbar">
        <div className='flex flex-col items-start'>
          <div className="chat text-white p-2  flex gap-2 max-w-[80%]">
            <div>
              <div className='w-[28px] h-[28px]  rounded-[50%] overflow-clip'>
                <img src="./avatar.png" alt="" className='w-[28px] h-[28px] brightness-200'/>
              </div>
            </div>
            <div className="text flex flex-col gap-1 ">
              <div className="msg  bg-[rgba(17,25,40,0.3)] p-2 rounded-md">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dolor ex, quos quidem adipisci vero debitis. Incidunt quibusdam exercitationem laboriosam, neque delectus reiciendis reprehenderit? Atque tenetur vero in eius ex incidunt, ducimus doloribus odit quos iste? Voluptatum sequi eaque similique eum.</div>
              <div className="time text-sm">1 min ago</div>
            </div>
          </div>
        </div>
        <div className='flex flex-col items-end'>
          <div className="chat text-white p-2 max-w-[80%] flex gap-2  ">
            <div className="text flex flex-col gap-1">
              <div className="msg  bg-blue-500 p-2 rounded-md">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dolor ex, quos quidem adipisci vero debitis. Incidunt quibusdam exercitationem laboriosam, neque delectus reiciendis reprehenderit? Atque tenetur vero in eius ex incidunt, ducimus doloribus odit quos iste? Voluptatum sequi eaque similique eum.</div>
              <div className="time text-sm">1 min ago</div>
            </div>
          </div>
        </div>
        <div className='flex flex-col items-start'>
          <div className="chat text-white p-2  flex gap-2 max-w-[80%]">
            <div>
              <div className='w-[28px] h-[28px]  rounded-[50%] overflow-clip'>
                <img src="./avatar.png" alt="" className='w-[28px] h-[28px] brightness-200'/>
              </div>
            </div>
            <div className="text flex flex-col gap-1 ">
              <div className="msg  bg-[rgba(17,25,40,0.3)] p-2 rounded-md">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dolor ex, quos quidem adipisci vero debitis. Incidunt quibusdam exercitationem laboriosam, neque delectus reiciendis reprehenderit? Atque tenetur vero in eius ex incidunt, ducimus doloribus odit quos iste? Voluptatum sequi eaque similique eum.</div>
              <div className="time text-sm">1 min ago</div>
            </div>
          </div>
        </div>
        <div className='flex flex-col items-end'>
          <div className="chat text-white p-2 max-w-[80%] flex gap-2  ">
            <div className="text flex flex-col gap-1">
              <div className="msg  bg-blue-500 p-2 rounded-md">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dolor ex, quos quidem adipisci vero debitis. Incidunt quibusdam exercitationem laboriosam, neque delectus reiciendis reprehenderit? Atque tenetur vero in eius ex incidunt, ducimus doloribus odit quos iste? Voluptatum sequi eaque similique eum.</div>
              <div className="time text-sm">1 min ago</div>
            </div>
          </div>
        </div>
        <div className='flex flex-col items-start'>
          <div className="chat text-white p-2  flex gap-2 max-w-[80%]">
            <div>
              <div className='w-[28px] h-[28px]  rounded-[50%] overflow-clip'>
                <img src="./avatar.png" alt="" className='w-[28px] h-[28px] brightness-200'/>
              </div>
            </div>
            <div className="text flex flex-col gap-1 ">
              <div className="msg  bg-[rgba(17,25,40,0.3)] p-2 rounded-md">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dolor ex, quos quidem adipisci vero debitis. Incidunt quibusdam exercitationem laboriosam, neque delectus reiciendis reprehenderit? Atque tenetur vero in eius ex incidunt, ducimus doloribus odit quos iste? Voluptatum sequi eaque similique eum.</div>
              <div className="time text-sm">1 min ago</div>
            </div>
          </div>
        </div>
        <div className='flex flex-col items-end'>
          <div className="chat text-white p-2 max-w-[80%] flex gap-2  ">
            <div className="text flex flex-col gap-1">
              <div className="msg  bg-blue-500 p-2 rounded-md">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dolor ex, quos quidem adipisci vero debitis. Incidunt quibusdam exercitationem laboriosam, neque delectus reiciendis reprehenderit? Atque tenetur vero in eius ex incidunt, ducimus doloribus odit quos iste? Voluptatum sequi eaque similique eum.</div>
              <div className="time text-sm">1 min ago</div>
            </div>
          </div>
        </div>
        <div className='flex flex-col items-start'>
          <div className="chat text-white p-2  flex gap-2 max-w-[80%]">
            <div>
              <div className='w-[28px] h-[28px]  rounded-[50%] overflow-clip'>
                <img src="./avatar.png" alt="" className='w-[28px] h-[28px] brightness-200'/>
              </div>
            </div>
            <div className="text flex flex-col gap-1 ">
              <div className="msg  bg-[rgba(17,25,40,0.3)] p-2 rounded-md">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dolor ex, quos quidem adipisci vero debitis. Incidunt quibusdam exercitationem laboriosam, neque delectus reiciendis reprehenderit? Atque tenetur vero in eius ex incidunt, ducimus doloribus odit quos iste? Voluptatum sequi eaque similique eum.</div>
              <div className="time text-sm">1 min ago</div>
            </div>
          </div>
        </div>
        <div className='flex flex-col items-end'>
          <div className="chat text-white p-2 max-w-[80%] flex gap-2  ">
            <div className="text flex flex-col gap-1">
              <div className="msg  bg-blue-500 p-2 rounded-md">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dolor ex, quos quidem adipisci vero debitis. Incidunt quibusdam exercitationem laboriosam, neque delectus reiciendis reprehenderit? Atque tenetur vero in eius ex incidunt, ducimus doloribus odit quos iste? Voluptatum sequi eaque similique eum.</div>
              <div className="time text-sm">1 min ago</div>
            </div>
          </div>
        </div>
        <div className='flex flex-col items-start'>
          <div className="chat text-white p-2  flex gap-2 max-w-[80%]">
            <div>
              <div className='w-[28px] h-[28px]  rounded-[50%] overflow-clip'>
                <img src="./avatar.png" alt="" className='w-[28px] h-[28px] brightness-200'/>
              </div>
            </div>
            <div className="text flex flex-col gap-1 ">
              <div className="msg  bg-[rgba(17,25,40,0.3)] p-2 rounded-md">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dolor ex, quos quidem adipisci vero debitis. Incidunt quibusdam exercitationem laboriosam, neque delectus reiciendis reprehenderit? Atque tenetur vero in eius ex incidunt, ducimus doloribus odit quos iste? Voluptatum sequi eaque similique eum.</div>
              <div className="time text-sm">1 min ago</div>
            </div>
          </div>
        </div>
        <div className='flex flex-col items-end'>
          <div className="chat text-white p-2 max-w-[80%] flex gap-2  ">
            <div className="text flex flex-col gap-1">
              <div className="msg  bg-blue-500 p-2 rounded-md">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dolor ex, quos quidem adipisci vero debitis. Incidunt quibusdam exercitationem laboriosam, neque delectus reiciendis reprehenderit? Atque tenetur vero in eius ex incidunt, ducimus doloribus odit quos iste? Voluptatum sequi eaque similique eum.</div>
              <div className="time text-sm">1 min ago</div>
            </div>
          </div>
        </div>
        <div className='flex flex-col items-start'>
          <div className="chat text-white p-2  flex gap-2 max-w-[80%]">
            <div>
              <div className='w-[28px] h-[28px]  rounded-[50%] overflow-clip'>
                <img src="./avatar.png" alt="" className='w-[28px] h-[28px] brightness-200'/>
              </div>
            </div>
            <div className="text flex flex-col gap-1 ">
              <div className="msg  bg-[rgba(17,25,40,0.3)] p-2 rounded-md">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dolor ex, quos quidem adipisci vero debitis. Incidunt quibusdam exercitationem laboriosam, neque delectus reiciendis reprehenderit? Atque tenetur vero in eius ex incidunt, ducimus doloribus odit quos iste? Voluptatum sequi eaque similique eum.</div>
              <div className="time text-sm">1 min ago</div>
            </div>
          </div>
        </div>
        <div className='flex flex-col items-end'>
          <div className="chat text-white p-2 max-w-[80%] flex gap-2  ">
            <div className="text flex flex-col gap-1">
              <div className="msg  bg-blue-500 p-2 rounded-md">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dolor ex, quos quidem adipisci vero debitis. Incidunt quibusdam exercitationem laboriosam, neque delectus reiciendis reprehenderit? Atque tenetur vero in eius ex incidunt, ducimus doloribus odit quos iste? Voluptatum sequi eaque similique eum.</div>
              <div className="time text-sm">1 min ago</div>
            </div>
          </div>
        </div>
        <div className='flex flex-col items-start'>
          <div className="chat text-white p-2  flex gap-2 max-w-[80%]">
            <div>
              <div className='w-[28px] h-[28px]  rounded-[50%] overflow-clip'>
                <img src="./avatar.png" alt="" className='w-[28px] h-[28px] brightness-200'/>
              </div>
            </div>
            <div className="text flex flex-col gap-1 ">
              <div className="msg  bg-[rgba(17,25,40,0.3)] p-2 rounded-md">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dolor ex, quos quidem adipisci vero debitis. Incidunt quibusdam exercitationem laboriosam, neque delectus reiciendis reprehenderit? Atque tenetur vero in eius ex incidunt, ducimus doloribus odit quos iste? Voluptatum sequi eaque similique eum.</div>
              <div className="time text-sm">1 min ago</div>
            </div>
          </div>
        </div>
        <div className='flex flex-col items-end'>
          <div className="chat text-white p-2 max-w-[80%] flex gap-2  ">
            <div className="text flex flex-col gap-1">
              <div className="msg  bg-blue-500 p-2 rounded-md">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dolor ex, quos quidem adipisci vero debitis. Incidunt quibusdam exercitationem laboriosam, neque delectus reiciendis reprehenderit? Atque tenetur vero in eius ex incidunt, ducimus doloribus odit quos iste? Voluptatum sequi eaque similique eum.</div>
              <div className="time text-sm">1 min ago</div>
            </div>
          </div>
        </div>


        <div className='flex flex-col items-start'>
          <div className="chat text-white p-2  flex gap-2 max-w-[80%]">
            <div>
              <div className='w-[28px] h-[28px]  rounded-[50%] overflow-clip'>
                <img src="./avatar.png" alt="" className='w-[28px] h-[28px] brightness-200' />
              </div>
            </div>
            <div className="text flex flex-col gap-1 ">
              <div className="img">
                <img src="https://th.bing.com/th/id/OIP.GvntOdvz80txbfbW4rz2kAHaEo?w=1920&h=1200&rs=1&pid=ImgDetMain" alt="" className='rounded-md' />
              </div>
              <div className="msg  bg-[rgba(17,25,40,0.3)] p-2 rounded-md max-w-fit">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dolor ex, quos quidem adipisci vero debitis. Incidunt quibusdam exercitationem laboriosam, neque delectus reiciendis reprehenderit? Atque tenetur vero in eius ex incidunt, ducimus doloribus odit quos iste? Voluptatum sequi eaque similique eum.</div>
              <div className="time text-sm">1 min ago</div>
            </div>
          </div>
        </div>
        <div className='flex flex-col items-end'>
          <div className="chat text-white p-2 max-w-[80%] flex gap-2  ">
            <div className="text flex flex-col gap-1 items-end">
              <div className="img">
                <img src="https://th.bing.com/th/id/OIP.GvntOdvz80txbfbW4rz2kAHaEo?w=1920&h=1200&rs=1&pid=ImgDetMain" alt="" className='rounded-md' />
              </div>
              <div className="msg  bg-blue-500 p-2 rounded-md max-w-fit">Lorem ipsum dolor sit amet consectetur adipisicing elit. Reprehenderit dicta cupiditate voluptatum quo? Illum, nesciunt sunt veritatis quam consequuntur quibusdam cumque aut quod repellendus </div>
              <div className="time text-sm">1 min ago</div>
            </div>
          </div>
        </div>
        <div ref={scrollRef}></div>

      </div>

      <div className="send p-4 flex items-center justify-between relative ">

        <div className="flex bg-[#4A4A58] border border-transparent hover:border-white items-center py-4 px-2 rounded w-[100%] justify-between">
          <div className="icons flex gap-2 ">
            <img src="./emoji.png" alt="" width="24" className='cursor-pointer' onClick={() => { setopen((prev) => { return !prev }) }} />
            {open && (
              <div
                className="fixed bottom-24 left-40  p-4 rounded shadow-lg z-50"
                style={{ width: "300px" }} // Adjust width as needed
              >
                <EmojiPicker onEmojiClick={setEmoji} />
              </div>
            )}
            <img src="./camera.png" alt="" width="24" />
            <img src="./img.png" alt="" width="24" />
          </div>
          <input
            type="text"
            className="bg-[#4A4A58] text-white focus:outline-none ml-2 w-[80%]"
            placeholder="Type a Message..."
            value={msg}
            onChange={handleChange}
          />
          <div className=' flex  gap-2'>
            <img src="./mic.png" alt="" width="24" />
            <img src="./send.png" alt="" width="24" />
          </div>
        </div>

      </div>


    </div>
  )
}

export default chat
