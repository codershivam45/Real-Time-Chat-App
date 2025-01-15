import React, { useEffect } from 'react'
import './App.css'
import './index.css'
import Chat from './components/Chat'
import Details from './components/details'; 
import List from './components/List'
import Login from './components/Login'
import useUserStore from './lib/useStore'
import chatStore from './lib/chatStore'
function App() {

  const { currentUser, isLoading, fetchUserInfo } = useUserStore();
  const { receiverUser, setReceiverNull ,showDetails,toggleDetails} = chatStore();
  useEffect(() => {

    fetchUserInfo();

  }, [fetchUserInfo])


  return (
    <>
      {isLoading ?
        <div>Loading... </div> :

        currentUser ?
          <>
            < div className="flex h-screen relative">
              <div className={receiverUser ? "flex-1 bg-[#2E2E38]   overflow-y-auto  no-scrollbar hidden lg:block " : "flex-1 bg-[#2E2E38]   overflow-y-auto  no-scrollbar "}>
                <List />
              </div>
              {receiverUser && <div className={showDetails ?"hidden md:block flex-[2] bg-[#2E2E38]  border border-transparent lg:border-l-[#b9b7b71d] md:border-r-[#b9b7b71d] relative overflow-y-auto  no-scrollbar":"flex-[2] bg-[#2E2E38]  border border-transparent lg:border-l-[#b9b7b71d] md:border-r-[#b9b7b71d] relative overflow-y-auto  no-scrollbar"}>
                <button onClick={()=>{setReceiverNull()}} className=' lg:hidden absolute z-10 top-[28px] left-[8px]'> 
                  <img src="./back.svg" alt="" width="20" />
                </button>
                <Chat />
              </div>}
              {receiverUser && <div className={showDetails  ? "flex-1 bg-[#2E2E38]  overflow-y-auto  no-scrollbar ":"flex-1 bg-[#2E2E38]  overflow-y-auto  no-scrollbar hidden md:block"}>
                <button onClick={() => { toggleDetails(false)}} className=' md:hidden absolute z-10 top-[28px] left-[24px] '>
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
