import { useEffect, useState } from 'react'

export default function TinaAdminPage() {
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  if (!isClient) {
    return <div>Loading TinaCMS...</div>
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="max-w-md mx-auto text-center">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">TinaCMS Admin</h1>
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
          <p className="text-blue-800 mb-4">
            This is a placeholder for the full TinaCMS admin interface.
          </p>
          <p className="text-blue-700 text-sm">
            Once you set up your TinaCMS credentials, this will become the visual editor.
          </p>
        </div>
      </div>
    </div>
  )
}