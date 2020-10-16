import React from 'react';
import PropTypes from 'prop-types';
import { Router, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import { loadUser } from '../actions'

import ProtectedRoute from '../protectedRoute';
import GuestRoute from '../guestRoute';
import Navbar from './Navbar';
import LandingPage from './LandingPage';
import Register from './auth/Register';
import Login from './auth/Login';
import CocktailList from './cocktails/CocktailList';
import CocktailCreate from './cocktails/CocktailCreate';
import CocktailEdit from './cocktails/CocktailEdit';
import CocktailShow from './cocktails/CocktailShow';
import history from '../history';

class App extends React.Component {
  componentDidMount() {
    // tries to load user if JWT token in local storage
    if (localStorage.getItem('token')) {
      this.props.loadUser();
    }
  }

  render() {
    return (
      // if we weren't using history we would use BrowserRouter
      // we create a custom history object w/ redux to track URL changes
      <Router history={history}>
        <div>
          <Navbar />
          <div className="container">
            {/* switch will only show the first route it matches with */}
            {/* CHANGEME - don't think I need the /cocktails/ here */}
            <Switch>
              <GuestRoute path="/" exact component={LandingPage} />
              <GuestRoute path="/register" exact component={Register} />
              <GuestRoute path="/login" exact component={Login} />
              <ProtectedRoute path="/cocktails" exact component={CocktailList} />
              <ProtectedRoute path="/cocktails/new" exact component={CocktailCreate} />
              <ProtectedRoute path="/cocktails/edit/:id" exact component={CocktailEdit} />
              {/* <Route path="/cocktails/:id" exact component={CocktailShow} /> */}
              <Route path="*" component={() => "404 NOT FOUND"} />
            </Switch>
          </div>
        </div>
      </Router>
    );
  }
}

App.propTypes = {
  loadUser: PropTypes.func.isRequired
}

export default connect(null, { loadUser })(App);