import { SubtitleInfo } from "@/models/subtitle";
import { RootState } from "@/store";
import { changeSubtitleInfoEditable, editorSubtitle, onClickPlay, removeSubtitle, setEditable } from "@/store/app/action";
import { convertTimeToSeconds, formatTime } from "@/utils/time-helper";
import { ChangeEvent, RefObject, useEffect, useRef, useState, MouseEvent } from "react";
import { Button, Card, Form, InputGroup, ListGroup } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import './subtitle-list.css'


export function SubtitleListComponent() {
  const { subtitleList, currentSubtitle, videoHeight } = useSelector((state: RootState) => state.app);
  const listGroupRef = useRef<HTMLDivElement>(null);

  return (
    <Card className="subtitleList" style={{ maxHeight: videoHeight }}>
      <ListGroup ref={listGroupRef} className="subtitleGroup">
        {subtitleList.map((subtitle) => (
          <SubtitleItem
            key={`${subtitle.text}-${subtitle.startTime}-${subtitle.endTime}`}
            listGroupRef={listGroupRef}
            subtitle={subtitle}
            currentNumber={currentSubtitle.number}
          />))}
      </ListGroup>
    </Card>
  )
}

interface SubtitleItemProps {
  subtitle: SubtitleInfo
  currentNumber: number
  listGroupRef: RefObject<HTMLDivElement>
}

function SubtitleItem({ subtitle, currentNumber, listGroupRef }: SubtitleItemProps) {
  const [text, setText] = useState(subtitle.text)
  const [startTime, setStartTime] = useState(() => `${convertTimeToSeconds(subtitle.startTime)}`)
  const [endTime, setEndTime] = useState(() => `${convertTimeToSeconds(subtitle.endTime)}`)
  const dispatch = useDispatch()
  const isCurrentSubtitle = subtitle.number === currentNumber
  const listItemRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    if (listItemRef.current && listGroupRef.current && isCurrentSubtitle) {
      const childOffsetTop = listItemRef.current.offsetTop
      listGroupRef.current.scrollTo(0, childOffsetTop)
    }

  }, [listItemRef, listGroupRef, isCurrentSubtitle])

  const onSubtitleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value
    if (value) {
      setText(value)
    }
  }

  const onStartTimeChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value
    if (value) {
      setStartTime(value)
    }
  }

  const onEndTimeChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value
    if (value) {
      setEndTime(value)
    }
  }

  const onStateButtonClick = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    if (!subtitle.editable) {
      dispatch(onClickPlay({
        pending: true,
        played: false
      }))
      const subtitleInfo: SubtitleInfo = {
        ...subtitle,
        editable: true
      }
      dispatch(changeSubtitleInfoEditable(subtitleInfo))
    }

    if (subtitle.editable) {
      const subtitleInfo: SubtitleInfo = {
        number: subtitle.number,
        text,
        startTime: formatTime(parseFloat(startTime)),
        endTime: formatTime(parseFloat(endTime)),
        editable: false
      }
      dispatch(editorSubtitle(subtitleInfo))
    }
  }

  return (
    <ListGroup.Item ref={listItemRef} className="subtitleItem d-flex" key={subtitle.number} variant={isCurrentSubtitle ? "primary" : ""} >
      <div className="d-flex flex-column">
        <Button className="m-1 text-nowrap" onClick={onStateButtonClick} variant={!subtitle.editable ? "danger" : "primary"}>
          {subtitle.editable ? '確認' : '編輯'}
        </Button>
        <RemoveButton number={subtitle.number}></RemoveButton>
      </div>
      <div className="d-flex flex-column">
        <div className="d-flex">
          <InputGroup className="timeInput p-1 me-1">
            <InputGroup.Text className="p-1">Start</InputGroup.Text>
            <Form.Control className="p-1" disabled={!subtitle.editable} type="number" step="0.1" value={startTime} onChange={onStartTimeChange} />
          </InputGroup>
          <InputGroup className="timeInput p-1 me-1">
            <InputGroup.Text className="p-1">End</InputGroup.Text>
            <Form.Control className="p-1" disabled={!subtitle.editable} type="number" step="0.1" value={endTime} onChange={onEndTimeChange} />
          </InputGroup>
        </div>
        <div className="ps-1">
          <InputGroup>
            <Form.Control as="textarea" disabled={!subtitle.editable} value={text} onChange={onSubtitleChange} />
          </InputGroup>
        </div>
      </div>


    </ListGroup.Item>
  )
}

interface RemoveButtonProps {
  number: number
}

function RemoveButton({ number }: RemoveButtonProps) {
  const dispatch = useDispatch()

  const handleClick = () => {
    const result = confirm('確定刪除？')
    if (result) {
      dispatch(removeSubtitle(number))
    }
  }
  return (
    <Button className="m-1" onClick={handleClick}>
      刪除
    </Button>
  )
}