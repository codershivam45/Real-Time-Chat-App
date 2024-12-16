import React from 'react'
import './App.css'
import './index.css'
import Chat from './components/Chat'
import Details from './components/details'
import List from './components/list'
import Login from './components/Login'
import { useState } from 'react'
function App() {
  
  const [user, setuser] = useState(false)

  return (
    <>
     {user ? 
     <>
          <div className="flex h-screen relative">
            <div className="flex-1 bg-[#2E2E38]   overflow-y-auto  no-scrollbar ">
              <List />
            </div>
            <div className="flex-[2] bg-[#2E2E38]  border border-transparent border-l-[#b9b7b71d] border-r-[#b9b7b71d] relative overflow-y-auto  no-scrollbar">
              <Chat />
            </div>
            <div className="flex-1 bg-[#2E2E38]  overflow-y-auto  no-scrollbar">
              <Details />
            </div>
          </div>
     </>: <Login/>}
      
    </>
  )
}

export default App
