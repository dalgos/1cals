import {
  addDays,
  addHours,
  eachDayOfInterval,
  eachWeekOfInterval,
  getDay,
  getWeeksInMonth,
  startOfDay,
  startOfMonth,
  startOfWeek,
  getISOWeek,
} from 'date-fns'
import { get } from 'lodash'

/**
 * date가 포함된 주의 첫번째 날짜를 기준으로 7일의 date를 이용해 map을 수행한다.
 * @param {Date} date 기준 날짜
 */
export const eachDayOfWeek = (date: Date) => (callbackfn: (value: Date) => void) => {
  const weekStart = startOfWeek(date)
  return eachDayOfInterval({
    start: weekStart,
    end: addDays(weekStart, 6),
  }).map(callbackfn)
}

/**
 * date의 00시부터 24시까지 매 시간의 date를 포함하고 있는 배열의 map을 수행한다.
 * @param {Date} date 기준 날짜
 */
export const eachHourOfDay = (date: Date) => {
  const dayStart = startOfDay(date)
  const times = Array.from({ length: 24 }).map((_, idx) => {
    return addHours(dayStart, idx)
  })
  return (callbackfn: (value: Date) => void) => times.map(callbackfn)
}

/**
 * date의 한국 요일을 반환한다.
 * @param {Date} date 요일을 구할 대상 날짜
 */
export const getDayByKor = (date: Date) => (
  ['일', '월', '화', '수', '목', '금', '토'][getDay(date)]
)

/**
 * 달력 표시를 위한 Row 데이터를 반환한다.
 * @param {Date} nextDate 대상 월 데이터
 */
export function getCalendarCells(nextDate: Date = new Date()): Array<Array<Plan>> {
  const startDay = startOfMonth(nextDate)
  const startWeek = startOfWeek(startDay)
  const weeks = getWeeksInMonth(startDay)

  return Array.from({ length: weeks }).map((_, gidx) => {
    return Array.from({ length: 7 }).map((_, idx) => {
      const timestamp = addDays(startWeek, ((gidx * 7) + idx))
      return {
        seq: timestamp.getTime().toString(),
        timestamp,
      }
    })
  })
}

export function arrangeEvents(Events: Event[]) {
  return Events.reduce<{ [key: string]: Event[] }>((prev, event) => {
    const weekIndex = getISOWeek(event.startTime)
    return (
      {
        ...prev,
        [weekIndex.toString()]: [
          ...get(prev, `${weekIndex}`, []),
          event,
        ]
      }
    )
  }, {})
}