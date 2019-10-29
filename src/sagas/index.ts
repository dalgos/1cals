import { fork, put, take } from 'redux-saga/effects'

import { fetchEventsActionMap, FETCH_EVENTS_ACTIONS } from 'ducks/events'
import { fetchEvents } from 'api'

function *fetchEventsFlow() {
  while (true) {
    try {
      const { payload: {
        currentDate,
        by,
      } } = yield take(FETCH_EVENTS_ACTIONS.REQUEST)
      const payload = yield fetchEvents(currentDate, by)
      yield put(fetchEventsActionMap.success(payload))
    } catch (error) {
      yield put(fetchEventsActionMap.failure())
    }
  }
}

export default function* rootSaga() {
  yield fork(fetchEventsFlow)
}
