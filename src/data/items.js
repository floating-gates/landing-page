const themeColor = '#223843'
const themeColorOrange = '#D77A61'
const themeColorWhite= '#EFF1F3'
const themeColorLille ='#D8D3D8'
const themeColorGold = '#D8B4A0'

export { themeColor, themeColorOrange,
         themeColorWhite, themeColorLille,
         themeColorGold, siteName, contactInfo,
         register_user_api_endpoint, login_user_api_endpoint}


// This way you can access element in CSS
document.documentElement.style.setProperty('--theme-color', themeColor);
document.documentElement.style.setProperty('--theme-color-orange', themeColorOrange);

const siteName = 'Floating Gates'
const url = 'http://localhost:8000'

const register_user_api_endpoint = url + '/user/register'
const login_user_api_endpoint    = url + '/user/login'


const contactInfo = {
    address: 'Via Capitello Rasa 28',
    phone: '+39 3493822812',
    email: 'contact@floating-gates.com',
    website: 'https://floating-gates.com/'
}

