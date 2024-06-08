import React from 'react';
import { Outlet } from 'react-router-dom';
import { Navigate } from 'react-router-dom';

export const ProtectRoute = ({children,isAuthenticated,redirect="/login"}) => {
     if(!isAuthenticated) return <Navigate to={redirect} />
   
      return children ? children : <Outlet/>;
}
