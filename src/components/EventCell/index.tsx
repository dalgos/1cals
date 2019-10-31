import React from 'react'
import styled from 'styled-components'
import { format } from 'date-fns'

interface Props {
  className?: string;
  time: number;
  title: string;
}

const EventCell: React.FC<Props> = ({
  className,
  time,
  title,
}) => {
  return (
    <div className={className}>
      <div>{format(time, 'hh:mm')}</div>
      <h2>{title}</h2>
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
`