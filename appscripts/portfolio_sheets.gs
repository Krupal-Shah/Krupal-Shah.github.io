/**
 * Portfolio Google Apps Script — handles both the Projects sheet and the
 * Images sheet from a single deployed web app endpoint.
 *
 * SETUP
 * ─────
 * 1. Open the Google Spreadsheet that holds your portfolio data.
 * 2. Extensions → Apps Script → paste this file as Code.gs.
 * 3. Deploy → New deployment → Web app
 *      Execute as: Me
 *      Who has access: Anyone
 * 4. Copy the deployed URL and add it to your .env:
 *      VITE_SHEETS_URL=https://script.google.com/macros/s/YOUR_ID/exec
 *
 * SHEET STRUCTURE
 * ───────────────
 * Sheet "Projects" — required columns (row 1 = headers, exact spelling):
 *   project_id | title | subtitle | abstract | main_content
 *   tech_stack | github_url | live_url | created_at | order
 *
 *   • main_content  – Markdown text; use [image_id] anywhere to embed a
 *                     media item defined in the Images sheet.
 *   • order         – Integer; lower numbers appear first.
 *
 * Sheet "Images" — required columns:
 *   image_id | type | drive_file_id | alt_text
 *
 *   • type          – "image" or "video"
 *   • drive_file_id – The ID part of the Google Drive share URL
 *                     (from https://drive.google.com/file/d/<ID>/view)
 *
 * USAGE
 * ─────
 *   ?type=projects  → returns { success: true, data: [ ...project rows ] }
 *   ?type=images    → returns { success: true, data: { image_id: {...}, ... } }
 *   (no type param) → returns both under data.projects and data.images
 */

// ── Entry point ──────────────────────────────────────────────────────────────

function doGet(e) {
  const type = (e && e.parameter && e.parameter.type) || 'all'

  try {
    const ss = SpreadsheetApp.getActiveSpreadsheet()

    let data
    if (type === 'projects') {
      data = getProjects(ss)
    } else if (type === 'images') {
      data = getImages(ss)
    } else {
      data = { projects: getProjects(ss), images: getImages(ss) }
    }

    return jsonResponse({ success: true, data: data })
  } catch (err) {
    return jsonResponse({ success: false, error: err.message })
  }
}

// ── Projects ─────────────────────────────────────────────────────────────────

function getProjects(ss) {
  const sheet = ss.getSheetByName('Projects')
  if (!sheet) throw new Error('Sheet "Projects" not found')

  const values = sheet.getDataRange().getValues()
  if (values.length < 2) return []

  const headers = normaliseHeaders(values[0])

  return values
    .slice(1)
    .filter(function (row) { return row[0] !== '' && row[0] !== null })
    .map(function (row) { return rowToObject(headers, row) })
    .sort(function (a, b) {
      var oa = parseInt(a.order, 10) || 9999
      var ob = parseInt(b.order, 10) || 9999
      if (oa !== ob) return oa - ob
      return new Date(b.created_at || 0) - new Date(a.created_at || 0)
    })
}

// ── Images ───────────────────────────────────────────────────────────────────

function getImages(ss) {
  var sheet = ss.getSheetByName('Images')
  if (!sheet) throw new Error('Sheet "Images" not found')

  var values = sheet.getDataRange().getValues()
  if (values.length < 2) return {}

  var headers = normaliseHeaders(values[0])
  var map = {}

  values.slice(1)
    .filter(function (row) { return row[0] !== '' && row[0] !== null })
    .forEach(function (row) {
      var obj = rowToObject(headers, row)
      if (obj.image_id) map[obj.image_id] = obj
    })

  return map
}

// ── Helpers ──────────────────────────────────────────────────────────────────

function normaliseHeaders(headerRow) {
  return headerRow.map(function (h) {
    return String(h).trim().toLowerCase().replace(/\s+/g, '_')
  })
}

function rowToObject(headers, row) {
  var obj = {}
  headers.forEach(function (header, i) {
    obj[header] = (row[i] !== undefined && row[i] !== null) ? String(row[i]) : ''
  })
  return obj
}

function jsonResponse(payload) {
  return ContentService
    .createTextOutput(JSON.stringify(payload))
    .setMimeType(ContentService.MimeType.JSON)
}
