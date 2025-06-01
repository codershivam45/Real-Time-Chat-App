import useUserStore from '../lib/useStore'

const User = () => {
  const { currentUser } = useUserStore();

  // console.log(currentUser.avatar);
  return (
    <div className='flex p-4 justify-between items-center text-white bg-[#110f0f49] sticky top-0 z-10 opacity-100 backdrop-blur-3xl border-b border-gray-800/50'>
      <div className='flex items-center gap-3'>
        <div className='w-[48px] h-[48px] rounded-[50%] overflow-clip border-2 border-gray-700/50 shadow-lg'>
          <img
            src={currentUser.avatar || './avatar.png'}
            alt={currentUser.username || 'User'}
            className='w-full h-full object-cover'
          />
        </div>
        <div className='text-lg font-medium hover:text-gray-300 transition-colors duration-200 cursor-pointer'>
          {currentUser.username || 'User'}
        </div>
      </div>
      <div className='flex gap-4 items-center'>
        {/* <button className='p-2 hover:bg-gray-800/50 rounded-full transition-colors duration-200'>
          <img
            src="./more.png"
            alt="More options"
            width="20"
            className='opacity-80 hover:opacity-100 transition-opacity duration-200'
          />
        </button> */}
      </div>
    </div>
  )
}

export default User
