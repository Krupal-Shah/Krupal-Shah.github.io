import { SHEETS_CONFIG } from '../config/sheets'

const cache = new Map()

function fetchFromSheets(type) {
  if (cache.has(type)) return cache.get(type)

  const promise = (async () => {
    const { DEPLOYED_URL } = SHEETS_CONFIG
    if (!DEPLOYED_URL) throw new Error('VITE_SHEETS_URL is not configured')

    const res = await fetch(`${DEPLOYED_URL}?type=${type}`)
    if (!res.ok) throw new Error(`HTTP ${res.status}`)

    const json = await res.json()
    if (!json.success) throw new Error(json.error || 'Sheets request failed')

    return json.data
  })()

  promise.catch(() => cache.delete(type))
  cache.set(type, promise)
  return promise
}

export async function fetchProjects() {
  return fetchFromSheets('projects')
}

export async function fetchImages() {
  return fetchFromSheets('images')
}

export async function fetchWork() {
  return fetchFromSheets('work')
}

export function preloadSheetsData() {
  fetchProjects().catch(() => {})
  fetchWork().catch(() => {})
  fetchImages().catch(() => {})
}
