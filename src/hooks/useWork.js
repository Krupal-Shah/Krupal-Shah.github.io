import { useState, useEffect } from 'react'
import { fetchWork } from '../services/googleSheets'

export function useWork() {
  const [work, setWork] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetchWork()
      .then(setWork)
      .catch(e => setError(e.message))
      .finally(() => setLoading(false))
  }, [])

  return { work, loading, error }
}
