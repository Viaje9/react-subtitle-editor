import { RootState } from "@/store";
import { addEmptySubtitle, editorSubtitle, onClickPlay, setEditable } from "@/store/app/action";
import { formatTime } from "@/utils/time-helper";
import { Alert, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { DownloadComponent } from "../download/download.component";
import { UploadComponent } from "../upload/upload.component";
import { MouseEvent } from 'react';
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
  const { editable } = useSelector((state: RootState) => state.app);
  const dispatch = useDispatch()

  return (
    <Button className="ms-1" onClick={(event) => {
      (event.target as any).blur()
      event.preventDefault()
      dispatch(setEditable(!editable))
    }} variant={editable ? 'secondary' : 'warning'}>{editable ? '編輯裝態' : '播放狀態'}
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