// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from 'react'
import AddUser from './AddUser'
import useUserStore from '../lib/useStore'
import db from '../lib/database'
import chatStore from '../lib/chatStore'
import { chat, client } from '../lib/appwrite'
const ChatList = () => {
    const [add, setadd] = useState(false)
    const { chatList, currentUser, fetchChatList } = useUserStore();
    const [chats, setchats] = useState([])
    const { receiverUser, fetchReceiverUserInfo, messageid } = chatStore();
    const [filterChats, setfilterChats] = useState([])

    useEffect(() => {


        const channel = `databases.${import.meta.env.VITE_DB_ID}.collections.${import.meta.env.VITE_CHATUSER_ID}.documents.${currentUser.id}`;


        const unsubscribe = client.subscribe(channel, (response) => {
            fetchChatList(currentUser.id)

        });

        return () => {

            unsubscribe(); // Cleanup to avoid memory leaks
        };
    }, [currentUser.id, fetchChatList]);

    useEffect(() => {

        const fetchDetails = async () => {
            // fetchUserInfo();
            let chatvar = [];

            // Wait for all asynchronous calls to finish using Promise.all
            await Promise.all(
                chatList.chats.map(async (item) => {
                    let data = JSON.parse(item);
                    // console.log(data);

                    // Fetch user details asynchronously
                    const details = await db["User"].get(data.userId);
                    // console.log(details);

                    // Push the updated data to the array
                    chatvar.push({ ...data, username: details.username, avatar: details.avatar });
                })
            );
            chatvar.sort((a, b) => b.lastUpdated - a.lastUpdated);

            // console.log(chatvar)
            // After all async calls have completed, update the state
            setchats(chatvar);
            setfilterChats(chatvar)

            // console.log(chatvar);
        };

        fetchDetails();

        return () => { };
    }, [chatList.chats]);

    const handleChat = async (chat) => {
        const chatListvar = chatList.chats.map((it) => {
            let element = JSON.parse(it)
            // console.log("elementisgf", element)
            // console.log("receiverIDigj", receiverUser?.id)
            if (element.userId == receiverUser?.id) {
                element.isSeen = true;
                // console.log(element, "id")

            }
            return JSON.stringify(element);


        })
        // console.log(chatListvar)
        // console.log(chatList);
        await db["ChatUser"].update(currentUser.id, { chats: chatListvar })
        fetchChatList(currentUser.id);
        fetchReceiverUserInfo(chat.userId, chatList, chat.isSenderBlocked, chat.isSenderBlocked);

    }

    const handleSearch = (e) => {
        const searchTerm=e.target.value;
        // console.log(searchTerm)
        const filteredChats = chats.filter((item)=>{
            return (item.username.toLowerCase().includes(searchTerm.toLowerCase()) || item.lastMessage.toLowerCase().includes(searchTerm.toLowerCase()))
        })
        setfilterChats(filteredChats)
    }




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
                            onChange={handleSearch}
                        />
                    </div>
                    <div className="add bg-[#4A4A58] p-2 rounded"><img src={add ? './minus.png' : './plus.png'} alt="" width="18" onClick={() => { setadd((prev) => { return !prev }) }} className="cursor-pointer" /></div>
                </div>
                <div className="list">
                    {filterChats.map((chat, index) => {
                        return (
                            <div className={chat.isSeen == false ? 'bg-blue-500 ' : 'hover:bg-[#5A5A68]'} key={index} onClick={() => { handleChat(chat) }}>
                                <div className='text-white flex m-4 py-2 gap-2 border border-transparent border-b-[#b9b7b71d] '>
                                    <div className='w-[36px] h-[36px]  rounded-[50%] overflow-clip'>
                                        <img src={chat.avatar && !chat.isSenderBlocked ? chat.avatar : "./avatar.png"} alt="" className='w-[36px] h-[36px] ' />
                                    </div>
                                    <div className="text">
                                        <div className="name">{chat.isSenderBlocked ?"User":chat.username}</div>
                                        <div
                                            className={chat.isSeen === false ? 'lastmsg text-sm text-white' : 'lastmsg text-sm text-gray-500'}
                                        >
                                            {chat.lastMessage.length > 40
                                                ? `${chat.lastMessage.substr(0, 40)}...`
                                                : chat.lastMessage}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    })}




                </div>
            </div>
            {add && <AddUser />}
        </>
    )
}

export default ChatList
