import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import AuthOptions from './auth/AuthOptions';
import { fetchCocktails } from '../actions'

class Navbar extends React.Component {
  refetchCocktails = () => {
    if ((window.location.pathname == "/cocktails") && this.props.isAuthenticated) {
      this.props.fetchCocktails();
    }
  };

  renderAddDrink() {
    if (this.props.isAuthenticated || localStorage.getItem('token')) {
      return (

            <Link to="/cocktails/new" className="nav-link">Add Drink</Link>

      )
    }
  }

  render() {
    return (
      <nav className="navbar navbar-expand-md navbar-dark bg-dark mb-3">
        <div className="container">
          {/* brand */}
          <div>
            <Link to="/" onClick={this.refetchCocktails} className="navbar-brand">Cocktail Book</Link>
          </div>
          {/* hamburger */}
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarContent"
            aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarContent">
            {/* links */}

            
            <div className="navbar-nav mr-auto">
              <div className="nav-item">
              {this.renderAddDrink()}
              </div>
            </div>
            {/* auth */}
            <AuthOptions />
          </div>
        </div>
      </nav >
    )
  }
}

Navbar.propTypes = {
  isAuthenticated: PropTypes.bool
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.isAuthenticated
  }
}

export default connect(mapStateToProps, { fetchCocktails })(Navbar);