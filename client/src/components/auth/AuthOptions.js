import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { logout, deleteUser } from '../../actions/authActions';

import '../cocktails/CocktailList.css';

class AuthOptions extends React.Component {
  renderAuth() {
    const { isAuthenticated, user } = this.props.auth;
    return isAuthenticated ?
      <div className="nav-item dropdown">
        <Link className="nav-link dropdown-toggle px-0" to="#" id="navbarDropdownMenuLink" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          {user.username && user.username}
        </Link>
        <div className="dropdown-menu dropdown-menu-right" aria-labelledby="navbarDropdownMenuLink">
          <Link to="#" className="dropdown-item" onClick={() => {
            if (window.confirm(
              `Are you sure you want to permanently delete your account? You will lose all your saved cocktails.`
            )) { this.props.deleteUser() }
          }}>Delete Account</Link>
          <Link className="dropdown-item text-danger" to="#" onClick={this.props.logout}>Logout</Link>
        </div>
      </div>
      :
      // <div className="nav-item">
      <>
        <Link to="/register">
          <button className="btn btn-primary">Register</button>
        </Link>
        <Link to="/login">
          <button className="btn btn-primary ml-2">Login</button>
        </Link>
      </>
    // </div>
  }

  render() {
    return (
      <div>
        {this.renderAuth()}
      </div>
    )
  }
}

AuthOptions.propTypes = {
  logout: PropTypes.func.isRequired,
  deleteUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  auth: state.auth
})

export default connect(mapStateToProps, { logout, deleteUser })(AuthOptions);