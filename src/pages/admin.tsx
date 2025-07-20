import { GetServerSideProps } from 'next'

export default function AdminPage() {
  return null
}

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const protocol = req.headers['x-forwarded-proto'] || 'http'
  const host = req.headers.host
  const isLocalhost = host?.includes('localhost')
  
  let destination
  if (isLocalhost) {
    destination = 'http://localhost:4001/admin/index.html'
  } else {
    destination = `${protocol}://${host}/admin/index.html`
  }

  return {
    redirect: {
      destination,
      permanent: false,
    },
  }
}