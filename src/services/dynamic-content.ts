import { DynamicContent } from '../store/dynamic-content/types'
import { get } from '../utils/requests'

export const fetchRemoteUpdateTime = async (): Promise<string> => {
  const response: { time: string } = await get('/cache') as any
  return response.time
}

export const fetchDynamicContent = (): Promise<DynamicContent> => (
  get('/dynamic-content') as Promise<DynamicContent>
)
