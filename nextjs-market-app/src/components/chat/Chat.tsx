import { TUserWithChat } from '@/types'
import React from 'react'
import Input from './Input';

interface ChatProps {
  currentUser: TUserWithChat;
  receiver: {
    receiverId: string,
    receiverName: string,
    receiverImage: string
  };
  setLayout: (layout: boolean) => void;
}
const Chat = ({
    currentUser,
    receiver,
    setLayout
}: ChatProps) => {
    if(!receiver.receiverName || !currentUser) {
        return <div className='w-full h-full'></div>
    }
  return (
    <div className='w-full'>
        {/* chat header */}
        <div className=''>

        </div>
        {/* chat body */}
        <div className='flex flex-col gap-8 p-4 overflow-hidden h-[calc(100vh_-_60px_-_70px_-_80px)]'>

        </div>
        {/* input */}
        <div>
            <Input 
                receiverId={receiver?.receiverId}
                currentUserId={currentUser?.id}
            />
        </div>
    </div>
  )
}

export default Chat