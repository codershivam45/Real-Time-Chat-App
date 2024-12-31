import { create } from "zustand";
import { account } from './appwrite'; // Adjust import path
import { chat } from "./appwrite";

const useUserStore = create((set) => ({
    // Initial state
    currentUser: null,
    chatList:[],
    isLoading: true,

    // Actions
    fetchUserInfo: async () => {
        set({ isLoading: true }); // Start loading

        try {
            const user = await account.get();
            // console.log(user); // Fetch user info from Appwrite
            const userInfo =await chat.getDocument(
                import.meta.env.VITE_DB_ID,
                import.meta.env.VITE_USERS_ID,
                user.$id
            )
            const chats =await chat.getDocument(
                import.meta.env.VITE_DB_ID,
                import.meta.env.VITE_CHATUSER_ID,
                user.$id
            )
            // console.log(userInfo,chats);
            set({ currentUser: userInfo,chatList:chats, isLoading: false }); // Update store with user data
        } catch (err) {
            console.error("Failed to fetch user info:", err);
            set({ currentUser: null, isLoading: false }); // In case of error, reset user data
        }
    },
    fetchChatList: async (id)=>{
        const chats = await chat.getDocument(
            import.meta.env.VITE_DB_ID,
            import.meta.env.VITE_CHATUSER_ID,
            // user.$id
            id
        )
        set({chatList:chats})
    },
    logout : async ()=>{
        try{
            await account.deleteSession('current');
            set({currentUser: null, isLoading:false});
        }catch(err){
            console.error("Logout Error :",err);
        }
    }
}));

export default useUserStore;
