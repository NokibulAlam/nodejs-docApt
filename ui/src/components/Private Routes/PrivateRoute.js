import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';


// Import API
import {isAuthenticate} from '../APIs/Auth';

const PrivateRoute = ({component, path, children, ...rest}) => {
  return isAuthenticate() ? <Outlet /> : <Navigate to={{ pathname: "/signin" }} />;
}

export default PrivateRoute;