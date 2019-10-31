import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getDate, format, addMilliseconds, addHours, getISODay, getTime } from 'date-fns'
import { get } from 'lodash'

import * as styles from './styles'
import { dateInfoSelector, eventsSelector } from 'selectors'
import { eachDayOfWeek, eachHourOfDay, getDayByKor } from 'utils'
import { takeOpenEventForm } from 'ducks/eventForm'
import { fetchEventsActionMap } from 'ducks/events'
import { arrangeEventsByDay } from 'utils'

const SEGMENT = 48
const ONE_HOUR_MILLIS = 1000 * 60 * 60

const getEventSize = (startTime: number, endTime: number) => {
  return (endTime - startTime) / ONE_HOUR_MILLIS
}

const getEventBase = (baseTime:number, startTime: number) => {
  return (startTime - baseTime) / ONE_HOUR_MILLIS
}

export default function MonthlyView(): JSX.Element {
  const { currentDate } = useSelector(dateInfoSelector)
  const events = useSelector(eventsSelector)
  const { 0: weeklyEvents, 1: setWeeklyEvents } = useState<{ [key: number]: Event[]}>(arrangeEventsByDay(events))
  const dailyRepeater = eachDayOfWeek(currentDate)
  const timeRepeater = eachHourOfDay(currentDate)
  const dispatch = useDispatch()

  const handleColumnClick = (date: Date) => (evt: React.MouseEvent<HTMLDivElement>) => {
    /**
     * 일간 Column Element의 높이
     */
    const { height } = evt.currentTarget.getBoundingClientRect()
    /**
     * 높이 단위 - 총 48분할하여 한 unit당 30분의 간격으로 이벤트를 생성할 수 있다.
     */
    const unitHeight = height / SEGMENT
    const unitTime = (1000 * 60 * 60 * 24) / 48
    const eventStartTime = Math.floor(evt.nativeEvent.offsetY / unitHeight) * unitTime

    dispatch(takeOpenEventForm({
      startDate: addMilliseconds(date, eventStartTime),
      endDate: addHours(addMilliseconds(date, eventStartTime), 1),
      mode: 'create',
    }))
  }

  useEffect(() => {
    dispatch(fetchEventsActionMap.request())
  }, [currentDate, dispatch])

  useEffect(() => {
    setWeeklyEvents(arrangeEventsByDay(events))
  }, [events, setWeeklyEvents])

  return (
    <div>
      <styles.Container>
        <styles.Gap />
        <styles.HeadersWrapper>
          <styles.Headers>
            {dailyRepeater((date) => {
              return (
                <styles.Header key={date.toString()}>
                  <h2>
                    <div>{getDayByKor(date)}</div>
                    <div>{getDate(date)}</div>
                  </h2>
                </styles.Header>
              )
            })}
          </styles.Headers>
        </styles.HeadersWrapper>
      </styles.Container>
      <styles.PlansContainer>
        <styles.Timeline>
          {timeRepeater((date) => {
            return (
              <div key={date.toString()}>
                <span>{format(date, 'HH:mm')}</span>
              </div>
            )
          })}
        </styles.Timeline>
        <styles.PlansWrapper>
          <styles.Underlines>
            {timeRepeater((date) => {
              return (
                <div key={date.toString()} />
              )
            })}
          </styles.Underlines>
          {dailyRepeater((date) => {
            const dailyIndex = getISODay(date)
            return (
              <styles.PlansColumn
                key={`plan-col-${dailyIndex}`}
                onClick={handleColumnClick(date)}
              >
                <styles.Panel></styles.Panel>
                <styles.Presentaion>
                  {get(weeklyEvents, `${dailyIndex}`, []).map((event: Event) => {
                    return (
                      <styles.WeeklyEventCell
                        key={`weekly-event-cell-${event.id}`}
                        base={getEventBase(getTime(date), event.startTime)}
                        size={getEventSize(event.startTime, event.endTime)}
                        event={event}
                      />
                    )
                  })}
                </styles.Presentaion>
              </styles.PlansColumn>
            )
          })}
        </styles.PlansWrapper>
      </styles.PlansContainer>
    </div>
  )
}