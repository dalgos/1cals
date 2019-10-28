import { applyMiddleware, createStore } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import createSagaMiddleware from 'redux-saga'

import reducer from './ducks'
import sagas from './sagas'

export default function initStore() {
  const sagaMiddleware = createSagaMiddleware()
  const store = createStore(reducer, composeWithDevTools(
    applyMiddleware(
      sagaMiddleware,
    )
  ))
  sagaMiddleware.run(sagas)
  return store
}
