import { AnyAction, applyMiddleware, combineReducers, createStore } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import createSagaMiddleware from 'redux-saga'
import { all } from 'redux-saga/effects'

import dynamicContent from './dynamic-content/reducers'
import { watchSync } from './dynamic-content/sagas'
import { DynamicContent } from './dynamic-content/types'

const rootReducer = combineReducers({ dynamicContent })
const sagaMiddleware = createSagaMiddleware()

const store = createStore(rootReducer, composeWithDevTools(
  applyMiddleware(sagaMiddleware),
  // other store enhancers if any
))

function* rootSaga() {
  yield all([
    watchSync(),
  ])
}

sagaMiddleware.run(rootSaga)

export interface ApplicationState {
  dynamicContent: DynamicContent,
}

export const action = (a: AnyAction) => store.dispatch({ ...a })

export default store
