import { Button } from "react-bootstrap";

export function DownloadComponent() {


  const handleClick = () => {
    const element = document.createElement('a');
    // element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(entriesToSRT(player.tracks[0].entries)));
    // element.setAttribute('download', fileName);

    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  }
  return <>
    <Button onClick={handleClick} variant="success">下載</Button>
  </>
} 