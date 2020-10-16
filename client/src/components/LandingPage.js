import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class LandingPage extends React.Component {
  render() {
    return (
      <div className="landingBackground"></div>
    )
  }
}

LandingPage.propTypes = {
  isAuthenticated: PropTypes.bool
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.isAuthenticated
  }
}

export default connect(mapStateToProps)(LandingPage);