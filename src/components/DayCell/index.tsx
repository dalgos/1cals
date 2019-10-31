import React from 'react'
import { isToday } from 'date-fns'

import { Cell } from './styles'

interface Props {
  children: React.ReactNode;
  date: Date;
  day: string;
  onClick: (date: Date) => void;
}

export default function DayCell({
  children,
  day,
  date,
  onClick,
}: Props): JSX.Element {
  const handleClick = () => onClick(date)
  return (
    <Cell
      activated={isToday(date)}
      onClick={handleClick}
    >
      <h2>{day}</h2>
      <div>{children}</div>
    </Cell>
  )
}