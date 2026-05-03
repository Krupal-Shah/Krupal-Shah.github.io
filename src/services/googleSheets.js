import { SHEETS_CONFIG } from '../config/sheets'

async function fetchFromSheets(type) {
  const { DEPLOYED_URL } = SHEETS_CONFIG
  if (!DEPLOYED_URL) throw new Error('VITE_SHEETS_URL is not configured')

  const res = await fetch(`${DEPLOYED_URL}?type=${type}`)
  if (!res.ok) throw new Error(`HTTP ${res.status}`)

  const json = await res.json()
  if (!json.success) throw new Error(json.error || 'Sheets request failed')

  return json.data
}

export async function fetchProjects() {
  return fetchFromSheets('projects')
}

export async function fetchImages() {
  return fetchFromSheets('images')
}
