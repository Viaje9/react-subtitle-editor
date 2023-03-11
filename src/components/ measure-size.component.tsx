import React, { useRef, useState, useEffect, useCallback } from 'react';

interface Props {
  children: React.ReactNode;
  onHeightChange?: (height: number) => void;
}

const MeasureSize: React.FC<Props> = ({ children, onHeightChange }) => {
  const [height, setHeight] = useState(0);
  const ref = useRef<HTMLDivElement>(null);

  const uesHandleResize = useCallback(() => {
    if (ref.current) {
      const newHeight = ref.current.offsetHeight;
      if (newHeight !== height) {
        setHeight(newHeight);
        if (onHeightChange) {
          onHeightChange(newHeight);
        }

      }
    }
  }, [height, onHeightChange]);

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
