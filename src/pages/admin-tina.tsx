import { TinaCMS } from 'tinacms'
import { TinaAdmin } from 'tinacms/dist/admin'
import { TinaCMSProvider } from 'tinacms'
import { useEffect, useState } from 'react'
import config from '../../tina/config'

export default function TinaAdminPage() {
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  if (!isClient) {
    return <div>Loading TinaCMS...</div>
  }

  const cms = new TinaCMS({
    apis: {
      tina: {
        clientId: process.env.NEXT_PUBLIC_TINA_CLIENT_ID,
        token: process.env.TINA_TOKEN,
        config,
      }
    },
    sidebar: {
      hidden: true,
    },
  })

  return (
    <TinaCMSProvider cms={cms}>
      <TinaAdmin />
    </TinaCMSProvider>
  )
}