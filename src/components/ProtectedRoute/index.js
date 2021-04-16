import React from 'react';
import { Route, Redirect } from 'react-router-dom';
const ProtectedRoute = ({ component: Component, isAuth, ...rest }) => (
  <Route
    {...rest}
    render={props => (!isAuth)
        ? <Redirect to="/" />
        : <Component {...props} />
    }
  />
)
export default ProtectedRoute