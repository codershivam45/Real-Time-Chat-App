import React, { useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'


const login = () => {
  const [isLogin, setisLogin] = useState(false)
  
  const handleSignup =async  (e) => {
    e.preventDefault()
    
    

  }
  const handleLogin =async (e) => {
    e.preventDefault()

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
      <ToastContainer />
      <div className="container md:w-[80%] mx-auto ">
        <div className="nav flex justify-between  my-4">
          <div className="logo"><span>&lt;</span><span>Chat</span><span>/&gt;</span></div>
          <div className="links ">
            <ul className='flex gap-5' >
              <li className='cursor-pointer'>Login</li>
              <li className='cursor-pointer'>Signup</li>
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
              <div >Login for continue chatting with friends/family</div>
              <form action="" className=' flex flex-col gap-4 my-2' onSubmit={handleLogin}>
                <div className="username w-[100%] flex bg-white p-2">
                   <img src="./user.svg" className=' w-4' alt="" />
                    <input type="text" placeholder="Enter Username" className='text-black w-[100%] outline-none' />
                </div>
                  <div className="password username w-[100%] flex bg-white p-2">
                  <img src="./lock.svg" className=' w-4' alt="" />
                    <input type="password" placeholder="Enter Password" className='text-black w-[100%] outline-none' />
                </div>
                <button className='bg-blue-500 p-2'>Login</button>
              </form>
              <div className='text-center'>Don&apos;t have an account <span onClick={toggleLogin}>Signup</span> </div></>
               :
                <>
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
                    <button className='bg-blue-500 p-2'>Signup</button>
                  </form>
                  <div className='text-center'>Have an account <span onClick={toggleLogin}>Login</span> </div></>

            }

            <div className='text-center'>Login/Signup Using </div>
            <button>Google</button>
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
