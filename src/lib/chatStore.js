import { create } from "zustand";// Adjust import path
import { chat } from "./appwrite";

import db from "./database";

const chatStore = create((set) => ({
    // Initial state
    receiverUser:null,
    messageID:null,
    message:[],
    showDetails:false,
    hasBlockedReceiver:false,
    

    // Actions
    fetchReceiverUserInfo: async (id, chatList, isReceiverBlocked ,isSenderBlocked) => {
        try {
            const userInfo = await chat.getDocument(
                import.meta.env.VITE_DB_ID,
                import.meta.env.VITE_USERS_ID,
                id
            )         
            set({ receiverUser: { ...userInfo, isReceiverBlocked ,isSenderBlocked } }); // Update store with user data
 
            try {
                var messageid = "";
                const res = chatList.chats.find((item) => {
                    const parsedItem = JSON.parse(item);
                    return parsedItem.userId === id;
                });
                // console.log(res);
                const resp=JSON.parse(res);
                if (resp) {
                    messageid  = resp.messageID;
                    // console.log("MessageID:", messageid);
                }
                var message=await db["Message"].get(messageid);
                message  = message.message.map((item) => JSON.parse(item));
                set({messageID:messageid,message:message})
            } catch (err) {
                console.error("Failed to fetch message:", err);
            }
        } catch (err) {
            console.error("Failed to fetch user info:", err);
            set({ receiverUser: null}); // In case of error, reset user data
        }
    },
    fetchMessage: async(messageid)=>{
        var message = await db["Message"].get(messageid);
        message = message.message.map((item) => JSON.parse(item));
        set({ messageID: messageid, message: message })
    },
    setReceiverNull : ()=>{
        set({receiverUser:null,messageID:null,message:[]})
    },
    toggleDetails: (val)=>{
        set({ showDetails: val });
    },
    toggleBlock : (receiverUser,userid,receiverid)=>{
        // console.log("Clicked")
        try{
            const ids = [
                {
                    senderId: userid,
                    receiverId: receiverid,
                },
                {
                    senderId: receiverid,
                    receiverId: userid,
                }
            ];
            ids.forEach(async (item) => {
                const chatUser = await db["ChatUser"].get(item.senderId)

                const chatList = chatUser.chats.map((it) => {
                    let element = JSON.parse(it)
                    if (element.userId == item.receiverId) {
                        if(item.senderId==userid){
                            element.isReceiverBlocked=!element.isReceiverBlocked;
                        }
                        if(item.senderId==receiverid){
                            element.isSenderBlocked=!(element.isSenderBlocked);
                        }
                    }
                    console.log(element)
                    return JSON.stringify(element);
                })
                // console.log(chatList)
                await db["ChatUser"].update(item.senderId, { chats: chatList })
            })
            receiverUser.isSenderBlocked = !receiverUser.isSenderBlocked;
            set({ receiverUser: receiverUser })
        }catch{
            console.log("Error")
            
        }
        
         
        
    }
}));

export default chatStore;
