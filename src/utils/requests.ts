import Config from 'react-native-config'

const { API_BASE_URL } = Config

class ApiError extends Error {
  constructor(readonly message: string, readonly statusCode: number, readonly path: string) {
    super(message)
    this.statusCode = statusCode
    this.path = path
  }
}

interface QueryStringParams {
  [id: string]: string,
}

const generateQueryString = (queryParams: QueryStringParams) => (
  '?' + Object.entries(queryParams).map((e) => (
    `${encodeURIComponent(e[0])}=${encodeURIComponent(e[1])}`
  )).join('&')
)

const defaultOptions = {
  method: 'GET',
  headers: {
    'Content-Type': 'application/json;charset=UTF-8',
    'Accept-Language': 'fi',
  },
  referrer: 'no-referrer',
}

const request = <T>(path: string, options = {}): Promise<T> => (
  fetch(`${API_BASE_URL}${path}`, {
    ...defaultOptions,
    ...options,
  })
    .then((response) => {
      if (!response.ok) {
        const { status, url } = response
        throw new ApiError(response.statusText, status, url)
      }
      return response.json()
    })
    .catch((e) => {
      if (e instanceof SyntaxError) {
        return new Promise((resolve) => resolve({}))
      }
      throw e
    })
)

export const get = (path: string, queryParams: QueryStringParams = {}, options = {}) => (
  request(
    `${path}${Object.keys(queryParams).length ? generateQueryString(queryParams) : ''}`,
    options,
  )
)

export const post = (path: string, body = {}, options = {}) => (
  request(path, {
    ...{
      body: JSON.stringify(body),
      method: 'POST',
    },
    ...options,
  })
)

export const put = (path: string, body = {}, options = {}) => (
  request(path, {
    ...{
      body: JSON.stringify(body),
      method: 'PUT',
    },
    ...options,
  })
)
