// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from 'react'
import AddUser from './AddUser'
import useUserStore from '../lib/useStore'
import db from '../lib/database'
import chatStore from '../lib/chatStore'
import { client } from '../lib/appwrite'

const ChatList = () => {
    const [add, setadd] = useState(false)
    const { chatList, currentUser, fetchChatList } = useUserStore();
    const [chats, setchats] = useState([])
    const { receiverUser, fetchReceiverUserInfo } = chatStore();
    const [filterChats, setfilterChats] = useState([])

    useEffect(() => {
        const channel = `databases.${import.meta.env.VITE_DB_ID}.collections.${import.meta.env.VITE_CHATUSER_ID}.documents.${currentUser.id}`;

        const unsubscribe = client.subscribe(channel, () => {
            fetchChatList(currentUser.id)
        });

        return () => {
            unsubscribe(); // Cleanup to avoid memory leaks
        };
    }, [currentUser.id, fetchChatList]);

    useEffect(() => {
        const fetchDetails = async () => {
            let chatvar = [];

            await Promise.all(
                chatList.chats.map(async (item) => {
                    let data = JSON.parse(item);

                    const details = await db["User"].get(data.userId);

                    chatvar.push({ ...data, username: details.username, avatar: details.avatar });
                })
            );
            chatvar.sort((a, b) => b.lastUpdated - a.lastUpdated);

            setchats(chatvar);
            setfilterChats(chatvar)
        };

        fetchDetails();

        return () => { };
    }, [chatList.chats]);

    const handleAddModal = () => {
        setadd(!add);
    }

    const handleChat = async (chat) => {
        const chatListvar = chatList.chats.map((it) => {
            let element = JSON.parse(it)
            if (element.userId == receiverUser?.id) {
                element.isSeen = true;
            }
            return JSON.stringify(element);
        })
        await db["ChatUser"].update(currentUser.id, { chats: chatListvar })
        fetchChatList(currentUser.id);
        fetchReceiverUserInfo(chat.userId, chatList, chat.isSenderBlocked, chat.isReceiverBlocked);
    }

    const handleSearch = (e) => {
        const searchTerm = e.target.value;
        const filteredChats = chats.filter((item) => {
            return (item.username.toLowerCase().includes(searchTerm.toLowerCase()) || item.lastMessage.toLowerCase().includes(searchTerm.toLowerCase()))
        })
        setfilterChats(filteredChats)
    }

    return (
        <>
            <div className='bg-gradient-to-b from-[#0f0f0f] to-[#1a1a1a] h-[100vh]'>
                <div className="search p-4 flex items-center justify-between bg-[#1a1a1a]/80 backdrop-blur-xl border-b border-gray-800/50">
                    <div className="flex bg-[#2a2a2a] border border-gray-700/50 hover:border-gray-600 items-center p-3 rounded-full w-[85%] transition-all duration-200">
                        <img src="./search.png" alt="" width="20" className="opacity-70" />
                        <input
                            type="text"
                            className="bg-transparent text-white focus:outline-none ml-2 w-full placeholder-gray-500"
                            placeholder="Search chats..."
                            onChange={handleSearch}
                        />
                    </div>
                    <div className="add bg-[#2a2a2a] p-3 rounded-full border border-gray-700/50 hover:border-gray-600 transition-all duration-200">
                        <img
                            src={add ? './minus.png' : './plus.png'}
                            alt=""
                            width="18"
                            onClick={handleAddModal}
                            className="cursor-pointer hover:opacity-80 transition-opacity"
                        />
                    </div>
                </div>
                <div className="list overflow-y-auto h-[calc(100vh-80px)]">
                    {filterChats.map((chat, index) => {
                        return (
                            <div
                                className={`transition-all duration-200 ${chat.isSeen == false
                                    ? 'bg-blue-500/10 hover:bg-blue-500/20'
                                    : 'hover:bg-[#2a2a2a]'
                                    }`}
                                key={index}
                                onClick={() => { handleChat(chat) }}
                            >
                                <div className='text-white flex p-4 gap-3 border-b border-gray-800/50'>
                                    <div className='relative'>
                                        <div className='w-[48px] h-[48px] rounded-[50%] overflow-clip border-2 border-gray-700 shadow-lg'>
                                            <img
                                                src={chat.avatar && !chat.isSenderBlocked ? chat.avatar : "./avatar.png"}
                                                alt=""
                                                className='w-[48px] h-[48px] object-cover'
                                            />
                                        </div>
                                        {!chat.isSeen && (
                                            <div className="absolute -top-1 -right-1 w-4 h-4 bg-blue-500 rounded-full border-2 border-[#1a1a1a]"></div>
                                        )}
                                    </div>
                                    <div className="text flex-1 min-w-0">
                                        <div className="name font-medium">{chat.isSenderBlocked ? "User" : chat.username}</div>
                                        <div className={`lastmsg text-sm truncate ${chat.isSeen === false
                                            ? 'text-white'
                                            : 'text-gray-400'
                                            }`}>
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
            {add && <AddUser onClose={() => setadd(false)} />}
        </>
    )
}

export default ChatList
