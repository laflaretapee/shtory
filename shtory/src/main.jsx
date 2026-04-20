import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { brandLogoDataUri } from './branding/logoData'
import './styles/global.css'
import './styles/branding.css'

document.documentElement.style.setProperty('--brand-logo-image', `url("${brandLogoDataUri}")`)

const favicon = document.querySelector('link[rel="icon"]') ?? document.createElement('link')
favicon.setAttribute('rel', 'icon')
favicon.setAttribute('type', 'image/png')
favicon.setAttribute('href', brandLogoDataUri)

if (!favicon.parentNode) {
  document.head.appendChild(favicon)
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
