import { CldUploadWidget } from 'next-cloudinary';
import Image from 'next/image';
import React from 'react'
import { TbPhotoPlus } from 'react-icons/tb';

interface ImageUploadProps {
    onChange: (value: string) => void;
    value: string;
}
const ImageUpload = ({
    onChange,
    value
}: ImageUploadProps) => {

  const handleUpload = (result: any) => {
    console.log('result', result);
    onChange(result.info.secure_url); // image 정보 https url 제공
  }

  const uploadPreset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;
  console.log("uploadPreste",uploadPreset)
  return (
    <CldUploadWidget
      onUpload={handleUpload}
      uploadPreset={uploadPreset}
      options={{
        maxFiles: 1,
      }}
    >
      {({ open }) => {
        return (
          <div
            className="relative flex flex-col items-center justify-center gap-4 p-20 transition border-2 border-dashed cursor-pointer hover:opacity-70 border-neutral-300 text-neutral-300"
            onClick={() => open?.()}
          >
            <TbPhotoPlus size={50} />
            {value && (
              <div className="absolute inset-0 w-full h-full">
                <Image fill style={{ objectFit: "cover" }} src={value} alt="" />
              </div>
            )}
          </div>
        );
      }}
    </CldUploadWidget>
  );
}

export default ImageUpload  