import { useState, useEffect } from 'react'
import { fetchImages } from '../services/googleSheets'

export function useImages() {
  const [images, setImages] = useState({})
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchImages()
      .then(setImages)
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [])

  return { images, loading }
}
