import React, { use } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { Navigate } from 'react-router';
import Loading from './loading';

const PrivetRoutes = ({children}) => {
   const {user,loading}=use(AuthContext);
    if(loading){
    return <Loading></Loading>
    }
   if(user && user.email){
    return children;
   }
   return <Navigate to={"/login"}></Navigate>
   
  
};

export default PrivetRoutes;