import AsyncStorage from '@react-native-community/async-storage'
import { AnyAction, applyMiddleware, combineReducers, createStore } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import createSagaMiddleware from 'redux-saga'
import { all } from 'redux-saga/effects'

import appState from './app-state/reducers'
import { watchAppStateChange } from './app-state/sagas'
import { AppState } from './app-state/types'
import dynamicContent, { initialState } from './dynamic-content/reducers'
import { watchSync } from './dynamic-content/sagas'
import { TrimmedDynamicContent } from './dynamic-content/types'

const rootReducer = combineReducers({
  appState,
  dynamicContent,
})
const sagaMiddleware = createSagaMiddleware()

const store = createStore(rootReducer, composeWithDevTools(
  applyMiddleware(sagaMiddleware),
  // other store enhancers if any
))

function* rootSaga() {
  yield all([
    watchAppStateChange(),
    watchSync(),
  ])
}

sagaMiddleware.run(rootSaga)

export interface ReduxStoreState {
  appState: AppState,
  dynamicContent: TrimmedDynamicContent,
}

export const action = (a: AnyAction) => store.dispatch({ ...a })

export default store
