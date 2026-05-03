// Set VITE_SHEETS_URL in your .env file to the deployed Apps Script web app URL
export const SHEETS_CONFIG = {
  DEPLOYED_URL: import.meta.env.VITE_SHEETS_URL || '',
}
