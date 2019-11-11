import React from 'react'
import { isToday } from 'date-fns'

import { Cell } from './styles'

interface Props {
  children: React.ReactNode;
  date: Date;
  day: string;
  onClick: (date: Date) => void;
  onDrop: (eventData: string, targetDate: Date) => void;
}

type DragEventHandler = React.DragEventHandler<HTMLDivElement>
type DropEventHandler = DragEventHandler

export default function DayCell({
  children,
  day,
  date,
  onClick,
  onDrop,
}: Props): JSX.Element {
  /**
   * 날짜 셀 클릭 이벤트 핸들러
   */
  const handleClick = () => onClick(date)
  /**
   * 이벤트 셀 드롭 이벤트 핸들러
   * @param {React.DragEvent} evt
   */
  const handleDrop: DropEventHandler = (evt) => {
    const eventData = evt.dataTransfer.getData('text')
    onDrop(eventData, date)
    evt.preventDefault()
  }
  const handleDragOver: DragEventHandler = (evt) => {
    evt.preventDefault()
  }
  return (
    <Cell
      activated={isToday(date)}
      onClick={handleClick}
      onDrop={handleDrop}
      onDragOver={handleDragOver}
    >
      <h2>{day}</h2>
      <div>{children}</div>
    </Cell>
  )
}