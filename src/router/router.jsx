import React, { useEffect, useState, Suspense } from 'react'
import AuthRouter from './AuthRouter'
import GuestRouter from './GuestRouter'

const Router = () => {
  const [authenticated, setAuthenticated] = useState(false)

  useEffect(() => {
    // For now you can create a fake token for testing:
    // open the browser console and run:
    // localStorage.setItem('token', 'fake-token')
    //
    // Or uncomment the next line to auto-create a fake token during dev:
    // localStorage.setItem('token', 'fake-token')

    const token = localStorage.getItem('token')
    setAuthenticated(Boolean(token))
  }, [])

  return (
    <Suspense fallback={<div className="p-4">Loading routes...</div>}>
      {authenticated ? <AuthRouter /> : <GuestRouter />}
    </Suspense>
  )
}

export default Router
