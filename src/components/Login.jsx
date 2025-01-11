/* eslint-disable react-hooks/rules-of-hooks */

/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import { account,chat,storage } from '../lib/appwrite';
import useUserStore from '../lib/useStore';
const login = () => {
  const [isLogin, setisLogin] = useState(false)
  const [isLoad,setisLoad]=useState(false);
  // const [isLoading,setisLoading]=useState(false);
  const { isLoading, currentUser, fetchUserInfo }=useUserStore();

  const handleSignup = async (e) => {
    e.preventDefault();
    setisLoad(true);
    // isLoading=true;
    const formData = new FormData(e.target);
    const { username, email, password } = Object.fromEntries(formData);
    const avatarFile=formData.get('avatar');
    try {
      // console.log(avatarFile)
      const res = await account.create('unique()', email, password);
      await account.createEmailPasswordSession(email, password)
      // Create a session to log the user in
      let avatarID=null;
      if(avatarFile && avatarFile.name){
        const file=avatarFile
        const response = await storage.createFile(import.meta.env.VITE_BUCKET_AVATARS_ID,'unique()',file);
        avatarID=response.$id;
        const imageUrl = storage.getFilePreview(
          import.meta.env.VITE_BUCKET_AVATARS_ID, // Your storage bucket ID
        avatarID  ,    // File ID
        );
        avatarID=imageUrl
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
          avatar:avatarID,
          blocked:[]
        }
      );
      await chat.createDocument(
        import.meta.env.VITE_DB_ID,       // Database ID
        import.meta.env.VITE_CHATUSER_ID,   // Collection ID
        res.$id,                          // Use the same userId for the document ID
        {
          chats:[]
        }
      );

      // Show success message
      toast.success("Account created successfully!");
    } catch (err) {
      // Log full error for debugging
      console.error("Signup Error:", err);

      // Show error message
      toast.error(err.message || "Failed to create account");
    }finally{
      setisLoad(false);
      fetchUserInfo();
    }
  };


  const handleLogin =async (e) => {
    e.preventDefault()
    setisLoad(true);
    const formData = new FormData(e.target);
    const { email, password } = Object.fromEntries(formData);
    // console.log(email,password);
    try {
      await account.createEmailPasswordSession(email,password)
      // const response = await checkUserStatus();
      // setUser(response);
      toast.success('Logined Successfully')
    } catch (error) {
      console.error(error);
    }finally{
      setisLoad(false);
      fetchUserInfo();
    }
    

  }
  const toggleLogin=()=>{
    setisLogin(prev=>{return !prev})
  }
  return (

    <div className="flex w-[100vw] h-[100vh] bg-black text-white ">
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
        theme="light"/>
     
      <div className="container md:w-[80%] mx-auto ">
        <div className="nav flex justify-between  my-4">
          <div className="logo"><span>&lt;</span><span>Chat</span><span>/&gt;</span></div>
          <div className="links ">
            <ul className='flex gap-5' >
              <li className='cursor-pointer' onClick={()=>{setisLogin(true)}}>Login</li>
              <li className='cursor-pointer' onClick={()=>{setisLogin(false)}}>Signup</li>
              <li className='cursor-pointer'>About Us</li>
              <li className='cursor-pointer'>Contact</li>
              <li className='cursor-pointer'>Help</li>
            </ul>
          </div>
        </div>
        <div className="body h-[85vh] flex items-center">
          <div className='mx-auto sm:w-[60%] md:w-[30%]'>
            
            {
              isLogin ? <>
              <div >Signup for continue chatting with friends/family</div>
                  <form action="" className=' flex flex-col gap-4 my-2' onSubmit={handleSignup}>
                    <div className="username w-[100%] flex bg-white p-2">
                      <img src="./user.svg" className=' w-4' alt="" />
                      <input type="text" placeholder="Enter Username" name="username" className='text-black w-[100%] outline-none' />
                    </div>
                    <div className="email w-[100%] flex bg-white p-2">
                      <img src="./user.svg" className=' w-4' alt="" />
                      <input type="email" placeholder="Enter email" name="email" className='text-black w-[100%] outline-none' />
                    </div>
                    
                    <div className="password username w-[100%] flex bg-white p-2">
                      <img src="./lock.svg" className=' w-4' alt="" />
                      <input type="password" placeholder="Enter Password" name="password" className='text-black w-[100%] outline-none' />
                    </div>
                    <div className="username w-[100%] flex bg-white p-2 text-black">
                      {/* <img src="./user.svg" className=' w-4' alt="" /> */}
                      <label htmlFor="avatar">Upload Image</label>
                      <input type='file' name="avatar" id="avatar" accept="image/*" className='text-black  outline-none' />
                    </div>
                    <button className='bg-blue-500 p-2 disabled:bg-blue-300 disabled:cursor-not-allowed' disabled={isLoad}>{isLoad ? "Signing Up.." : 'Signup'}</button>
                  </form>
                  <div className='text-center'>Have an account <span onClick={toggleLogin}>Login</span> </div></>

               :
                <>
                  <div >Login for continue chatting with friends/family</div>
                  <form action="" className=' flex flex-col gap-4 my-2' onSubmit={handleLogin}>
                    <div className="username w-[100%] flex bg-white p-2">
                      <img src="./user.svg" className=' w-4' alt="" />
                      <input type="email" placeholder="Enter email" name="email" className='text-black w-[100%] outline-none' />
                    </div>
                    <div className="password username w-[100%] flex bg-white p-2">
                      <img src="./lock.svg" className=' w-4' alt="" />
                      <input type="password" placeholder="Enter Password" name="password" className='text-black w-[100%] outline-none' />
                    </div>
                    <button className='bg-blue-500 p-2 disabled:bg-blue-300 disabled:cursor-not-allowed' disabled={isLoading}>{isLoading ? "Loading.." : 'Login'}</button>
                  </form>
                  <div className='text-center'>Don&apos;t have an account <span onClick={toggleLogin}>Signup</span> </div></>
                  

            }
          </div>

        </div>
        <div className="footer flex flex-col md:flex-row justify-between">
          <div className="links">
            <ul className='flex gap-5 justify-center'>
              <li className='cursor-pointer'>About Us</li>
              <li className='cursor-pointer'>Terms of Use</li>
              <li className='cursor-pointer'>Privacy Policy</li>
            </ul>
          </div>
          <div className='text-center'>
            <span>&copy;</span> 2024 <span>&lt;</span><span>Chat</span><span>/&gt;  </span>  All rights reserved | Design & Developed by Shivam
          </div>
        </div>
      </div>
    </div>
  )
}

export default login
