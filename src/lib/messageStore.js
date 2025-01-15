import { create } from "zustand";// Adjust import path
import { chat } from "./appwrite";
import chatStore from "./chatStore";

const {receiverUser,}
const chatStore = create((set) => ({
    // Initial state
    isRecieverBlocked:false,
    isUserBlocked:false,
    message:[],

    // Actions
    fetchMessage: async (id) => {
        try {
            const userInfo = await chat.getDocument(
                import.meta.env.VITE_DB_ID,
                import.meta.env.VITE_CHATUSER_ID, 
                id
            )
            console.log("Hi")
            console.log(userInfo)
            set({ receiverUser: userInfo, }); // Update store with user data
        } catch (err) {
            console.error("Failed to fetch user info:", err);
            set({ receiverUser: null }); // In case of error, reset user data
        }
    },
    // fetchChatList: async (id) => {
    //     const chats = await chat.getDocument(
    //         import.meta.env.VITE_DB_ID,
    //         import.meta.env.VITE_CHATUSER_ID,
    //         // user.$id
    //         id
    //     )
    //     set({ chatList: chats })
    // },
}));

export default chatStore;
