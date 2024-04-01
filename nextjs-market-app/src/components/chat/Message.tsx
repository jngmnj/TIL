import React from 'react'
import Avatar from '../Avatar';
import { fromNow } from '@/helpers/dayjs';

interface MessageProps {
  isSender: boolean;
  messageText?: string | null;
  messageImage?: string | null;
  receiverName: string;
  receiverImage: string;
  senderImage: string | null;
  time: Date;
}

const Message = ({
  isSender,
  messageText,
  messageImage,
  receiverName,
  receiverImage,
  senderImage,
  time
}: MessageProps) => {
  // 로그인된 유저의 메시지는 오른쪽
  // 상대방의 메시지는 왼쪽
  return (
    <div
      className={`grid w-full grid-cols-[40px_1fr] gap-3 mx-auto`}
      style={{ direction: `${isSender ? 'rtl' : 'ltr'}` }}
    >
      <div>
        <Avatar src={senderImage && isSender ? senderImage : receiverImage} />
      </div>
      <div className='flex felx-col '>
        <div>
          <span>{isSender ? "You" : receiverName}</span>
          <span className="text-xs text-gray-500 opacity-80">
            {fromNow(time)}
          </span>
        </div>
        {messageText && (
          <div
            className={`p-2 break-all text-white rounded-lg
              ${
                isSender
                  ? "bg-orange-500 rounded-tr-none"
                  : "bg-gray-400 rounded-tl-none"
              }`}
          >
            <p>{messageText}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Message