/* eslint-disable react-hooks/rules-of-hooks */

/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import { account, chat, storage } from '../lib/appwrite';
import useUserStore from '../lib/useStore';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
const login = () => {
  const [isLogin, setisLogin] = useState(false)
  const [isLoad, setisLoad] = useState(false);
  const [img, setimg] = useState(null)
  // const [isLoading,setisLoading]=useState(false);
  const { isLoading, currentUser, fetchUserInfo } = useUserStore();


  const handleSignup = async (e) => {
    e.preventDefault();
    setisLoad(true);
    // isLoading=true;
    const formData = new FormData(e.target);
    const { username, email, password } = Object.fromEntries(formData);
    const avatarFile = formData.get('avatar');
    try {
      // console.log(avatarFile)
      const res = await account.create('unique()', email, password);
      await account.createEmailPasswordSession(email, password)
      // Create a session to log the user in
      let avatarID = null;

      if (avatarFile && avatarFile.name) {
        // console.log(avatarFile)
        const file = avatarFile
        const response = await storage.createFile(import.meta.env.VITE_BUCKET_AVATARS_ID, 'unique()', file);
        avatarID = response.$id;
        const imageUrl = storage.getFileView(
          import.meta.env.VITE_BUCKET_AVATARS_ID, // Your storage bucket ID
          avatarID,    // File ID
        );
        avatarID = imageUrl
      }

      // Add user details to the database
      await chat.createDocument(
        import.meta.env.VITE_DB_ID,       // Database ID
        import.meta.env.VITE_USERS_ID,   // Collection ID
        res.$id,                          // Use the same userId for the document ID
        {
          id: res.$id,                   // Store user ID as part of the document data
          username,
          email,
          avatar: avatarID,
          blocked: []
        }
      );
      await chat.createDocument(
        import.meta.env.VITE_DB_ID,       // Database ID
        import.meta.env.VITE_CHATUSER_ID,   // Collection ID
        res.$id,                          // Use the same userId for the document ID
        {
          chats: []
        }
      );
      setimg(null)
      // Show success message
      toast.success("Account created successfully!");
    } catch (err) {
      // Log full error for debugging
      console.error("Signup Error:", err);

      // Show error message
      toast.error(err.message || "Failed to create account");
    } finally {
      setisLoad(false);
      fetchUserInfo();
    }
  };


  const handleLogin = async (e) => {
    e.preventDefault()
    setisLoad(true);
    const formData = new FormData(e.target);
    const { email, password } = Object.fromEntries(formData);
    // console.log(email,password);
    try {
      await account.createEmailPasswordSession(email, password)
      // const response = await checkUserStatus();
      // setUser(response);
      toast.success('Logined Successfully')
    } catch (error) {
      console.error(error);
    } finally {
      setisLoad(false);
      fetchUserInfo();
    }


  }
  const toggleLogin = () => {
    setisLogin(prev => { return !prev })
  }
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-blue-900 via-black to-gray-900">
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <div className="w-full max-w-md mx-auto p-6 rounded-2xl shadow-2xl bg-[#18181b]/90 backdrop-blur-lg animate-fade-in">
        <div className="flex justify-between items-center mb-6">
          <div className="logo text-2xl font-bold text-blue-400 flex items-center gap-1">
            <span>&lt;</span><span>Chat</span><span>/&gt;</span>
          </div>
          <div className="flex gap-4">
            <button
              className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors duration-200 ${isLogin ? 'bg-blue-600 text-white' : 'bg-gray-700 text-gray-300'
                }`}
              onClick={() => setisLogin(true)}
            >
              Login
            </button>
            <button
              className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors duration-200 ${!isLogin ? 'bg-blue-600 text-white' : 'bg-gray-700 text-gray-300'
                }`}
              onClick={() => setisLogin(false)}
            >
              Signup
            </button>
          </div>
        </div>
        <div className="mb-6 text-center text-lg text-gray-200">
          {isLogin
            ? 'Login to continue chatting with friends/family'
            : 'Signup to start chatting with friends/family'}
        </div>
        <div>
          {!isLogin ? (
            <form className="flex flex-col gap-4" onSubmit={handleSignup}>
              <div className="relative">
                <input
                  type="text"
                  name="username"
                  placeholder="Enter Username"
                  className="w-full py-3 pl-10 pr-4 rounded-xl bg-gray-800 text-white border border-gray-700 focus:border-blue-500 focus:outline-none transition"
                />
                <img src="./user.svg" className="absolute left-3 top-1/2 -translate-y-1/2 w-5 opacity-70" alt="" />
              </div>
              <div className="relative">
                <input
                  type="email"
                  name="email"
                  placeholder="Enter Email"
                  className="w-full py-3 pl-10 pr-4 rounded-xl bg-gray-800 text-white border border-gray-700 focus:border-blue-500 focus:outline-none transition"
                />
                <img src="./user.svg" className="absolute left-3 top-1/2 -translate-y-1/2 w-5 opacity-70" alt="" />
              </div>
              <div className="relative">
                <input
                  type="password"
                  name="password"
                  placeholder="Enter Password"
                  className="w-full py-3 pl-10 pr-4 rounded-xl bg-gray-800 text-white border border-gray-700 focus:border-blue-500 focus:outline-none transition"
                />
                <img src="./lock.svg" className="absolute left-3 top-1/2 -translate-y-1/2 w-5 opacity-70" alt="" />
              </div>
              <div className="flex items-center gap-2">
                <label htmlFor="avatar" className="cursor-pointer text-blue-400 hover:underline">
                  {img ? (
                    <span className="flex items-center gap-1">
                      Avatar Uploaded <img src="./tick.png" alt="Uploaded" width={20} />
                    </span>
                  ) : (
                    'Upload Avatar'
                  )}
                </label>
                <input
                  type="file"
                  name="avatar"
                  id="avatar"
                  accept="image/*"
                  onChange={e => setimg(e.target.files[0]?.name)}
                  className="hidden"
                />
                <span className="text-gray-400 text-xs">{img}</span>
              </div>
              <button
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-xl transition disabled:bg-blue-300 disabled:cursor-not-allowed"
                disabled={isLoad}
              >
                {isLoad ? 'Signing Up...' : 'Signup'}
              </button>
            </form>
          ) : (
            <form className="flex flex-col gap-4" onSubmit={handleLogin}>
              <div className="relative">
                <input
                  type="email"
                  name="email"
                  placeholder="Enter Email"
                  className="w-full py-3 pl-10 pr-4 rounded-xl bg-gray-800 text-white border border-gray-700 focus:border-blue-500 focus:outline-none transition"
                />
                <img src="./user.svg" className="absolute left-3 top-1/2 -translate-y-1/2 w-5 opacity-70" alt="" />
              </div>
              <div className="relative">
                <input
                  type="password"
                  name="password"
                  placeholder="Enter Password"
                  className="w-full py-3 pl-10 pr-4 rounded-xl bg-gray-800 text-white border border-gray-700 focus:border-blue-500 focus:outline-none transition"
                />
                <img src="./lock.svg" className="absolute left-3 top-1/2 -translate-y-1/2 w-5 opacity-70" alt="" />
              </div>
              <button
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-xl transition disabled:bg-blue-300 disabled:cursor-not-allowed"
                disabled={isLoading}
              >
                {isLoading ? 'Loading...' : 'Login'}
              </button>
            </form>
          )}
        </div>
        <div className="mt-6 text-center text-gray-400">
          {isLogin ? (
            <span>
              Don&apos;t have an account?{' '}
              <span className="text-blue-400 hover:underline cursor-pointer" onClick={toggleLogin}>
                Signup
              </span>
            </span>
          ) : (
            <span>
              Have an account?{' '}
              <span className="text-blue-400 hover:underline cursor-pointer" onClick={toggleLogin}>
                Login
              </span>
            </span>
          )}
        </div>
        <div className="mt-8 text-center text-xs text-gray-500">
          &copy; 2024 &lt;Chat/&gt; All rights reserved | Design &amp; Developed by Shivam
        </div>
      </div>
    </div>
  )
}

export default login
