import React, { lazy, useState } from 'react'
import {ProtectRoute} from './components/auth/ProtectRoute.jsx';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import { Suspense } from 'react';
import {LayoutLoader} from './layout/Loader.jsx';
import { useAuth0 } from '@auth0/auth0-react';




const Home = lazy(() => import('./pages/Home.jsx'));
const Chat = lazy(() => import('./pages/Chat.jsx'));
const Login = lazy(() => import('./pages/Login.jsx'));
const About = lazy(() => import('./pages/About.jsx'));
const Notfound = lazy(() => import('./pages/Notfound.jsx'));

const App = () => {
  
  const {user,isAuthenticated} = useAuth0();

  return (
   <div >
       <BrowserRouter>
         <Suspense fallback={<LayoutLoader/>}>
         <Routes>
         <Route path='/' element={<Home isAuthenticated={isAuthenticated} />} />  
        <Route element={<ProtectRoute isAuthenticated={isAuthenticated}/>}>
          <Route path='/chat' element={<Chat/>} />  
          <Route path='/about' element={<About/>} />
        </Route>
         
          <Route path='/login' element={<ProtectRoute isAuthenticated={!isAuthenticated} redirect='/'>
            <Login />
          </ProtectRoute>} />

         
          <Route path='*' element={<Notfound/>} />
       </Routes>
         </Suspense>
       </BrowserRouter>
   </div>
  )
}

export default App