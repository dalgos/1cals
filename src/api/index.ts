import axios from 'axios'
import { startOfMonth, endOfMonth, getTime, startOfWeek, endOfWeek } from 'date-fns'

interface EventsResponse {
  sid: number;
  startTime: number;
  duration: number;
  title: string;
}

/**
 * 일정 목록을 조회한다.
 */
export const fetchEvents = async (currentDate: Date, by: 'month' | 'week' = 'month'): Promise<EventsResponse> => {
  const minimumTime = getTime(startOfWeek(startOfMonth(currentDate)))
  const maximumTime = getTime(endOfWeek(endOfMonth(currentDate)))
  console.log(startOfWeek(startOfMonth(currentDate)), endOfWeek(endOfMonth(currentDate)))
  const { data } = await axios({
    method: 'GET',
    url: `/api/events?startTime_gte=${minimumTime}&startTime_lte=${maximumTime}`
  })
  return data
}
