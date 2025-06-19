import type { PluginOptions } from 'vue-toastification'
import { POSITION } from 'vue-toastification'
import 'vue-toastification/dist/index.css'

const options: PluginOptions = {
  position: POSITION.TOP_RIGHT,
  timeout: 3000,
  closeOnClick: true,
}

export { options }
export { default as Toast } from 'vue-toastification'
