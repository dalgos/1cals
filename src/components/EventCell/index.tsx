import React from 'react'
import { useDispatch } from 'react-redux'
import styled from 'styled-components'
import { format } from 'date-fns'

import { takeOpenEventForm } from 'ducks/eventForm'

interface Props {
  className?: string;
  event: Event;
}

type ClickEventHandler = React.MouseEventHandler<HTMLDivElement>

const EventCell: React.FC<Props> = ({
  className,
  event,
}) => {
  const dispatch = useDispatch()
  const handleClick: ClickEventHandler = (evt) => {
    evt.preventDefault()
    evt.stopPropagation()
    dispatch(takeOpenEventForm({
      startDate: new Date(event.startTime),
      endDate: new Date(event.endTime),
      mode: 'edit',
      title: event.title,
      id: event.id,
    }))
  }
  return (
    <div
      className={className}
      onClick={handleClick}
    >
      <div>
        {format(event.startTime, 'hh:mm')}
      </div>
      <h2>
        {event.title}
      </h2>
    </div>
  )
}

export default styled(EventCell)`
  display: block;
  font-size: .6rem;
  h2 {
    margin: 0;
    font-size: .8rem;
  }
  cursor: pointer;
`