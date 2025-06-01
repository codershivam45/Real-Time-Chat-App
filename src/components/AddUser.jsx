import { useState } from 'react'
import PropTypes from 'prop-types'
import { chat } from '../lib/appwrite'
import { Query } from 'appwrite'
import db from '../lib/database'
import useUserStore from '../lib/useStore'

const AddUser = ({ onClose }) => {
  const [username, setusername] = useState('')
  const [users, setusers] = useState([])
  const { currentUser, chatList, fetchChatList } = useUserStore();

  const handleSearch = async () => {
    try {
      const res = await chat.listDocuments(
        import.meta.env.VITE_DB_ID,
        import.meta.env.VITE_USERS_ID,
        [Query.search('username', username)]
      )
      setusers(() => res.documents);
    } catch (error) {
      console.log(error.message)
    }
  }

  const handleChange = (e) => {
    setusername(e.target.value)
  }

  const handleAdd = async (user) => {
    try {
      const res = await chat.createDocument(
        import.meta.env.VITE_DB_ID,
        import.meta.env.VITE_MESSAGE_ID,
        'unique()',
        {
          message: []
        }
      )
      const messageID = res.$id;
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
        isSeen: true,
        lastUpdated: Date.now(),
        isReceiverBlocked: false,
        isSenderBlocked: false
      }
      const chatU = await db["ChatUser"].get(user.id);
      let chatListU = [];
      let chatListI = [];
      if (chatU.chats != []) {
        chatU.chats.map((item) => {
          chatListU.push(JSON.parse(item));
        })
      }
      if (chatList.chats != []) {
        chatList.chats.map((item) => {
          chatListI.push(JSON.parse(item));
        })
      }

      chatListU.push(payLoadUser);
      chatListI.push(payLoadCurrentUser);

      chatListU.sort((a, b) => b.createdAt - a.createdAt)
      chatListI.sort((a, b) => b.createdAt - a.createdAt)

      chatListU = chatListU.map((item) => JSON.stringify(item));
      chatListI = chatListI.map((item) => JSON.stringify(item));

      await db["ChatUser"].update(user.id, { chats: chatListU })
      await db["ChatUser"].update(currentUser.id, { chats: chatListI })
      fetchChatList(currentUser.id);
      onClose();
    } catch (error) {
      console.error("Error fetching document:", error.message);
    }
  }

  return (
    <div className='fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50'>
      <div className='bg-[#1a1a1a] rounded-2xl shadow-2xl border border-gray-800/50 w-[90%] max-w-md overflow-hidden transform transition-all duration-300 ease-in-out'>
        <div className="p-6 border-b border-gray-800/50">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-white">Add New Chat</h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-white transition-colors duration-200 p-2 hover:bg-gray-800/50 rounded-full"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <div className="flex gap-2">
            <input
              type="text"
              placeholder='Search username...'
              value={username}
              onChange={handleChange}
              onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
              className='flex-1 bg-[#2a2a2a] text-white border border-gray-700/50 rounded-xl px-4 py-2 focus:outline-none focus:border-gray-600 placeholder-gray-500'
            />
            <button
              className="px-4 py-2 text-white bg-blue-600 hover:bg-blue-700 rounded-xl transition-colors duration-200 font-medium"
              onClick={handleSearch}
            >
              Search
            </button>
          </div>
        </div>
        <div className="p-4 max-h-[60vh] overflow-y-auto">
          {users.length === 0 ? (
            <div className="text-gray-400 text-center py-8">
              No users found. Try searching for someone.
            </div>
          ) : (
            <div className="flex flex-col gap-3">
              {users.map((user, index) => (
                <div
                  className="flex justify-between items-center p-3 rounded-xl hover:bg-[#2a2a2a] transition-colors duration-200"
                  key={index}
                >
                  <div className="flex items-center gap-3">
                    <div className='w-[40px] h-[40px] rounded-[50%] overflow-clip border-2 border-gray-700 shadow-lg'>
                      <img
                        src={user.avatar || "./avatar.png"}
                        alt={user.username || 'User'}
                        className='w-full h-full object-cover'
                      />
                    </div>
                    <span className="text-white font-medium">{user.username || 'User'}</span>
                  </div>
                  <button
                    className="px-4 py-2 text-white bg-blue-600 hover:bg-blue-700 rounded-xl transition-colors duration-200 font-medium"
                    onClick={() => handleAdd(user)}
                  >
                    Add
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
        <div className="p-4 border-t border-gray-800/50 flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2 text-white bg-gray-700 hover:bg-gray-600 rounded-xl transition-colors duration-200 font-medium"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  )
}

AddUser.propTypes = {
  onClose: PropTypes.func.isRequired
}

export default AddUser
