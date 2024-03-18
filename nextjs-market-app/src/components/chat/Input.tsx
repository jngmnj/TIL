import previewImage from '@/helpers/previewImage';
import uploadImage from '@/helpers/uploadImage';
import axios from 'axios';
import React, { FormEvent, useRef, useState } from 'react'
import { CgClose } from 'react-icons/cg';
import { IoImageOutline } from 'react-icons/io5';
import { RiSendPlaneLine } from 'react-icons/ri';
import useSWR from 'swr';
import useSWRMutation from 'swr/mutation';

interface InputProps {
  receiverId: string;
  currentUserId: string;
}

const sendRequest = (url:string, {arg} : {
  arg: {
    text: string;
    image: string;
    receiverId: string;
    senderId: string;
  }
}) => {
  return fetch(url, {
    method: 'POST',
    body: JSON.stringify(arg)
  }).then(res => res.json());
}

const Input = ({
  receiverId,
  currentUserId
}: InputProps) => {
  const [message, setMessage] = useState("");
  const [image, setImage] = useState<File | null>(null); // cloudinary에 업로드할 이미지 데이터
  const [imagePreview, setImagePreview] = useState<string | null>(null); // preview할 이미지 데이터

  // 이미지업로드 : file input에 ref등록
  const imageRef = useRef<HTMLInputElement>(null);

  const chooseImage = () => {
    imageRef.current?.click()
  }

  // SWR으로 채팅 입력/전송시 DB에 요청하기전에 UI에 먼저 보여줌
  const { trigger } = useSWRMutation("/api/chat", sendRequest);

  const removeImage = () => {
    setImagePreview(null);
    setImage(null);
  }
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // const imageUrl = "";
    const imageUrl = image ? await uploadImage(image as File) : null;

    if (message || imageUrl) {
      try {
        trigger({
          text: message,
          image: imageUrl,
          receiverId: receiverId,
          senderId: currentUserId,
        });
        // await axios.post('/api/chat', {
        //   text: message,
        //   image: imageUrl,
        //   receiverId: receiverId,
        //   senderId: currentUserId
        // })
      } catch (error) {
        console.error(error);
      }
    }
    setMessage("");
    setImagePreview(null);
    setImage(null);
  };
  return (
    <form
      onSubmit={handleSubmit}
      className="relative flex items-center justify-between w-full gap-4 p-2 pl-4 border-[1px] border-gray-300 rounded-md shadow-sm"
    >
      {imagePreview && (
        <div className='absolute right-0 w-full overflow-hidden rounded-md bottom-[4.2rem] max-w-[300px] shadow-md'>
          <img src={imagePreview} alt='' />
          <span 
            onClick={() => removeImage()}
            className='absolute flex items-center justify-center p-2 text-xl text-white bg-gray-900 cursor-pointer top-[0.4rem] right-[0.4rem] rounded-full opacity-60 hover:opacity-100'>
            <CgClose />
          </span>
        </div>
      )}
      <input
        className="w-full text-base outline-none"
        type="text"
        placeholder="메시지를 입력하세요."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <input
        type="file"
        onChange={(e) => previewImage(e, setImagePreview, setImage)}
        className="hidden"
        ref={imageRef}
        accept="image/*"
        multiple={false}
      />
      <div
        className="text-2xl text-gray-200 cursor-pointer"
        onClick={() => chooseImage()}
      >
        <IoImageOutline />
      </div>
      <button
        type="submit"
        className="flex items-center justify-center p-2 text-gray-900 bg-orange-500 rounded-lg cursor-pointer hover:bg-orange-600 disabled:opacity-60"
      >
        <RiSendPlaneLine className="text-white" />
      </button>
    </form>
  );
}

export default Input