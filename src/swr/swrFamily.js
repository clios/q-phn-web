import axios from 'axios'
import { navigate } from '@reach/router'
import { toast } from 'react-toastify'
import useSWR from 'swr'

const fetcher = (url) =>
  axios
    .get(url, { headers: { Authorization: `Bearer ${localStorage.getItem('q-phn-token')}` } })
    .then((res) => res.data)
    .catch((error) => {
      throw error
    })

export default function swrFamily(family_id, options) {
  const url = process.env.BASE_URL + `/families/${family_id}`

  const { data, error, mutate } = useSWR(url, fetcher, {
    onError: (error) => {
      if (error.response?.status === 404) navigate('/account', { replace: true })
    },
    onErrorRetry: (error) => {
      if (error.status === 404) return
      if (error.status === 403) return
      if (error.status === 402) return
      if (error.status === 401) return
    },
    loadingTimeout: 3000,
    onLoadingSlow: () => {
      // toast.warning('Internet speed is slow')
    },
    ...options
  })

  return {
    data: data,
    loading: !error && !data,
    error: error,
    mutate: mutate
  }
}