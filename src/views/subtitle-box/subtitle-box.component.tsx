import { RootState } from "@/store";
import { editorFontInfo } from "@/store/app/action";
import { convertTimeToSeconds } from "@/utils/time-helper";
import { RefObject, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

interface SubtitleBoxProps {
  parentRef: RefObject<HTMLDivElement>
  parentWidth: number
}

export function SubtitleBoxComponent({ parentRef, parentWidth }: SubtitleBoxProps) {
  const currentRef = useRef<HTMLDivElement>(null)
  const { editable, currentSubtitle, currentTime, fontInfo: { bottom, left, fontSize } } = useSelector((state: RootState) => state.app);
  // const [left, setLeft] = useState(0)
  // const [bottom, setBottom] = useState(20)
  // const [fontSize, setFontSize] = useState(16)
  const [text, setText] = useState('')
  const dispatch = useDispatch()


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
    const startTime = convertTimeToSeconds(currentSubtitle.startTime)
    const endTime = convertTimeToSeconds(currentSubtitle.endTime)
    const newTime = parseFloat(currentTime)
    if ((startTime < newTime) && (newTime < endTime)) {
      setText(currentSubtitle.text)
    } else {
      setText('')
    }

  }, [text, currentSubtitle, currentTime])

  useEffect(() => {
    parentRef.current?.offsetWidth
    if (currentRef.current && parentRef.current) {
      const parentX = parentWidth / 2
      const currentX = currentRef.current.offsetWidth / 2
      const newLeft = parentX - currentX
      dispatch(editorFontInfo({ bottom, fontSize, left: newLeft }))
    }

  }, [parentWidth, parentRef, currentRef, text, left, dispatch, fontSize, bottom])

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (!editable) {
        if (event.code === 'KeyE') {
          const newFontSize = fontSize + 1
          if (newFontSize > 0) {
            dispatch(editorFontInfo({ bottom, left, fontSize: newFontSize }))
          }

        }

        if (event.code === 'KeyQ') {
          const newFontSize = fontSize - 1
          if (newFontSize > 0) {
            dispatch(editorFontInfo({ bottom, left, fontSize: newFontSize }))
          }
        }

        if (event.code === 'KeyW') {
          const newBottom = bottom + 1
          dispatch(editorFontInfo({ fontSize, left, bottom: newBottom }))

        }

        if (event.code === 'KeyS') {
          const newBottom = bottom - 1
          dispatch(editorFontInfo({ fontSize, left, bottom: newBottom }))
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [fontSize, bottom, editable, dispatch, left]);

  return (
    <div ref={currentRef} style={styles} dangerouslySetInnerHTML={{ __html: text }}>
    </div>
  )
}