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
  const { currentUser, chatList,fetchChatList } = useUserStore()
  const { receiverUser, messageID, message, fetchMessage ,toggleDetails } = chatStore();



  const scrollToBottom = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  };
  useEffect(()=>{
    scrollToBottom()
  },[])

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
    // console.log("Subscribing to:", channel);

    const unsubscribe = client.subscribe(channel, (response) => {
      // console.log("Realtime update received:", response);

      // Call the fetchMessage function to update the messages
      fetchMessage(messageID);

    });

    return () => {
      // console.log("Unsubscribing from:", channel);
      unsubscribe(); // Cleanup to avoid memory leaks
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
    if(pastTimestamp=="1 sec ago"){

      return "1 sec ago"
    }
    const timeString = formatDistanceToNow(new Date(pastTimestamp), { addSuffix: true });
    return timeString.replace(/^about /, '')
  };
  const handleImage = async (e) => {
    e.preventDefault()
    // console.log(e);
    // console.log(e.target.files[0]);
    const file = e.target.files[0];

    if (file && file.name) {
      const res = await storage.createFile(
        import.meta.env.VITE_BUCKET_AVATARS_ID,
        'unique()',
        file
      )
      const imageUrl = storage.getFilePreview(
        import.meta.env.VITE_BUCKET_AVATARS_ID, // Your storage bucket ID
        res.$id,    // File ID
      );
      setimg((prev) => {
        return imageUrl;
      })

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

        const chatList=chatUser.chats.map((it)=>{
          let element=JSON.parse(it)
          // console.log("element",element)
          // console.log("receiverID",item.receiverId)
          if(!("isSeen" in element)){
            element={...element,isSeen:true}
          }
          if(element.userId==item.receiverId){
            element.lastMessage=msg;
            if(currentUser.id==item.receiverId){
              element.isSeen=false;
            }
           
            // console.log(element,"id")

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
    <div className='flex flex-col justify-between h-[100vh]'>

      <div className='user flex p-4 justify-between items-center text-white bg-[#110f0f49] sticky top-0  opacity-100 backdrop-blur-3xl'>
        <div className='flex  items-center gap-3 lg:ml-0 ml-[25px] ' onClick={()=>{toggleDetails(true)}}>
          <div className="dp  ">
            <img src={receiverUser?.avatar || "./avatar.png"} alt="" className='rounded-[50%]  w-[48px] h-[48px]' />
          </div>
          <div className=' text-lg cursor-pointer '>
            <div className="name">{receiverUser?.username || "Ava Thomas"}</div>
            <div className="desc text-sm text-gray-500">Available</div>
          </div>

        </div>
        <div className='flex gap-2 items-center '>
          <div><img src="./phone.png" alt="" width="20" className='cursor-pointer' /></div>
          <div><img src="./video.png" alt="" width="20" className='cursor-pointer' /></div>
          <div><img src="./info.png" alt="" width="20" className='cursor-pointer' /></div>
        </div>

      </div>
      <div className="chats flex flex-col gap-2 h-[80vh] overflow-y-auto no-scrollbar" ref={scrollRef}>
        {
          message.map((item, index) => (
            <div className={item.senderId == currentUser.id ? "flex flex-col items-end" : 'flex flex-col items-start'} key={index}>
              <div className="chat text-white p-2 flex gap-2 max-w-[80%]">
                {item.senderId != currentUser.id && <div>
                  <div className="w-[28px] h-[28px] rounded-[50%] overflow-clip">
                    <img src={receiverUser.avatar || "./avatar.png"} alt="Avatar" className="w-[28px] h-[28px] " />
                  </div>
                </div>}
                <div className="text flex flex-col gap-1">
                  {item.photo && <div className="img">
                    <img
                      src={item.photo}
                      alt="Chat Image"
                      className="rounded-md"
                    />
                  </div>}
                  <div className={item.senderId == currentUser.id ? "msg  bg-blue-500 p-2 rounded-md max-w-fit" : "msg bg-[rgba(17,25,40,0.3)] p-2 rounded-md max-w-fit"}>
                    {item.msg}
                  </div>
                  <div className="time text-sm">{handleTime(item.timeElapsed)}</div>
                </div>
              </div>
            </div>
          ))
        }

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
            <label htmlFor="imgupload" className="w-[28px]">
              <img src="./img.png" alt=""  />
            </label>
            <input type="file" name="" id="imgupload" className='hidden' accept="image/*" onChange={handleImage} />
          </div>
          <input
            type="text"
            className="bg-[#4A4A58] text-white focus:outline-none ml-2 w-[80%]"
            placeholder="Type a Message..."
            value={msg}
            onChange={handleChange}
          />
          <div className=' flex  gap-2'>
            <button><img src="./mic.png" alt="" width="24" /></button>
            <button onClick={handleSend} disabled={!img && !msg} className='disabled:cursor-not-allowed'><img src="./send.png" alt="" width="24"  /></button>

          </div>
        </div>

      </div>


    </div>
  )
}

export default chat
