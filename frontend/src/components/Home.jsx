import React from 'react'
import { useSelector } from 'react-redux'

function Home() {
 const user = useSelector((state)=>state.login.user)
  return user ? (
    <div className="flex flex-col justify-center items-center my-20">
      Welcome to home page <span className='text-lg text-amber-600'>{user.firstName}</span>
    </div>
  ) : null
}

export default Home