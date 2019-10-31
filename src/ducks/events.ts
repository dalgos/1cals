import { AnyAction, ActionCreator, ActionCreatorsMapObject } from 'redux'

export enum FETCH_EVENTS_ACTIONS {
  REQUEST = 'FETCH_EVENTS_REQUEST',
  SUCCESS = 'FETCH_EVENTS_SUCCESS',
  FAILURE = 'FETCH_EVENTS_FAILURE',
}

export const fetchEventsActionMap = {
  request: (by: 'month' | 'week'): AnyAction => ({
    payload: {
      by,
    },
    type: FETCH_EVENTS_ACTIONS.REQUEST,
  }),
  success: (payload: any[]) => ({
    payload,
    type: FETCH_EVENTS_ACTIONS.SUCCESS,
  }),
  failure: () => ({
    type: FETCH_EVENTS_ACTIONS.FAILURE,
  }),
}

export default function eventsReducer(state: CalState['events'] = [], action: AnyAction) {
  switch (action.type) {
    case FETCH_EVENTS_ACTIONS.SUCCESS:
      return [
        ...action.payload,
      ]
  }
  return state
}