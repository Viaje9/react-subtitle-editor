import { setVideoHeight } from '@/store/app/action';
import React, { useRef, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';

interface Props {
  children: React.ReactNode;
  onHeightChange?: (height: number) => void;
}

const MeasureHeight: React.FC<Props> = ({ children, onHeightChange }) => {
  const [height, setHeight] = useState(0);
  const ref = useRef<HTMLDivElement>(null);

  const handleResize = () => {
    if (ref.current) {
      const newHeight = ref.current.offsetHeight;
      if (newHeight !== height) {
        setHeight(newHeight);
        if (onHeightChange) {
          onHeightChange(newHeight);
        }
     
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
