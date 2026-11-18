import { init } from './assets/motion/motion.js'
import { mountAll, unmountAll } from './assets/moments/moments.js'

// Public modules load through this HTML script tag, outside Vite's source imports.
const mount = () => {
  const root = document.querySelector('.interface')
  if (!root) return
  init()
  mountAll(root).then((elements) => {
    document.documentElement.dataset.momentsReady = String(elements.length)
  })
}

window.addEventListener('portfolio:mount', mount)
window.addEventListener('portfolio:unmount', () => unmountAll(document))
mount()
