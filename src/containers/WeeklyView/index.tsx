import React, { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getDate, format, addMilliseconds, addHours } from 'date-fns'

import * as styles from './styles'
import { dateInfoSelector } from 'selectors'
import { eachDayOfWeek, eachHourOfDay, getDayByKor } from 'utils'
import { takeOpenEventForm } from 'ducks/eventForm'

// function getEventTimeByOffsetY(date = new Date(), height, offsetY) {
//   const seconds = 1000 * 60 * 60 * 24
//   const percent = offsetY / height
//   const todaysStart = startOfDay(date)
//   return addMilliseconds(todaysStart, Math.floor(seconds * percent))
// }

const SEGMENT = 48

export default function MonthlyView(): JSX.Element {
  const { currentDate } = useSelector(dateInfoSelector)
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
            return (
              <styles.PlansColumn onClick={handleColumnClick(date)}>
                <styles.Panel></styles.Panel>
                <styles.Presentaion></styles.Presentaion>
              </styles.PlansColumn>
            )
          })}
        </styles.PlansWrapper>
      </styles.PlansContainer>
    </div>
  )
}