import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getDate } from 'date-fns'

import { dateInfoSelector } from 'selectors'
import { getCalendarCells } from 'utils'
import { Grid, RowGroup } from './styles'
import DayCell from 'components/DayCell'
import {
  HeaderCell,
  Row,
} from 'components/Calendar'
import { takeOpenEventForm } from 'ducks/eventForm'

export default function MonthlyView(): JSX.Element {
  const dispatch = useDispatch()
  const { currentDate } = useSelector(dateInfoSelector)
  const handleCellClick = (selectedDate: Date) => {
    console.log(selectedDate)
    dispatch(takeOpenEventForm({
      startDate: selectedDate,
      endDate: selectedDate,
      mode: 'create',
    }))
  }
  
  return (
    <Grid>
      <Row>
        <HeaderCell>일요일</HeaderCell>
        <HeaderCell>월요일</HeaderCell>
        <HeaderCell>화요일</HeaderCell>
        <HeaderCell>수요일</HeaderCell>
        <HeaderCell>목요일</HeaderCell>
        <HeaderCell>금요일</HeaderCell>
        <HeaderCell>토요일</HeaderCell>
      </Row>
      {getCalendarCells(currentDate).map((rows, idx) => {
        return (
          <RowGroup key={`row-group-${idx}`}>
            {rows.map(({ seq, timestamp }, idx) => {
              return (
                <DayCell
                  date={timestamp}
                  day={`${getDate(timestamp)}`}
                  key={seq}
                  onClick={handleCellClick}
                />
              )
            })}
          </RowGroup>
        )
      })}
    </Grid>
  )
}