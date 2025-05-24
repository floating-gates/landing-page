import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router'


// import.meta.env.VITE_APP_TITLE
// import.meta.env.VITE_URL

// const VITE_APP_TITLE = "Poloo" //import.meta.env.VITE_APP_TITLE;
// const VITE_URL = "localhost" //  import.meta.env.VITE_URL;


createApp(App)
  .use(router)
  .mount('#app')
