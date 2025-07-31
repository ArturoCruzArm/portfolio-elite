import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

// PWA Service Worker Registration
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/portfolio-elite/sw.js')
      .then((registration) => {
        console.log('✅ PWA: Service Worker registered successfully:', registration.scope)
        
        // Check for updates
        registration.addEventListener('updatefound', () => {
          const newWorker = registration.installing
          if (newWorker) {
            newWorker.addEventListener('statechange', () => {
              if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                // New content available, notify user
                if (confirm('Nueva versión disponible. ¿Recargar para actualizar?')) {
                  newWorker.postMessage({ type: 'SKIP_WAITING' })
                  window.location.reload()
                }
              }
            })
          }
        })
      })
      .catch((error) => {
        console.log('❌ PWA: Service Worker registration failed:', error)
      })
  })
}

// PWA Install Prompt
interface BeforeInstallPromptEvent extends Event {
  prompt(): Promise<void>
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>
}

let deferredPrompt: BeforeInstallPromptEvent | null = null
window.addEventListener('beforeinstallprompt', (e) => {
  e.preventDefault()
  deferredPrompt = e as BeforeInstallPromptEvent
  
  // Show install button or banner
  const installBanner = document.createElement('div')
  installBanner.innerHTML = `
    <div style="
      position: fixed; 
      bottom: 20px; 
      right: 20px; 
      background: linear-gradient(135deg, #3b82f6, #8b5cf6);
      color: white; 
      padding: 16px 20px; 
      border-radius: 12px; 
      box-shadow: 0 10px 25px rgba(0,0,0,0.2);
      z-index: 9999;
      font-family: Inter, sans-serif;
      cursor: pointer;
      backdrop-filter: blur(10px);
      border: 1px solid rgba(255,255,255,0.1);
    ">
      <div style="display: flex; align-items: center; gap: 10px;">
        <span style="font-size: 24px;">📱</span>
        <div>
          <div style="font-weight: 600; font-size: 14px;">Instalar Portafolio</div>
          <div style="font-size: 12px; opacity: 0.8;">Como aplicación PWA</div>
        </div>
        <button id="install-btn" style="
          background: rgba(255,255,255,0.2);
          border: none;
          color: white;
          padding: 6px 12px;
          border-radius: 6px;
          font-size: 12px;
          cursor: pointer;
          font-weight: 600;
        ">Instalar</button>
        <button id="close-install" style="
          background: transparent;
          border: none;
          color: white;
          font-size: 18px;
          cursor: pointer;
          padding: 0;
          width: 20px;
          height: 20px;
        ">×</button>
      </div>
    </div>
  `
  
  document.body.appendChild(installBanner)
  
  // Install button click
  document.getElementById('install-btn')?.addEventListener('click', () => {
    if (deferredPrompt) {
      deferredPrompt.prompt()
      deferredPrompt.userChoice.then((choiceResult) => {
        if (choiceResult.outcome === 'accepted') {
          console.log('✅ User accepted PWA install')
        }
        deferredPrompt = null
        installBanner.remove()
      })
    }
  })
  
  // Close button
  document.getElementById('close-install')?.addEventListener('click', () => {
    installBanner.remove()
  })
  
  // Auto-hide after 10 seconds
  setTimeout(() => {
    if (document.body.contains(installBanner)) {
      installBanner.remove()
    }
  }, 10000)
})

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
