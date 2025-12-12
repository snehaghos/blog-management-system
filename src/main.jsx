import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import Router from './router/router.jsx'
import AuthContextProvider from './modules/Auth/context/AuthContextProvider.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
    <AuthContextProvider>
      <Router />
    </AuthContextProvider>
    </BrowserRouter>
  </StrictMode>,
)
