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
            const user = await account.get(); // Get authenticated user

            const userInfo = await chat.getDocument(
                import.meta.env.VITE_DB_ID,
                import.meta.env.VITE_USERS_ID,
                user.$id
            );

            const chats = await chat.getDocument(
                import.meta.env.VITE_DB_ID,
                import.meta.env.VITE_CHATUSER_ID,
                user.$id
            );

            set({ currentUser: userInfo, chatList: chats, isLoading: false });

        } catch (err) {
            console.error("Failed to fetch user info:", err);

            // Check if the document is missing (Appwrite 404)
            if (err.code === 404 || err.message.includes('Document with the requested ID')) {
                console.warn("User document not found. Clearing session and storage.");

                // Optional: Clear localStorage
                localStorage.clear();

                // Optional: Delete session to force logout
                try {
                    await account.deleteSession('current');
                } catch (logoutErr) {
                    console.error("Error during session deletion:", logoutErr);
                }

                // Reload app to force login or onboarding
                window.location.reload();
            } else {
                // For other errors
                set({ currentUser: null, isLoading: false });
            }
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
