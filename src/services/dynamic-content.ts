import { get } from '../utils/requests'
import { DynamicContent, DynamicContentTypes } from '../utils/types/dynamic-content'

export const fetchLastSynced = async (): Promise<string> => {
  const response: { time: string } = await get('/cache') as any
  return response.time
}

export const fetchDynamicContent = (contentType: DynamicContentTypes[] = []): Promise<DynamicContent> => (
  get(`/dynamic-content/${contentType.join(',')}`) as Promise<DynamicContent>
)
