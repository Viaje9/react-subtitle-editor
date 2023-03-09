import { RootState } from "@/store";
import { Card, ListGroup } from "react-bootstrap";
import { useSelector } from "react-redux";
import './subtitle-list.css'

export function SubtitleListComponent() {
  const appState = useSelector((state: RootState) => state.app);
  return (
    <Card className="subtitleList" style={{ 'maxHeight': `${appState.videoHeight}px` }}>
      <ListGroup>
        {appState.subtitleList.map(((subtitle) => (<ListGroup.Item key={subtitle.number} dangerouslySetInnerHTML={{ __html: subtitle.text }}></ListGroup.Item>)))}
      </ListGroup>
    </Card>
  )
}