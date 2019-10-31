import axios from 'axios'
import { startOfMonth, endOfMonth, getTime, startOfWeek, endOfWeek } from 'date-fns'
import { compose } from 'ramda'

interface EventsResponse {
  sid: number;
  startTime: number;
  duration: number;
  title: string;
}

const getMinimumTimeByWeekly = compose(getTime, startOfWeek)
const getMaximizeTimeByWeekly = compose(getTime, endOfWeek)
/**
 * 월간 일정 조회 기간 중 첫번째 시간
 */
const getMinimumTimeByMonthly = compose(getTime, startOfWeek, startOfMonth)
/**
 * 월간 일정 조회 기간 중 가장 마지막 시간
 */
const getMaximizeTimeByMonthly = compose(getTime, endOfWeek, endOfMonth)

/**
 * 일정 목록을 조회한다.
 */
export const fetchEvents = async (minTime: number, maxTime: number): Promise<EventsResponse> => {
  const { data } = await axios({
    method: 'GET',
    url: `/api/events?startTime_gte=${minTime}&startTime_lte=${maxTime}`
  })

  return data
}

export const fetchWeeklyEvents = async (currentDate: Date): Promise<EventsResponse> => {
  const minimumTime = getMinimumTimeByWeekly(currentDate, undefined)
  const maximumTime = getMaximizeTimeByWeekly(currentDate, undefined)
  return await fetchEvents(minimumTime, maximumTime)
}

export const fetchMonthlyEvents = async (currentDate: Date): Promise<EventsResponse> => {
  const minimumTime = getMinimumTimeByMonthly(currentDate)
  const maximumTime = getMaximizeTimeByMonthly(currentDate)
  return await fetchEvents(minimumTime, maximumTime)
}


