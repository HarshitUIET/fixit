import React, { lazy, useState } from 'react'
import {ProtectRoute} from './components/auth/ProtectRoute.jsx';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import { Suspense } from 'react';
import {LayoutLoader} from './layout/Loader.jsx';


const Home = lazy(() => import('./pages/Home.jsx'));
const Chat = lazy(() => import('./pages/Chat.jsx'));
const Login = lazy(() => import('./pages/Login.jsx'));
const About = lazy(() => import('./pages/About.jsx'));
const Notfound = lazy(() => import('./pages/Notfound.jsx'));

const App = () => {
  
  const [user,setUser] = useState(false);

  return (
   <div >
       <BrowserRouter>
         <Suspense fallback={<LayoutLoader/>}>
         <Routes>
         <Route path='/' element={<Home user={user} setUser={setUser}/>} />  
        <Route element={<ProtectRoute user={user}/>}>
          <Route path='/chat' element={<Chat/>} />  
          <Route path='/about' element={<About/>} />
        </Route>
         
          <Route path='/login' element={<ProtectRoute user={!user} redirect='/'>
            <Login/>
          </ProtectRoute>} />

          <Route path='*' element={<Notfound/>} />
       </Routes>
         </Suspense>
       </BrowserRouter>
   </div>
  )
}

export default App