import React from 'react'
import User from './User'
import ChatList from './ChatList'
const list = () => {
  return (
    <div className=' border border-transparent md:border-r-[#b9b7b71d]'>
      <User  />
      <ChatList/>
    </div>
  )
}

export default list
