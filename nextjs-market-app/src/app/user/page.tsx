// import { authOptions } from '@/pages/api/auth/[...nextauth]'
// import { getServerSession } from 'next-auth'
import React from 'react'
// import getCurrentUser from '../actions/getCurrentUser'

const UserPage = async () => {

  // const session = await getServerSession(authOptions);
  // console.log("server session", session)
  return (
    <div>로그인된 사용자만 볼 수있는 페이지</div>
  )
}

export default UserPage