import { Subtitle } from "@/models/subtitle";
import { RootState } from "@/store";
import { Card, ListGroup } from "react-bootstrap";
import { useSelector } from "react-redux";
import './subtitle-list.css'

export function SubtitleListComponent() {
  const { subtitleList, currentSubtitle, videoHeight } = useSelector((state: RootState) => state.app);

  return (
    <Card className="subtitleList" style={{ maxHeight: videoHeight }}>
      <ListGroup>
        {subtitleList.map((subtitle) => SubtitleItem(subtitle, currentSubtitle.number))}
      </ListGroup>
    </Card>
  )
}


function SubtitleItem(subtitle: Subtitle, currentNumber: number) {
  const isCurrentSubtitle = subtitle.number === currentNumber

  return (
    <ListGroup.Item key={subtitle.number} variant={isCurrentSubtitle ? "primary" : ""} dangerouslySetInnerHTML={{ __html: subtitle.text }} ></ListGroup.Item>
  )
}