import axios from 'axios';
import React from 'react';
import './upload-image.scss'

function ImageUpload() {
  const handleChange = async (event) => {
    if (!event) return;
    const files = event?.target?.files;
    if (files && files?.length) {
      const file = files[0];
      console.log("file uploaded", file);
      const url = `${process.env.REACT_APP_BASE_URL}/image-upload/signed-url/?bucket=school-management-01&key=profile`;
      const signedUrlData = await axios.get(url);
      console.log("signed url data", signedUrlData.data)
      if (signedUrlData && signedUrlData?.data?.error === false) {
        console.log("ready to post data to aws");
        const signedUrl = signedUrlData?.data?.data;
        const postedImageUrl = await axios.post(signedUrl, file, {
          headers: {
            'Content-Type': 'image/png'
          }
        });
        console.log("this is posted url", postedImageUrl);
      }
    }
    console.log("event", event);
  }
  return (
    <div className='ImageUpload'>
        <input type="file" onChange={(event) => handleChange(event)} />
    </div>
  )
}

export default ImageUpload;