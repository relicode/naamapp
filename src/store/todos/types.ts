import { AnyAction } from 'redux'

export type TodosState = string[]

export interface AddTodosAction extends AnyAction {
  text: string,
}

const storePrefix: string = 'todos'
export const WATCH_ADD_TODO: string = `${storePrefix}/WATCH_ADD_TODO`
export const ADD_TODO: string = `${storePrefix}/ADD_TODO`
