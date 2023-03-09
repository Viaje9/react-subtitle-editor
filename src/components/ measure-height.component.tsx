import { setVideoHeight } from '@/store/app/action';
import React, { useRef, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';

interface Props {
  children: React.ReactNode;
}

const MeasureHeight: React.FC<Props> = ({ children }) => {
  const videoHeight = useSelector((state: RootState) => state.app.videoHeight);
  const dispatch = useDispatch()
  const ref = useRef<HTMLDivElement>(null);

  const handleResize = () => {
    if (ref.current) {
      const newHeight = ref.current.offsetHeight;
      if (newHeight !== videoHeight) {
        dispatch(setVideoHeight(newHeight))
      }
    }
  };

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div ref={ref}>
      {children}
    </div>
  );
};

export default MeasureHeight;
