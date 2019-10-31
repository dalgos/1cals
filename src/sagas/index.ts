import { fork, put, select, take } from 'redux-saga/effects'

import { dateInfoSelector, navigatorStateSelector } from 'selectors'
import { fetchEventsActionMap, FETCH_EVENTS_ACTIONS } from 'ducks/events'
import { ActionTypes, takeCloseEventForm } from 'ducks/eventForm'
import { fetchMonthlyEvents, fetchWeeklyEvents, postEvent, patchEvent, deleteEvent } from 'api'

function *fetchEventsFlow() {
  while (true) {
    try {
      yield take(FETCH_EVENTS_ACTIONS.REQUEST)
      const { currentDate, mode } = yield select(navigatorStateSelector)

      // const { currentDate } = yield select(dateInfoSelector)
      const payload = yield mode === 'monthly' ? fetchMonthlyEvents(currentDate) : fetchWeeklyEvents(currentDate)

      yield put(fetchEventsActionMap.success(payload))
    } catch (error) {
      yield put(fetchEventsActionMap.failure())
    }
  }
}

function *submitEventFlow() {
  while (true) {
    try {
      const { payload: { id, ...data } } = yield take(ActionTypes.SUBMIT_EVENT_FORM_REQUEST)
      yield id > -1 ? patchEvent(id, data) : postEvent(data) 
      yield put(takeCloseEventForm())
      yield put({ type: FETCH_EVENTS_ACTIONS.REQUEST })
    } catch (error) {
      throw Error('오류가 발생하였습니다.')
    }
  }
}

function *deleteEventFlow() {
  while (true) {
    try {
      const { payload: id } = yield take(ActionTypes.DELETE_EVENT_REQUEST)
      yield deleteEvent(id)
      yield put(takeCloseEventForm())
      yield put({ type: FETCH_EVENTS_ACTIONS.REQUEST })
    } catch (error) {
      throw Error('오류가 발생하였습니다.')
    }
  }
}

export default function* rootSaga() {
  yield fork(fetchEventsFlow)
  yield fork(submitEventFlow)
  yield fork(deleteEventFlow)
}
