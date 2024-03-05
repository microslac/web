const FORCE_SSL = process.env.FORCE_SSL === '1'
const PROTOCOL = FORCE_SSL ? 'https://' : 'http://'
const API_HOST = process.env.API_HOST
const API_PORT = process.env.API_PORT
const API_ROOT = process.env.API_ROOT || 'api'

let API_URL = process.env.API_URL
if (!API_URL) {
  if (API_PORT) API_URL = `${PROTOCOL}${API_HOST}:${API_PORT}/${API_ROOT}`
  else API_URL = `${PROTOCOL}${API_HOST}/${API_ROOT}`
}

const STORAGE_URL = process.env.STORAGE_URL || ''
const STORAGE_HOST = STORAGE_URL.split('://').pop()

module.exports = {
  API_URL: API_URL,
  STORAGE_URL: STORAGE_URL,
  STORAGE_HOST: STORAGE_HOST,
}
