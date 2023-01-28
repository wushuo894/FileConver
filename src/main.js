import {createApp} from 'vue'
import './style.css'
import Main from './Main.vue'
import naive from 'naive-ui'

createApp(Main).use(naive).mount('#app')
