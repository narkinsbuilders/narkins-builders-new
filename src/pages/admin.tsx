import { TinaAdmin } from 'tinacms'
import dynamic from 'next/dynamic'

// Dynamically import TinaAdmin to avoid SSR issues
const DynamicTinaAdmin = dynamic(() => import('tinacms').then(mod => ({ default: mod.TinaAdmin })), {
  ssr: false,
})

export default function AdminPage() {
  return <DynamicTinaAdmin config={{}} />
}