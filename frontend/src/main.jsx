import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './main.css'
import { CssBaseline } from '@mui/material'
import { Auth0Provider } from '@auth0/auth0-react';
import {Toaster} from 'react-hot-toast';



ReactDOM.createRoot(document.getElementById('root')).render(
  <Auth0Provider
    domain="dev-ptlqemiqyz1u155v.us.auth0.com"
    clientId="PeGZKSpgNLQ5shf5LcOZUzYV9Xl51C7E"
    authorizationParams={{
      redirect_uri: window.location.origin,
      logoutUrl: "https://fixit-7m4u.vercel.app/" 
    }}
  >
    <CssBaseline>
      <App />
      <Toaster />
    </CssBaseline>
  </Auth0Provider>
);

