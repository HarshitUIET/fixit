import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './main.css'
import { CssBaseline } from '@mui/material'
import { HelmetProvider } from 'react-helmet-async'



ReactDOM.createRoot(document.getElementById('root')).render(
  <HelmetProvider>
    <CssBaseline>
       <div>
        <App/>
       </div>
    </CssBaseline>
  </HelmetProvider>
)
