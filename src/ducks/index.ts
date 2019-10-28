import { combineReducers } from 'redux'

import dateInfoReducer from './dateInfo'
import displayReducer from './display'
import plansReducer from './plans'
import eventFormReducer from './eventForm'

export default combineReducers({
  dateInfo: dateInfoReducer,
  display: displayReducer,
  eventForm: eventFormReducer,
  plans: plansReducer,
})
