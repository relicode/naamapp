import AsyncStorage from '@react-native-community/async-storage'

import { initialState } from '../store/dynamic-content/reducers'
import { DynamicContent, DynamicContentResponse } from '../utils/types/dynamic-content'

const DYNAMIC_CONTENT = 'dynamicContent'

export const loadDynamicContent = async (): Promise<DynamicContent> => {
  const localStorageDynamicContent = await AsyncStorage.getItem(DYNAMIC_CONTENT)
  return localStorageDynamicContent ? JSON.parse(localStorageDynamicContent) : initialState
}

export const saveDynamicContent = async (dynamicContent: DynamicContentResponse): Promise<DynamicContent> => {
  const loadedContent = await AsyncStorage.getItem(DYNAMIC_CONTENT)
  const localStorageDynamicContent = loadedContent ? JSON.parse(loadedContent) : {}
  const updatedContent = { ...localStorageDynamicContent, ...dynamicContent }
  await AsyncStorage.setItem(DYNAMIC_CONTENT, JSON.stringify(updatedContent))
  return updatedContent
}
