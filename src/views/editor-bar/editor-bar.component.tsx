import { RootState } from "@/store";
import { addEmptySubtitle, editorSubtitle, setEditable } from "@/store/app/action";
import { formatTime } from "@/utils/time-helper";
import { Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { DownloadComponent } from "../download/download.component";
import { UploadComponent } from "../upload/upload.component";
import { MouseEvent } from 'react';

export function EditorBarComponent() {
  const { currentTime } = useSelector((state: RootState) => state.app);



  return (
    <div className="p-2">
      <UploadComponent></UploadComponent>
      <DownloadComponent></DownloadComponent>
      <EditableButton></EditableButton>
      <AddButton></AddButton>
      <span className="ms-1">{formatTime(parseFloat(currentTime))}</span>
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
    }} variant={editable ? 'secondary' : 'success'}>{editable ? '編輯字幕' : '播放'}
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