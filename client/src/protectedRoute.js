import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

const ProtectedRoute = ({ component: Component, ...rest }) => {  
  // check for
  const isAuthenticated = rest.isAuthenticated || localStorage.getItem('token');
  return (
    // render function - instead of using the component prop
    // pass in function to be called when the location matches
    //  takes route's props as an argument
    <Route {...rest} render={routeProps => {
      if (isAuthenticated) {
        return <Component {...routeProps} />
      } else {
        return (<Redirect
          to={{
            pathname: "/login",
            state: {
              from: routeProps.location
            }
          }}
        />)
      }
    }} />
  )
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.isAuthenticated,
  }
}

export default connect(mapStateToProps)(ProtectedRoute);