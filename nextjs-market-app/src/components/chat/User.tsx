import { TConversation, TUserWithChat } from '@/types'
import React from 'react'
import Avatar from '../Avatar';
import { fromNow } from '@/helpers/dayjs';

interface UserProps {
  user: TUserWithChat;
  currentUserId: string;
}
const User = ({ user, currentUserId }: UserProps) => {

  // 유저간의 대화 conversations에서 currentUserId 
  const messagesWithCurrentUser = user.conversations.find(
    (conversation: TConversation) => 
      conversation.users.find((user) => user.id === currentUserId)
  );

  // 최근 메시지 1건 가져옴
  // 마지막대화에서 첫번째 인덱스 아이템 리턴
  const latestMessage = messagesWithCurrentUser?.messages.slice(-1)[0];
  return (
    <div className='grid grid-cols-[40px_1fr_50px] grid-rows-[40px] gap-3 py-3 px-4 border-b-[1px] hover:cursor-pointer hover:bg-orange-500'>
      <div>
        <Avatar src={user.image} />
      </div>
      <div>
        <h3>{user.name}</h3>
        {latestMessage && 
          <p className='overflow-hidden text-xs font-medium text-gray-600 break-words whitespace-pre-wrap'>{latestMessage.text}</p>
        }
        {latestMessage && latestMessage.image && 
          <p className='text-xs font-medium text-gray-600'>이미지</p>
        }
      </div>
      <div>
        {latestMessage && (
          <p>
            {fromNow(latestMessage.createdAt)}
          </p>
        )}
      </div>
    </div>
  )
}

export default User