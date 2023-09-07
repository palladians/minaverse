import { appUrl } from '@/lib/url'

export const fetcher = async <T>(url: string) => {
  const request = await fetch(appUrl(url))
  const body = (await request.json()) as T
  return body
}
