import React, { useEffect } from 'react'
import './App.css'
import './index.css'
import Chat from './components/Chat'
import Details from './components/details';
import List from './components/List'
import Login from './components/Login'
import useUserStore from './lib/useStore'
import chatStore from './lib/chatStore'
import { DotLottieReact } from '@lottiefiles/dotlottie-react';



function App() {

  const { currentUser, isLoading, fetchUserInfo } = useUserStore();
  const { receiverUser, setReceiverNull, showDetails, toggleDetails } = chatStore();
  useEffect(() => {
    // localStorage.clear();
    // window.location.reload(); 
    fetchUserInfo();

  }, [fetchUserInfo])


  return (
    <>
      {isLoading ?


        <div className="loading-container w-[100vw] h-[100vh]">

          <DotLottieReact
            src="https://lottie.host/8fa9989f-74cb-43c6-9882-25ce5554adc3/HcKsqbdZsv.json"
            loop
            autoplay
            className=' m-auto w-[60vw]  h-[90vh]'
          />

          <div className='text-center text-xl'>Loading ... </div>
        </div>
        :

        currentUser ?
          <>
            < div className="flex h-screen relative">
              <div className={receiverUser ? "flex-1 bg-[#2E2E38]   overflow-y-auto  no-scrollbar hidden lg:block " : "flex-1 bg-[#2E2E38]   overflow-y-auto  no-scrollbar "}>
                <List />
              </div>
              {!receiverUser && <div className='hidden md:block flex-[2] bg-[#2E2E38]  border border-transparent text-white lg:border-l-[#b9b7b71d] '>
                <div className='flex justify-center items-center h-[100%] text-center '>
                  <div>
                    <DotLottieReact
                      src="https://lottie.host/8fa9989f-74cb-43c6-9882-25ce5554adc3/HcKsqbdZsv.json"
                      loop
                      autoplay
                      className=' m-auto w-[50vw]'
                    />
                    <div className="logo text-3xl  mt-5 ">&lt;CHAT/&gt;</div>
                    <div className='mt-2'>Send and Receive Message </div>
                    <div>Talk with your friends , family and colleagues</div>

                  </div>
                </div>
              </div>
              }
              {receiverUser && <div className={showDetails ? "hidden md:block flex-[2] bg-[#2E2E38]  border border-transparent lg:border-l-[#b9b7b71d] md:border-r-[#b9b7b71d] relative overflow-y-auto  no-scrollbar" : "flex-[2] bg-[#2E2E38]  border border-transparent lg:border-l-[#b9b7b71d] md:border-r-[#b9b7b71d] relative overflow-y-auto  no-scrollbar"}>
                <button onClick={() => { setReceiverNull() }} className=' lg:hidden absolute z-10 top-[28px] left-[8px]'>
                  <img src="./back.svg" alt="" width="20" />
                </button>
                <Chat />
              </div>}
              {receiverUser && <div className={showDetails ? "flex-1 bg-[#2E2E38]  overflow-y-auto  no-scrollbar " : "flex-1 bg-[#2E2E38]  overflow-y-auto  no-scrollbar hidden md:block"}>
                <button onClick={() => { toggleDetails(false) }} className=' md:hidden absolute z-10 top-[28px] left-[24px] '>
                  <img src="./back.svg" alt="" width="24" />
                </button>
                <Details />
              </div>}
            </div >
          </> : <Login />
      }



    </>
  )
}

export default App
