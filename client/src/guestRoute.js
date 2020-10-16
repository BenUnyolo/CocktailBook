import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

const GuestRoute = ({ component: Component, ...rest }) => {  
  // check for
  const isAuthenticated = rest.isAuthenticated || localStorage.getItem('token');
  return (
    <Route {...rest} render={routeProps => {
      if (isAuthenticated) {
        return (<Redirect
          to={{
            pathname: "/cocktails",
            state: {
              from: routeProps.location
            }
          }}
        />)
      } else {
        return <Component {...routeProps} />
      }
    }} />
  )
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.isAuthenticated,
  }
}

export default connect(mapStateToProps)(GuestRoute);