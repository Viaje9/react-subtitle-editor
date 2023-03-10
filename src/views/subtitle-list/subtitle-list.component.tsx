import { Subtitle } from "@/models/subtitle";
import { RootState } from "@/store";
import { ChangeEvent, useState } from "react";
import { Button, Card, Form, InputGroup, ListGroup } from "react-bootstrap";
import { useSelector } from "react-redux";
import './subtitle-list.css'



export function SubtitleListComponent() {
  const { subtitleList, currentSubtitle, videoHeight } = useSelector((state: RootState) => state.app);

  return (
    <Card className="subtitleList" style={{ maxHeight: videoHeight }}>
      <ListGroup className="subtitleGroup">
        {subtitleList.map((subtitle) => (<SubtitleItem key={subtitle.number} subtitle={subtitle} currentNumber={currentSubtitle.number} />))}
      </ListGroup>
    </Card>
  )
}

interface SubtitleItemProps {
  subtitle: Subtitle
  currentNumber: number
}

enum Status {
  EDIT,
  CONFIRM
}

function SubtitleItem({ subtitle, currentNumber }: SubtitleItemProps) {
  const [text, setText] = useState(subtitle.text)
  const [buttonStatus, setButtonStatus] = useState<Status>(Status.CONFIRM)
  const isCurrentSubtitle = subtitle.number === currentNumber

  const onSubtitleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value
    if (value) {
      setText(value)
    }
  }

  const onStateButtonClick = () => {
    if (buttonStatus === Status.CONFIRM) {
      setButtonStatus(Status.EDIT)
    }

    if (buttonStatus === Status.EDIT) {
      setButtonStatus(Status.CONFIRM)
    }
  }

  return (
    <ListGroup.Item className="subtitleItem d-flex" key={subtitle.number} variant={isCurrentSubtitle ? "primary" : ""} >
      <Button className="m-1 text-nowrap" onClick={onStateButtonClick} variant={buttonStatus === Status.CONFIRM ? "danger" : "primary"}>
        {
          (() => {
            switch (buttonStatus) {
              case Status.CONFIRM:
                return '編輯'
              case Status.EDIT:
                return '確認'
            }
          })()
        }
      </Button>
      <InputGroup>
        <Form.Control disabled={buttonStatus === Status.CONFIRM} value={text} onChange={onSubtitleChange} />
      </InputGroup>
    </ListGroup.Item>
  )
}


