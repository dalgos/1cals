import React from 'react'
import styled from 'styled-components'

interface WeekPresentationProps {
  className?: string;
  children: React.ReactNode | React.ReactNodeArray;
  date: Date;
  onDrop: (eventData: string, targetDate: Date) => void;
}

type DropEventHandler = React.DragEventHandler<HTMLDivElement>;
type DragEventHandler = DropEventHandler;

const WeekPresentation: React.FC<WeekPresentationProps> = ({
  className,
  children,
  date,
  onDrop,
}) => {
  /**
   * dragover 이벤트 핸들러
   * @param {React.DragEvent} evt drag over event
   */
  const handleDragOver: DragEventHandler = (evt) => evt.preventDefault()
  /**
   * drop 이벤트 핸들러
   * @param {React.DragEvent} evt drop event
   */
  const handleDrop: DropEventHandler = (evt) => {
    const eventData = evt.dataTransfer.getData('text')
    onDrop(eventData, date)
    evt.preventDefault()
  }
  return (
    <div
      className={className}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      {children}
    </div>
  )
}

export default styled(WeekPresentation)`
  position: relative;
  height: 100%;
  width: 100%;
`
