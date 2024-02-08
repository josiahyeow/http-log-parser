import { HttpRequest } from './http-request'

export function countHttpRequestsByField(
  httpRequests: HttpRequest[],
  field: string
) {
  return httpRequests.reduce((acc, httpRequest) => {
    if (!httpRequest[field]) {
      throw new Error(`Field ${field} not found in http request`)
    }

    acc[httpRequest[field]] = (acc[httpRequest[field]] || 0) + 1

    return acc
  }, {} as Record<string, number>)
}
