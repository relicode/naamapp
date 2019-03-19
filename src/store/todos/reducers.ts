import { Reducer } from 'redux'

import { ADD_TODO, AddTodosAction, TodosState } from './types'

export const initialState: TodosState = ['yy', 'kaa', 'koo']

const todosReducer: Reducer<TodosState, AddTodosAction> =
  (state: TodosState = initialState, action: AddTodosAction): TodosState => {
    switch (action.type) {
      case ADD_TODO:
        return state.concat(action.text)
      default:
        return state
    }
  }

export default todosReducer
