import React, { Children } from 'react'

import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({children}) => {
    const isAuthenticated=true;

    if(!isAuthenticated){
        return <Navigate to ="/" replace/>
    }
  return children
}

export default ProtectedRoute