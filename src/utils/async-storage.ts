import AsyncStorage from '@react-native-community/async-storage'

import { initialState } from '../store/dynamic-content/reducers'
import { TrimmedDynamicContent } from '../store/dynamic-content/types'

const DYNAMIC_CONTENT = 'dynamicContent'

export const loadDynamicContent = async (): Promise<TrimmedDynamicContent> => {
  const localStoragecontent = await AsyncStorage.getItem(DYNAMIC_CONTENT)
  return localStoragecontent ? JSON.parse(localStoragecontent) : initialState
}

export const saveDynamicContent = async (newDynamicContent: TrimmedDynamicContent): Promise<TrimmedDynamicContent> => {
  await AsyncStorage.setItem(DYNAMIC_CONTENT, JSON.stringify(newDynamicContent))
  return newDynamicContent
}
