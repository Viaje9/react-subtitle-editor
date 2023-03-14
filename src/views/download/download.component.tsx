import { RootState } from "@/store";
import { toSrt } from "@/utils/toSrt";
import { Button } from "react-bootstrap";
import { useSelector } from "react-redux";

export function DownloadComponent() {
  const { subtitleList } = useSelector((state: RootState) => state.app);


  const handleClick = () => {
  
    const element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(toSrt(subtitleList)));
    element.setAttribute('download', 'video.srt');
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  }
  return <>
    <Button onClick={handleClick} variant="success">下載</Button>
  </>
} 