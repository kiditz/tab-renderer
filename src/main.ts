import { createApp } from 'vue'
import { createPinia } from 'pinia'
import vuetify from './plugins/vuetify'
import App from './App.vue'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'


const app = createApp(App)

app.use(createPinia().use(piniaPluginPersistedstate))
app.use(vuetify)
app.mount('#app')
