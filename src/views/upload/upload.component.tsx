import Button from 'react-bootstrap/Button';
import React, { useRef, ChangeEvent } from 'react';
import { srtToJson } from '@/utils/srtToJson';
import { useDispatch } from 'react-redux';
import { initSubtitle } from '@/store/app/action';

export function UploadComponent() {
  const dispatch = useDispatch()
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    fileInputRef.current?.click();
  };

  const handleFileInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.addEventListener("load", (e) => {
        if (typeof e.target?.result === "string") {
          const subtitleList = srtToJson(e.target?.result);          
          dispatch(initSubtitle({ subtitleList }))
        } else {
          alert('請傳入srt格式')
        }

      }, false);
      reader.readAsText(file);
    }
  };
  
  return <>
    <Button onClick={handleClick} variant="success">上傳</Button>
    <input
      ref={fileInputRef}
      type="file"
      accept=".srt"
      onChange={handleFileInputChange}
      style={{ display: 'none' }}
    /> </>
}