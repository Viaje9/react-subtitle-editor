import { RootState } from "@/store";
import { setEditable } from "@/store/app/action";
import { formatTime } from "@/utils/time-helper";
import { Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { DownloadComponent } from "../download/download.component";
import { UploadComponent } from "../upload/upload.component";

export function EditorBarComponent() {
  const { editable, currentTime } = useSelector((state: RootState) => state.app);
  const dispatch = useDispatch()



  return (
    <div className="p-2">
      <UploadComponent></UploadComponent>
      <DownloadComponent></DownloadComponent>
      <Button onClick={() => dispatch(setEditable(!editable))} variant={editable ? 'secondary' : 'success'}>{editable ? '編輯字幕' : '播放'}</Button>
      <span >{formatTime(parseFloat(currentTime))}</span>
    </div>
  )
}