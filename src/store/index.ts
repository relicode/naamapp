import { AnyAction, applyMiddleware, combineReducers, createStore } from 'redux'
import createSagaMiddleware from 'redux-saga'
import { all, put, takeLatest } from 'redux-saga/effects'
import { composeWithDevTools } from 'remote-redux-devtools'

import todos from './todos/reducers'
import { ADD_TODO, AddTodosAction, WATCH_ADD_TODO } from './todos/types'

const rootReducer = combineReducers({ todos })
const sagaMiddleware = createSagaMiddleware()

const store = createStore(rootReducer, /* preloadedState, */ composeWithDevTools(
  applyMiddleware(sagaMiddleware),
  // other store enhancers if any
))

function* addTodo(a: AddTodosAction) {
  yield put({
    type: ADD_TODO,
    text: a.text,
  } as AddTodosAction)
}

function* watchAddTodo() {
  yield takeLatest(WATCH_ADD_TODO, addTodo)
}

function* rootSaga() {
  yield all([
    watchAddTodo(),
  ])
}

sagaMiddleware.run(rootSaga)

export default store
export const action = (a: AnyAction) => store.dispatch({ ...a })
