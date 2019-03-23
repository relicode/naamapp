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
import { DynamicContent } from './dynamic-content/types'

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
  dynamicContent: DynamicContent,
}

export const action = (a: AnyAction) => store.dispatch({ ...a })

const DYNAMIC_CONTENT = 'dynamicContent'

export const loadDynamicContent = async (): Promise<DynamicContent> => {
  const savedDynamicContent = await AsyncStorage.getItem(DYNAMIC_CONTENT)
  return savedDynamicContent ? JSON.parse(savedDynamicContent) : initialState
}

export const saveDynamicContent = async (newDynamicContent: DynamicContent): Promise<DynamicContent> => {
  await AsyncStorage.setItem(DYNAMIC_CONTENT, JSON.stringify(newDynamicContent))
  return newDynamicContent
}

export default store
