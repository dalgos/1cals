import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getDate, getISOWeek, getISODay, getHours, getMinutes, setHours, setMinutes, addHours, setDate, getMonth, set } from 'date-fns'
import { get } from 'lodash'

import { dateInfoSelector, eventsSelector } from 'selectors'
import { getCalendarCells } from 'utils'
import { Grid, RowGroup, MonthlyEventCell } from './styles'
import DayCell from 'components/DayCell'
import {
  HeaderCell,
  Row,
} from 'components/Calendar'
import { takeOpenEventForm, takeSubmitEvent } from 'ducks/eventForm'
import { fetchEventsActionMap } from 'ducks/events'
import { arrangeEvents, calcNextEventDate } from 'utils'

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
    const currentDate = new Date()
    const currentHours = getHours(currentDate)
    const currentMinutes = getMinutes(currentDate)
    const startDate = setHours(setMinutes(selectedDate, currentMinutes), currentHours)
    dispatch(takeOpenEventForm({
      startDate,
      endDate: addHours(startDate, 1),
      mode: 'create',
    }))
  }

  /**
   * 날짜 셀 드랍 이벤트 발생시 대상 eventID 와 day 값을 이용해
   * 대상 일정의 기간을 업데이트합니다.
   * @param eventID 
   */
  const handleDayCellDrop = (eventData: string, targetDate: Date) => {
    const {
      startTime,
      endTime,
      title,
      id,
    } = JSON.parse(eventData)

    const {
      nextStartTime,
      nextEndTime,
    } = calcNextEventDate(
      startTime,
      endTime,
      targetDate,
    )
    
    // 드랍 이벤트 발생 시 form submit 액션을 이용하여 일정을 업데이트합니다.
    dispatch(takeSubmitEvent({
      endTime: nextEndTime,
      id: parseInt(id, 10),
      startTime: nextStartTime,
      title,
    }))
  }
  
  // 현재 기준날짜가 변경되는 경우, 목록을 새로 요청합니다.
  useEffect(() => {
    dispatch(fetchEventsActionMap.request())
  }, [currentDate, dispatch])
  // 일정 목록이 갱신되는 경우 일정 state를 업데이트합니다.
  useEffect(() => {
    setEventsByMonthly(arrangeEvents(events))
  }, [events, setEventsByMonthly])
  
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
            {rows.map(({ seq, timestamp }) => {
              const weekIndex = getISOWeek(timestamp)
              const dayIndex = getISODay(timestamp)
              return (
                <DayCell
                  date={timestamp}
                  day={`${getDate(timestamp)}`}
                  key={seq}
                  onClick={handleCellClick}
                  onDrop={handleDayCellDrop}
                >
                  {get(eventsByMonthly, `${weekIndex}.${dayIndex}`, []).map((event: Event) => {
                    return (
                      <MonthlyEventCell
                        key={`monthly-event-cell-${event.id}`}
                        event={event}
                      />
                    )
                  })}
                </DayCell>
              )
            })}
          </RowGroup>
        )
      })}
    </Grid>
  )
}