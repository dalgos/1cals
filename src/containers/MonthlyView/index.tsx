import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getDate, getISOWeek, getISODay } from 'date-fns'
import { get } from 'lodash'

import { dateInfoSelector, eventsSelector } from 'selectors'
import { getCalendarCells } from 'utils'
import { Grid, RowGroup, EventCell } from './styles'
import DayCell from 'components/DayCell'
import {
  HeaderCell,
  Row,
} from 'components/Calendar'
import { takeOpenEventForm } from 'ducks/eventForm'
import { fetchEventsActionMap } from 'ducks/events'
import { arrangeEvents } from 'utils'


export default function MonthlyView(): JSX.Element {
  const dispatch = useDispatch()
  const { currentDate } = useSelector(dateInfoSelector)
  const events = useSelector(eventsSelector)
  const { 0: eventsByMonthly, 1: setEventsByMonthly } = useState<{ [key: number]: { [key: number]: Event[] } }>(arrangeEvents(events))
  
  /**
   * 날짜 Cell 클릭 이벤트 핸들러
   * @param selectedDate
   */
  const handleCellClick = (selectedDate: Date) => {
    dispatch(takeOpenEventForm({
      startDate: selectedDate,
      endDate: selectedDate,
      mode: 'create',
    }))
  }
  
  // 현재 기준날짜가 변경되는 경우, 목록을 새로 요청합니다.
  useEffect(() => {
    dispatch(fetchEventsActionMap.request())
  }, [currentDate])
  // 일정 목록이 갱신되는 경우 일정 state를 업데이트합니다.
  useEffect(() => {
    setEventsByMonthly(arrangeEvents(events))
  }, [events])
  
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
      {getCalendarCells(currentDate).map((rows, ridx) => {
        return (
          <RowGroup key={`row-group-${ridx}`}>
            {rows.map(({ seq, timestamp }, idx) => {
              const weekIndex = getISOWeek(timestamp)
              const dayIndex = getISODay(timestamp)
              return (
                <>
                  <DayCell
                    date={timestamp}
                    day={`${getDate(timestamp)}`}
                    key={seq}
                    onClick={handleCellClick}
                  >
                    {get(eventsByMonthly, `${weekIndex}.${dayIndex}`, []).map((event: Event) => {
                      return (
                        <EventCell>{event.title}</EventCell>
                      )
                    })}
                  </DayCell>
                </>
              )
            })}
          </RowGroup>
        )
      })}
    </Grid>
  )
}