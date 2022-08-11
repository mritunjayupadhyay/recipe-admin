import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { MdOutlinePhotoSizeSelectActual, MdOutlineModeEditOutline } from 'react-icons/md';
import './upload-image.scss'

function ImageUpload({ title, handleChangeFunc, image, pathString }) {
  const [loading, setLoading] = useState(false);

  const handleChange = async (event) => {
    if (!event) return;
    const files = event?.target?.files;
    if (files && files?.length) {
      const file = files[0];
      // handleChangeFunc(file);
      console.log("file uploaded", file.type, pathString);
      const url = `${process.env.REACT_APP_BASE_URL}/image-upload/signed-url/?bucket=${process.env.REACT_APP_BUCKET}&key=${pathString}&fixedPath=N`;
      const signedUrlData = await axios.get(url);
      console.log("signed url data", signedUrlData.data)
      if (signedUrlData && signedUrlData?.data?.error === false) {
        const signedUrl = signedUrlData?.data?.data?.url;
        console.log("ready to post data to aws", signedUrl);
        await axios.put(signedUrl, file, {
          headers: {
            'Content-Type': file.type
          }
        });
        handleChangeFunc(signedUrlData?.data?.data?.key);
        console.log("this is posted url", signedUrlData);
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
              <img src={`${process.env.REACT_APP_S3_URL_PREFIX}/${image}`} alt="" />
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