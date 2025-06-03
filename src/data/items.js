export { themeColor, themeColorOrange,
         themeColorWhite, themeColorLille,
         themeColorGold, contactInfo, price_list, base_url,
         register_user_api_endpoint, login_user_api_endpoint,
         auth_api_endpoint, logout_api_endpoint,
         get_subscription_endpoint, create_subscription_endpoint,
         get_project_endpoint, create_project_endpoint,
         username_api_endpoint, JWT_TOKEN_NAME }

const themeColor       = '#223843'
const themeColorOrange = '#D77A61'
const themeColorWhite  = '#EFF1F3'
const themeColorLille  = '#D8D3D8'
const themeColorGold   = '#D8B4A0'

const base_url =  import.meta.env.VITE_URL

const JWT_TOKEN_NAME = "jwt"

const auth_api_endpoint          = base_url + '/api/user/me'

const register_user_api_endpoint = base_url + '/api/user/register'
const login_user_api_endpoint    = base_url + '/api/user/login'
const logout_api_endpoint        = base_url + '/api/user/logout'
const username_api_endpoint      = base_url + '/api/user/name'

const get_subscription_endpoint    = base_url + '/api/subscription'
const create_subscription_endpoint = base_url + '/api/subscription/create'

const get_project_endpoint    = base_url + '/api/project'
const create_project_endpoint = base_url + '/api/project/create'


const price_list = {
    'free': 0.00,
    'basic': 49.00,
    'standard': 149.00,
    'enterprise': 399.00,
}

const contactInfo = {
    address: 'Via Capitello Rasa 28, Lendinara (RO), 45026, Italy',
    phone: '+39 3493822812',
    email: 'contact@floating-gates.com',
    website: 'https://floating-gates.com',
    vat: '01675720294',
}
