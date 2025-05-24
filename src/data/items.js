export { themeColor, themeColorOrange,
         themeColorWhite, themeColorLille,
         themeColorGold, contactInfo,
         register_user_api_endpoint, login_user_api_endpoint,
         auth_api_endpoint, logout_api_endpoint, siteName,
         JWT_TOKEN_NAME }

const themeColor       = '#223843'
const themeColorOrange = '#D77A61'
const themeColorWhite  = '#EFF1F3'
const themeColorLille  = '#D8D3D8'
const themeColorGold   = '#D8B4A0'

// const siteName = 'Floating Gates'
// const api_endpoint = 'https://floating-gates.com/api'

const VITE_APP_TITLE = import.meta.env.VITE_APP_TITLE
const VITE_URL =  import.meta.env.VITE_URL

const JWT_TOKEN_NAME = "jwt"

const siteName =  VITE_APP_TITLE
const api_endpoint = VITE_URL

const register_user_api_endpoint = api_endpoint + '/api/user/register'
const login_user_api_endpoint    = api_endpoint + '/api/user/login'
const auth_api_endpoint          = api_endpoint + '/api/user/me'
const logout_api_endpoint        = api_endpoint + '/api/user/logout'


const contactInfo = {
    address: 'Via Capitello Rasa 28, Lendinara (RO), 45026, Italy',
    phone: '+39 3493822812',
    email: 'contact@floating-gates.com',
    website: 'https://floating-gates.com',
    vat: '01675720294',
}
