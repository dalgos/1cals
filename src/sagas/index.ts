import { fork, put, select, take } from 'redux-saga/effects'

import { dateInfoSelector } from 'selectors'
import { fetchEventsActionMap, FETCH_EVENTS_ACTIONS } from 'ducks/events'
import { fetchMonthlyEvents, fetchWeeklyEvents } from 'api'

function *fetchEventsFlow() {
  while (true) {
    try {
      const { payload: {
        by,
      } } = yield take(FETCH_EVENTS_ACTIONS.REQUEST)

      const { currentDate } = yield select(dateInfoSelector)
      const payload = yield by === 'month' ? fetchMonthlyEvents(currentDate) : fetchWeeklyEvents(currentDate)

      yield put(fetchEventsActionMap.success(payload))
    } catch (error) {
      yield put(fetchEventsActionMap.failure())
    }
  }
}

export default function* rootSaga() {
  yield fork(fetchEventsFlow)
}
