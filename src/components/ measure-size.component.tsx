import { ChangeSizeInfo } from '@/models/change-size-info';
import React, { useRef, useState, useEffect, useCallback } from 'react';
interface Props {
  children: React.ReactNode;
  onSizeChange?: (changeInfo: ChangeSizeInfo) => void;
}

const MeasureSize: React.FC<Props> = ({ children, onSizeChange }) => {
  const [height, setHeight] = useState(0);
  const [width, setWidth] = useState(0);

  const ref = useRef<HTMLDivElement>(null);


  useEffect(() => {
    if (ref.current && (!height || !width)) {
      const newHeight = ref.current.offsetHeight;
      const newWidth = ref.current.offsetWidth;
      if (newHeight || newWidth) {
        setHeight(newHeight);
        setWidth(newWidth);
        if (onSizeChange) {
          onSizeChange({ width: newWidth, height: newHeight });
        }
      }

    }
  }, [ref, height, width])

  const uesHandleResize = useCallback(() => {
    if (ref.current) {
      const newHeight = ref.current.offsetHeight;
      const newWidth = ref.current.offsetWidth;
      if ((newHeight !== height) || (newWidth !== width)) {
        setHeight(newHeight);
        setWidth(newWidth);
        if (onSizeChange) {
          onSizeChange({ width: newWidth, height: newHeight });
        }
      }
    }

  }, [width, height, onSizeChange]);

  useEffect(() => {
    window.addEventListener('resize', uesHandleResize);
    return () => {
      window.removeEventListener('resize', uesHandleResize);
    };
  }, [uesHandleResize]);

  return (
    <div ref={ref}>
      {children}
    </div>
  );
};

export default MeasureSize;
