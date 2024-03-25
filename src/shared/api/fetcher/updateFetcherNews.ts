import { axiosInstance } from '@shared/api/axiosInstance'
import { getBearerToken } from '@shared/lib/getBearerToken'

export async function updateFetcherNews([url, id]: any, { arg: data }: { arg: any }) {
  try {
    const formData = new FormData()
    for (let key in data) {
      if (data[key] !== null && data[key] !== undefined) {
        if (Array.isArray(data[key])) {
          data[key].forEach((value: string) => formData.append(`${key}[]`, value))
        } else {
          formData.append(key, data[key])
        }
      }
    }
    const response = await axiosInstance.put(`${url}/${id}`, formData, {
      headers: {
        Authorization: getBearerToken(),
        'Content-Type': 'multipart/form-data'
      }
    })
    return response.data
  } catch (e) {
    throw e
  }
}
