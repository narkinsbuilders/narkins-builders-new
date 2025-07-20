'use client'

import { useState, useEffect } from 'react'

interface BeforeInstallPromptEvent extends Event {
  readonly platforms: string[]
  readonly userChoice: Promise<{
    outcome: 'accepted' | 'dismissed'
    platform: string
  }>
  prompt(): Promise<void>
}

export default function PWAInstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null)
  const [showInstallPrompt, setShowInstallPrompt] = useState(false)

  useEffect(() => {
    const handleBeforeInstallPrompt = (e: BeforeInstallPromptEvent) => {
      e.preventDefault()
      setDeferredPrompt(e)
      setShowInstallPrompt(true)
    }

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt as EventListener)

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt as EventListener)
    }
  }, [])

  const handleInstallClick = async () => {
    if (!deferredPrompt) return

    deferredPrompt.prompt()
    const { outcome } = await deferredPrompt.userChoice
    
    if (outcome === 'accepted') {
      console.log('User accepted the install prompt')
    } else {
      console.log('User dismissed the install prompt')
    }
    
    setDeferredPrompt(null)
    setShowInstallPrompt(false)
  }

  const handleDismiss = () => {
    setShowInstallPrompt(false)
  }

  if (!showInstallPrompt) return null

  return (
    <div className="fixed bottom-4 left-4 right-4 md:left-auto md:right-4 md:max-w-sm bg-black text-white p-4 rounded-lg shadow-lg z-50">
      <div className="flex items-start gap-3">
        <div className="w-12 h-12 bg-gradient-to-br from-gray-700 to-gray-900 rounded-lg flex items-center justify-center text-xl font-bold">
          N
        </div>
        <div className="flex-1">
          <h3 className="font-semibold text-sm mb-1">Install Narkin's Builders</h3>
          <p className="text-xs text-gray-300 mb-3">
            Get quick access to our luxury apartments and receive updates on new projects.
          </p>
          <div className="flex gap-2">
            <button
              onClick={handleInstallClick}
              className="bg-white text-black px-3 py-1 rounded text-xs font-medium hover:bg-gray-100 transition-colors"
            >
              Install
            </button>
            <button
              onClick={handleDismiss}
              className="text-gray-300 px-3 py-1 rounded text-xs hover:text-white transition-colors"
            >
              Not now
            </button>
          </div>
        </div>
        <button
          onClick={handleDismiss}
          className="text-gray-400 hover:text-white p-1"
        >
          ×
        </button>
      </div>
    </div>
  )
}