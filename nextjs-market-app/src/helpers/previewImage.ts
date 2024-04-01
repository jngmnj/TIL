const previewImage = (e: any, setImagePreview: any, setImage: any) => {
    // flie정보
    // console.log(e.target.files[0]);
    
    // file을 url로 변경
    const file = e.target.files[0];
    setImage(file); // cloudinary에 업로드할것
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      // 인코딩된 url
      // console.log(reader.result);
      setImagePreview(reader.result);
    }
}

export default previewImage;