/* eslint-disable react-hooks/rules-of-hooks */
// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from 'react'
import EmojiPicker from 'emoji-picker-react'
import { useRef } from 'react'
import chatStore from '../lib/chatStore'
import useUserStore from '../lib/useStore'
import db from '../lib/database'
import { formatDistanceToNow } from 'date-fns';

import { client, storage } from '../lib/appwrite'


const chat = () => {
  const [open, setopen] = useState(false)
  const [msg, setmsg] = useState('')
  const [img, setimg] = useState(null)

  const scrollRef = useRef(null)
  const observerRef = useRef(null)
  const { currentUser, fetchChatList } = useUserStore()
  const { receiverUser, messageID, message, fetchMessage, toggleDetails } = chatStore();



  const scrollToBottom = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  };
  useEffect(() => {
    scrollToBottom()
  }, [])

  // Set up MutationObserver for dynamic content changes
  useEffect(() => {
    const targetNode = scrollRef.current;

    if (targetNode) {
      observerRef.current = new MutationObserver(() => {
        scrollToBottom();
      });

      observerRef.current.observe(targetNode, {
        childList: true, // Observe changes to child nodes
        subtree: true,   // Observe nested changes
      });
    }

    return () => {
      // Disconnect the observer on cleanup
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, []);

  useEffect(() => {
    if (!messageID) return;

    const channel = `databases.${import.meta.env.VITE_DB_ID}.collections.${import.meta.env.VITE_MESSAGE_ID}.documents.${messageID}`;

    const unsubscribe = client.subscribe(channel, () => {
      fetchMessage(messageID);
    });

    return () => {
      unsubscribe();
    };
  }, [messageID, fetchMessage]);


  const setEmoji = (e) => {
    setmsg((prev) => {
      prev = prev + e.emoji
      return prev
    })
    setopen(false)
  }
  const handleChange = (e) => {
    setmsg((prev) => {
      prev = e.target.value
      return prev
    })
    // console.log(msg);

  }
  const handleTime = (pastTimestamp) => {
    if (pastTimestamp == "1 sec ago") {

      return "1 sec ago"
    }
    const timeString = formatDistanceToNow(new Date(pastTimestamp), { addSuffix: true });
    return timeString.replace(/^about /, '')
  };
  const handleImage = async (e) => {
    e.preventDefault()
    const file = e.target.files[0];

    if (file && file.name) {
      const res = await storage.createFile(
        import.meta.env.VITE_BUCKET_AVATARS_ID,
        'unique()',
        file
      )
      const imageUrl = storage.getFileView(
        import.meta.env.VITE_BUCKET_AVATARS_ID,
        res.$id,
      );
      setimg(() => imageUrl);
    }
  }
  const handleSend = async () => {
    // console.log(img)

    try {
      // console.log(msg);
      const msgobj = {
        senderId: currentUser.id,
        receiverId: receiverUser.id,
        msg,
        timeElapsed: Date.now(),
        photo: img
      }

      // console.log(msgobj);
      const prevMessage = message.map((item) => JSON.stringify(item))
      await db["Message"].update(
        messageID,
        { message: [...prevMessage, JSON.stringify(msgobj)] },
      )
      fetchMessage(messageID)
      // console.log("Message sended")


      const ids = [
        {
          senderId: currentUser.id,
          receiverId: receiverUser.id,
        },
        {
          senderId: receiverUser.id,
          receiverId: currentUser.id,
        }
      ];


      ids.forEach(async (item) => {
        const chatUser = await db["ChatUser"].get(item.senderId)

        const chatList = chatUser.chats.map((it) => {
          let element = JSON.parse(it)

          if (element.userId == item.receiverId) {

            element.lastMessage = msg;
            if (img) {
              element.lastMessage = "📷 " + msg;
            }
            if (!msg && img) {
              element.lastMessage = " 📷 You shared an image "
            }
            element.lastUpdated = Date.now()
            if (currentUser.id == item.receiverId) {
              element.isSeen = false;
              if (!msg && img) {
                element.lastMessage = " 📷 You were shared  an image "
              }
            }
          }
          return JSON.stringify(element);


        })
        // console.log(chatList);
        await db["ChatUser"].update(item.senderId, { chats: chatList })
        fetchChatList(currentUser.id);
        // console.log("updated");
      })
      setmsg("")



    } catch (err) {
      console.log("Failed to send msg", err.message)
    }
  }

  return (
    <div className='flex flex-col justify-between h-[100vh] bg-gradient-to-b from-[#0f0f0f] to-[#1a1a1a]'>

      <div className='user flex p-4 justify-between items-center text-white bg-[#1a1a1a]/80 sticky top-0 backdrop-blur-xl border-b border-gray-800/50'>
        <div className='flex items-center gap-4 lg:ml-0 ml-[25px] hover:bg-[#2a2a2a] p-2 rounded-lg transition-all duration-200' onClick={() => { toggleDetails(true) }}>
          <div className="dp relative">
            <img src={receiverUser.avatar && !receiverUser.isReceiverBlocked ? receiverUser.avatar : "./avatar.png"} alt="" className='rounded-[50%] w-[48px] h-[48px] object-cover border-2 border-gray-700 shadow-lg' />

          </div>
          <div className='text-lg'>
            <div className="name font-semibold">{receiverUser?.username && !receiverUser.isReceiverBlocked ? receiverUser.username : "User"}</div>
            {!receiverUser.isReceiverBlocked && <div className="desc text-sm text-gray-400">Available</div>}
          </div>
        </div>
        <div className='flex gap-2 items-center'>
          {/* Action buttons can be uncommented and styled similarly when needed */}
        </div>
      </div>

      <div className="chats flex flex-col gap-4 p-4 h-[80vh] overflow-y-auto no-scrollbar bg-[url('/chatbg.jpeg')] bg-opacity-30" ref={scrollRef}>
        {
          message.map((item, index) => (
            <div className={item.senderId == currentUser.id ? "flex flex-col items-end" : 'flex flex-col items-start'} key={index}>
              <div className="chat text-white p-2 flex gap-3 max-w-[80%]">
                {item.senderId != currentUser.id && <div>
                  <div className="w-[32px] h-[32px] rounded-[50%] overflow-clip border-2 border-gray-700 shadow-lg">
                    <img src={receiverUser.avatar && !receiverUser.isReceiverBlocked ? receiverUser.avatar : "./avatar.png"} alt="Avatar" className="w-[32px] h-[32px] object-cover" />
                  </div>
                </div>}
                <div className={item.senderId == currentUser.id ? "text flex flex-col gap-2 items-end mr-2" : "text flex flex-col gap-2 items-start"}>
                  {item.photo && <div className="img rounded-lg overflow-hidden shadow-lg">
                    <img
                      src={item.photo}
                      alt="Chat Image"
                      className="max-w-[300px] rounded-lg hover:scale-105 transition-transform duration-200"
                    />
                  </div>}
                  {item.msg && <div className={item.senderId == currentUser.id ?
                    "msg bg-blue-600 p-3 rounded-2xl rounded-tr-none shadow-lg hover:shadow-blue-500/20 transition-shadow" :
                    "msg bg-[#2a2a2a] p-3 rounded-2xl rounded-tl-none shadow-lg hover:shadow-gray-500/20 transition-shadow"}>
                    {item.msg}
                  </div>}
                  <div className="time text-xs text-gray-400">{handleTime(item.timeElapsed)}</div>
                </div>
              </div>
            </div>
          ))
        }
        {receiverUser.isSenderBlocked && <div className='text-white text-center w-fit mx-auto bg-[#ffffff1a] rounded-lg m-2 p-2 text-sm backdrop-blur-sm border border-gray-700/50'>You blocked the User</div>}
      </div>

      <div className="send p-4 flex items-center justify-between relative bg-[#1a1a1a]/80 backdrop-blur-xl border-t border-gray-800/50">
        <div className="flex bg-[#2a2a2a] border border-gray-700/50 hover:border-gray-600 items-center py-3 px-4 rounded-full w-full justify-between transition-all duration-200 shadow-lg">
          <div className="icons flex gap-4 flex-shrink-0">
            <img src="./emoji.png" alt="" className='w-[24px] cursor-pointer hover:opacity-80 transition-opacity hover:scale-110' onClick={() => { setopen((prev) => !prev); }} />
            {open && (
              <div
                className="fixed bottom-24 left-40 p-4 rounded-xl shadow-2xl bg-[#2a2a2a] border border-gray-700/50 backdrop-blur-xl"
                style={{ width: "300px" }}
              >
                <EmojiPicker onEmojiClick={setEmoji} />
              </div>
            )}
            <div className="w-[24px] h-[24px] flex-shrink-0">
              <label htmlFor="imgupload" className="cursor-pointer hover:opacity-80 transition-opacity hover:scale-110">
                <img src="./img.png" alt="" className="w-[24px] h-auto" />
              </label>
            </div>
            <input type="file" name="" id="imgupload" className="hidden" accept="image/*" onChange={handleImage} />
          </div>

          <input
            type="text"
            className="bg-transparent text-white focus:outline-none ml-2 flex-grow placeholder-gray-500"
            placeholder={receiverUser.isSenderBlocked || receiverUser.isReceiverBlocked ? "Can't send a message" : "Type a message..."}
            value={msg}
            onChange={handleChange}
          />

          <div className="flex gap-4 flex-shrink-0">
            <button
              onClick={handleSend}
              disabled={(!img && !msg) || receiverUser.isSenderBlocked || receiverUser.isReceiverBlocked}
              className="disabled:opacity-50 disabled:cursor-not-allowed hover:opacity-80 transition-opacity hover:scale-110"
            >
              <img src="./send.png" alt="" className='w-[24px]' />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default chat
