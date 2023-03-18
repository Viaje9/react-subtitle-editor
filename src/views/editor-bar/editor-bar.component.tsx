import { RootState } from "@/store";
import { addEmptySubtitle, editorSubtitle, onClickPlay, setEditable } from "@/store/app/action";
import { convertTimeToSeconds, formatTime } from "@/utils/time-helper";
import { Alert, Button, Form, InputGroup } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { DownloadComponent } from "../download/download.component";
import { UploadComponent } from "../upload/upload.component";
import { MouseEvent, useContext, useEffect, useState } from 'react';
import './editor-bar.css'
import { VideoContext } from "../app/app";

export function EditorBarComponent() {
  const { currentTime } = useSelector((state: RootState) => state.app);

  return (
    <div className="p-2 d-flex justify-content-between text-nowrap">
      <div className="d-flex">
        <UploadComponent></UploadComponent>
        <DownloadComponent></DownloadComponent>
        <EditableButton></EditableButton>
        <AddButton></AddButton>
        <Alert className="ms-1 my-0 timeAlert">
          {formatTime(parseFloat(currentTime))}
          <br />
          {(parseFloat(currentTime))}
        </Alert>
        <FastForwardInput></FastForwardInput>
      </div>
      <div className="d-flex">
        <ControlsButton></ControlsButton>
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
      {editable ? `編輯 ${convertTimeToSeconds(firstEditable)}` : '播放'}
    </Button>)
}

function AddButton() {
  const { currentSubtitle } = useSelector((state: RootState) => state.app);
  const dispatch = useDispatch()

  const handleClick = () => {
    // const endTime = parseFloat((convertTimeToSeconds(currentSubtitle.endTime) - 0.01).toFixed(3))
    dispatch(addEmptySubtitle({
      startTime: currentSubtitle.endTime,
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


function FastForwardInput() {
  const [time, setTime] = useState('')
  const { handleEvent } = useContext(VideoContext)

  return (
    <InputGroup className="fstForwardInput p-1 me-1">
      <Form.Control type="number" inputMode="decimal" step="0.1" value={time} onChange={(e) => { setTime(e.target.value) }} />
      <Button onClick={() => {
        handleEvent(parseFloat(time))
      }}>更新</Button>
    </InputGroup>
  )
}

function ControlsButton() {
  const { currentTime } = useSelector((state: RootState) => state.app);
  const { handleEvent } = useContext(VideoContext)

  return (
    <InputGroup className="p-1 me-1">
      <Button onClick={(e) => {
        (e.target as any).blur()
        e.preventDefault()
        handleEvent(parseFloat(currentTime) - 0.05)
      }}>倒轉</Button>
      <Button onClick={(e) => {
        (e.target as any).blur()
        e.preventDefault()
        handleEvent(parseFloat(currentTime) + 0.05)
      }}>快轉</Button>
    </InputGroup>
  )
}
