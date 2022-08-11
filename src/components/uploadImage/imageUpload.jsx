import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { MdOutlinePhotoSizeSelectActual, MdOutlineModeEditOutline } from 'react-icons/md';
import './upload-image.scss'

function ImageUpload({ title, handleChangeFunc, image }) {
  const [img, setImg] = useState(image);

  const handleChange = async (event) => {
    if (!event) return;
    const files = event?.target?.files;
    if (files && files?.length) {
      const file = files[0];
      handleChangeFunc(file);
      return;
      console.log("file uploaded", file.type);
      const url = `${process.env.REACT_APP_BASE_URL}/image-upload/signed-url/?bucket=school-management-01&key=profile`;
      const signedUrlData = await axios.get(url);
      console.log("signed url data", signedUrlData.data)
      if (signedUrlData && signedUrlData?.data?.error === false) {
        console.log("ready to post data to aws");
        const signedUrl = signedUrlData?.data?.data;
        const postedImageUrl = await axios.put(signedUrl, file, {
          headers: {
            'Content-Type': file.type
          }
        });
        console.log("this is posted url", postedImageUrl);
      }
    }
    console.log("event", event);
  }
  return (
    <div className='ImageUpload'>
      <p className='image-upload-title'>{title}</p>
      <div className='image-input-placeholder'>
        {
          !image ?
            <div className='empty-image'>
              <MdOutlinePhotoSizeSelectActual size={100} style={{ color: '#aaa' }} />
            </div>
            :
            <div className='show-image'>
              <img src={URL.createObjectURL(image)} alt="" />
            </div>
        }
        <label htmlFor="hidden-image-upload-input" className='circle-image-button'>
          <MdOutlineModeEditOutline />
          <input
            className='hidden-input'
            type="file"
            id="hidden-image-upload-input"
            name="hidden-image-upload-input"
            onChange={(event) => handleChange(event)}
            accept=".png, .jpg, .jpeg"
          />
        </label>
      </div>
    </div>
  )
}

export default ImageUpload;