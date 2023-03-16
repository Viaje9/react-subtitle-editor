import { RootState } from "@/store";
import { addEmptySubtitle, editorSubtitle, onClickPlay, setEditable } from "@/store/app/action";
import { convertTimeToSeconds, formatTime } from "@/utils/time-helper";
import { Alert, Button, Form, InputGroup } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { DownloadComponent } from "../download/download.component";
import { UploadComponent } from "../upload/upload.component";
import { MouseEvent, useEffect, useState } from 'react';
import './editor-bar.css'

export function EditorBarComponent() {
  const { currentTime } = useSelector((state: RootState) => state.app);

  return (
    <div className="p-2 d-flex justify-content-between text-nowrap">
      <div className="d-flex">
        <UploadComponent></UploadComponent>
        <DownloadComponent></DownloadComponent>
        <EditableButton></EditableButton>
        <AddButton></AddButton>
        <Alert className="ms-1 my-0 p-1 timeAlert">
          {formatTime(parseFloat(currentTime))}
        </Alert>
        <Alert className="ms-1 my-0 p-1">
          {(parseFloat(currentTime))}
        </Alert>

      </div>
      <div>
        <PlayButton></PlayButton>
      </div>
    </div>
  )
}


function EditableButton() {
  const { editable, subtitleList } = useSelector((state: RootState) => state.app);
  const dispatch = useDispatch()
  const [firstEditable, setFirstEditable] = useState('')

  useEffect(() => {
    const editableState = subtitleList.some((e) => e.editable)

    if (editableState) {
      const startTime = subtitleList.find(e => e.editable)?.startTime || ''
      setFirstEditable(startTime)
    }

    dispatch(setEditable(editableState))
  }, [editable, subtitleList, dispatch])

  return (
    <Button className="ms-1" variant={editable ? 'secondary' : 'warning'}>
      {editable ? `編輯狀態 ${convertTimeToSeconds(firstEditable)}` : '播放狀態'}
    </Button>)
}

function AddButton() {
  const { currentSubtitle } = useSelector((state: RootState) => state.app);
  const dispatch = useDispatch()

  const handleClick = () => {
    dispatch(addEmptySubtitle({
      startTime: currentSubtitle.startTime,
    }))
  }

  return (
    <Button className="ms-1" onClick={handleClick}>
      新增字幕
    </Button>
  )
}

function PlayButton() {
  const { played } = useSelector((state: RootState) => state.app);
  const dispatch = useDispatch()

  return (
    <Button variant={played ? 'danger' : "success"} className="ms-1" onClick={(e) => {
      (e.target as any).blur()
      e.preventDefault()

      dispatch(onClickPlay({
        pending: true,
        played: !played
      }))
    }}>
      {played ? '暫停' : '播放'}
    </Button>
  )
}


// function FastForwardInput(params: type) {
//   const { currentTime } = useSelector((state: RootState) => state.app);
// 
//   
// 
//   return (
//     <InputGroup className="timeInput p-1 me-1">
//       <Form.Control className="p-1" type="number" step="0.1" value={currentTime} onChange={onStartTimeChange} />
//     </InputGroup>
//   )
// }