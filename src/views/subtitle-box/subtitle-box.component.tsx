import { RootState } from "@/store";
import { RefObject, useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";

interface SubtitleBoxProps {
  parentRef: RefObject<HTMLDivElement>
  parentWidth: number
}

export function SubtitleBoxComponent({ parentRef, parentWidth }: SubtitleBoxProps) {
  const currentRef = useRef<HTMLDivElement>(null)
  const { currentSubtitle } = useSelector((state: RootState) => state.app);
  const [left, setLeft] = useState(0)
  const [bottom, setBottom] = useState(20)
  const [fontSize, setFontSize] = useState(16)
  const { editable } = useSelector((state: RootState) => state.app);

  useEffect(() => {
    parentRef.current?.offsetWidth
    if (currentRef.current && parentRef.current) {
      const parentX = parentWidth / 2
      const currentX = currentRef.current.offsetWidth / 2
      setLeft(parentX - currentX)
    }

  }, [parentWidth, parentRef, currentRef, currentSubtitle.text, left, fontSize, bottom])

  const styles = {
    position: 'absolute' as const,
    bottom: bottom,
    left: left,
    'zIndex': '99999',
    'backgroundColor': 'rgba(0, 0, 0)',
    color: 'white',
    padding: '5px',
    'borderRadius': '5px',
    'textAlign': 'center' as const,
    'fontSize': fontSize
  };



  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (!editable) {
        if (event.code === 'KeyE') {
          const newFontSize = fontSize + 1
          setFontSize(newFontSize)
        }

        if (event.code === 'KeyQ') {
          const newFontSize = fontSize - 1
          setFontSize(newFontSize)
        }

        if (event.code === 'KeyW') {
          const newBottom = bottom + 1
          setBottom(newBottom)
        }

        if (event.code === 'KeyS') {
          const newBottom = bottom - 1
          setBottom(newBottom)
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [fontSize, bottom, editable]);

  return (
    <div ref={currentRef} style={styles} dangerouslySetInnerHTML={{ __html: currentSubtitle.text }}>
    </div>
  )
}