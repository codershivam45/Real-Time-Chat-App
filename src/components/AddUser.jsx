import React, { useState } from 'react'
import { chat } from '../lib/appwrite'
import { Query } from 'appwrite'
import db from '../lib/database'
import useUserStore from '../lib/useStore'

const AddUser = () => {
  const [username, setusername] = useState('')
  const [users, setusers] = useState([])
  const {currentUser,chatList,fetchChatList}=useUserStore();
  const handleSearch = async () => {

    try {
      
      const res = await chat.listDocuments(
        import.meta.env.VITE_DB_ID,
        import.meta.env.VITE_USERS_ID,
        [Query.search('username', username)]

      )
      setusers(() => {
        return res.documents;
      })
    } catch (error) {
      console.log(error.message)

    }

  }
  const handleChange = (e) => {
    // console.log(e.target.value);
    setusername(e.target.value)
  }
  const handleAdd =async (user)=>{
    
    try {
      const res=await chat.createDocument(
        import.meta.env.VITE_DB_ID,
        import.meta.env.VITE_MESSAGE_ID,
        'unique()',
        {
          message:[]
        }
      )
      // console.log(res);
      const messageID=res.$id;
      const payLoadCurrentUser = {
        createdAt: Date.now(),
        lastMessage: "",
        messageID,
        userId: user.id,
        lastUpdated: Date.now(),
        isReceiverBlocked: false,
        isSenderBlocked: false
      }
      const payLoadUser = {
        createdAt: Date.now(),
        lastMessage: "",
        messageID,
        userId: currentUser.id,
        isSeen:true,
        lastUpdated:Date.now(),
        isReceiverBlocked: false,
        isSenderBlocked: false
      }
      const  chatU = await db["ChatUser"].get(user.id);
      let chatListU =[];
      let chatListI=[];
      if(chatU.chats!=[]){
        chatU.chats.map((item) => {
          chatListU.push(JSON.parse(item));
        })
      }
      if(chatList.chats!=[]){
        chatList.chats.map((item) => {
          chatListI.push(JSON.parse(item));
        })
      }
      
      
      chatListU.push(payLoadUser);
      chatListI.push(payLoadCurrentUser);
      // console.log(chatListU);
      chatListU.sort((a,b)=>{b.createdAt-a.createdAt})
      chatListI.sort((a,b)=>{b.createdAt-a.createdAt})

      chatListU = chatListU.map((item) => JSON.stringify(item));  // Implicit return
      chatListI = chatListI.map((item) => JSON.stringify(item));  // Implicit return

      // console.log(chatListU,chatListI)

      await db["ChatUser"].update(user.id,{chats:chatListU})
      await db["ChatUser"].update(currentUser.id,{chats:chatListI})
      // fetchUserInfo()

      fetchChatList(currentUser.id);
      
      

    } catch (error) {
      console.error("Error fetching  document:", error.message);
    }

   
  }
  return (
    <div className='absolute top-0 bottom-0 left-0 right-0 w-max h-max p-2 rounded-md m-auto bg-[#110f0f49] backdrop-blur-3xl z-10'>
      <div className="search py-4 px-2  flex gap-2">
        <input type="text" placeholder='Enter Username ' value={username} onChange={handleChange} className='py-1 rounded-md' />
        <button className=" px-2 py-1 text-white bg-blue-500 rounded-md" onClick={handleSearch}>Search </button>
      </div>
      <div className="list px-2 flex flex-col gap-5">
        {users.map((user, index) => (
          <div className="user flex justify-between text-sm items-center" key={index}>
            <div className="user-info text-white flex items-center gap-2">
              <div className='w-[28px] h-[28px] rounded-[50%]  overflow-clip'>
                <img src={user.avatar ||"./avatar.png"} alt="" className='w-[28px] h-[28px] ' />
              </div>
              <span>{user.username || 'Ava Thomas'}</span>
            </div>
            <button className="px-2 py-1 text-white bg-blue-500 rounded-md" onClick={()=>{handleAdd(user)}}>Add User</button>
          </div>
        ))}
      </div>
    </div>
  )
}

export default AddUser
