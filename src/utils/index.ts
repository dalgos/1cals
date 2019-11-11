import {
  addDays,
  addHours,
  eachDayOfInterval,
  getDay,
  getWeeksInMonth,
  startOfDay,
  startOfMonth,
  startOfWeek,
  getISOWeek,
  getISODay,
  getMonth,
  getDate,
  set,
} from 'date-fns'
import { update } from 'lodash'

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

/**
 * 일정 목록을 날짜 기준으로 정렬하여 반환합니다.
 * @param {Event[]} Events 일정목록
 */
export function arrangeEventsByDay(Events: Event[]) {
  return Events.reduce<{ [key: string]: Event[] }>((prev, event) => {
    const dayIndex = getISODay(event.startTime)
    return update(
      prev,
      `${dayIndex}`,
      (events: Event[] = []) => {
        return [
          ...events,
          event
        ]
      }
    )
  }, {})
}

/**
 * 일정 목록을 주차 기준으로 정렬하여 반환합니다.
 * @param {Event[]} Events 일정목록
 */
export function arrangeEvents(Events: Event[]) {
  return Events.reduce<{ [key: number]: { [key: number]: Event[] } }>((prev, event) => {
    const weekIndex = getISOWeek(event.startTime)
    const dayIndex = getISODay(event.startTime)
    return update(
      prev,
      `${weekIndex}.${dayIndex}`,
      (events: Event[] = []) => {
        return [
          ...events,
          event,
        ]
      }
    )
  }, {})
}

/**
 * 이벤트 날짜 변경시 새로운 월, 일로 업데이트된 새로운 시작, 종료 데이트 값을 반환합니다.
 * (시간은 변경되지 않습니다.)
 * @param {number} startTime 
 * @param {number} endTime 
 * @param {Date} targetDate
 * @returns {object} { nextStartTime: 업데이트 된 시작 타임, nextEndTime: 업데이트 된 종료 타임 }
 */
export function calcNextEventDate(startTime: number, endTime: number, targetDate: Date) {
  const setOption = {
    month: getMonth(targetDate),
    date: getDate(targetDate)
  }
  return {
    nextStartTime: set(startTime, setOption).getTime(),
    nextEndTime: set(endTime, setOption).getTime()
  }
}