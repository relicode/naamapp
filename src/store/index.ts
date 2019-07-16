import { AnyAction, applyMiddleware, combineReducers, createStore } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension/logOnlyInProduction'
import createSagaMiddleware from 'redux-saga'
import { all } from 'redux-saga/effects'

import { DynamicContent } from '../utils/types/dynamic-content'
import appState from './app-state/reducers'
import { watchAppStateChange } from './app-state/sagas'
import { AppState } from './app-state/types'
import dynamicContent from './dynamic-content/reducers'
import { watchSync } from './dynamic-content/sagas'
import pushNotifications from './push-notifications/reducers'
import { watchNotifications } from './push-notifications/sagas'
import { PushNotificationsState } from './push-notifications/types'

export interface ReduxStoreState {
  appState: AppState,
  dynamicContent: DynamicContent,
  pushNotifications: PushNotificationsState,
}

const rootReducer = combineReducers({
  appState,
  dynamicContent,
  pushNotifications,
})

const sagaMiddleware = createSagaMiddleware()

const store = createStore(
  rootReducer,
  composeWithDevTools(
    applyMiddleware(sagaMiddleware),
    // other store enhancers if any
  ),
)

function* rootSaga() {
  yield all([
    watchAppStateChange(),
    watchSync(),
    watchNotifications(),
  ])
}

sagaMiddleware.run(rootSaga)

export const action = (a: AnyAction) => store.dispatch({ ...a })

export default store
