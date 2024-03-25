import { axiosInstance } from '@shared/api/axiosInstance'
import { getBearerToken } from '@shared/lib/getBearerToken'
import { useLanguageStore } from '@shared/model/store'

export async function getFetcher(url: string) {
  let lang = url.slice(url.indexOf('lang=')+5, url.indexOf('lang=')+7)

  try {
    const response = await axiosInstance.get(url, {
      headers: {
        Authorization: getBearerToken(),
        'Accept-Language': lang
      }
    })
    return response.data
  } catch (e) {
    throw e
  }
}
