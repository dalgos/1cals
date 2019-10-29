import { combineReducers } from 'redux'

import dateInfoReducer from './dateInfo'
import displayReducer from './display'
import eventsReducer from './events'
import eventFormReducer from './eventForm'

export default combineReducers({
  dateInfo: dateInfoReducer,
  display: displayReducer,
  eventForm: eventFormReducer,
  events: eventsReducer,
})
