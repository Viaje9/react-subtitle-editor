import { Subtitle } from "@/models/subtitle";
import { RootState } from "@/store";
import { useEffect, useState } from "react";
import { Card, ListGroup } from "react-bootstrap";
import { useSelector } from "react-redux";
import './subtitle-list.css'

export function SubtitleListComponent() {
  const { subtitleList, currentTime, videoHeight } = useSelector((state: RootState) => state.app);
  const [list, setList] = useState<Subtitle[]>([]);

  useEffect(() => {
    setList(subtitleList)
  }, [subtitleList, list])


  return (
    <Card className="subtitleList" style={{ maxHeight: videoHeight }}>
      <ListGroup>
        {list.map((subtitle) => SubtitleItem(subtitle, currentTime))}
      </ListGroup>
    </Card>
  )
}


function SubtitleItem(subtitle: Subtitle, currentTime: string) {
  console.log(currentTime);

  return (
    <ListGroup.Item key={subtitle.number} variant="primary" dangerouslySetInnerHTML={{ __html: subtitle.text }} ></ListGroup.Item>
  )
}