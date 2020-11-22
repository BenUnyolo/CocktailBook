import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';

import { login } from '../../actions/authActions'
import { clearErrors } from '../../actions/errorActions'

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = { msg: null };
  }

  // previous props argument allows us to check against current props
  componentDidUpdate(prevProps) {
    const { error } = this.props;
    // see if error has appeared
    if (error !== prevProps.error) {
      // check for login error
      if (error.id === 'LOGIN_FAIL') {
        this.setState({ msg: error.msg.msg })
      } else {
        this.setState({ msg: null })
      }
    }
  }

  // clears errors when un-mounting
  componentWillUnmount() {
    this.props.clearErrors();
  }

  renderError = ({ error, touched }) => {
    if (touched && error) {
      return (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )
    }
  }

  renderField = ({ input, meta, type, label, id, placeholder, required }) => {
    return (
      <div className="form-group">
        <label>{label}
          <input {...input} type={type} className="form-control" id={id} placeholder={placeholder} required={required} autoComplete="off" />
        </label>
        {this.renderError(meta)}
      </div>
    );
  }

  onSubmit = (formValues) => {
    // CHANGEME https://reactrouter.com/web/example/auth-workflow take a look at history.replace
    this.props.login(formValues)
  }

  render() {
    return (
      <div>
        { this.state.msg ? (<div className="alert alert-danger" role="alert">{this.state.msg}</div>) : null}
        <form onSubmit={this.props.handleSubmit(this.onSubmit)}>
          <Field name="username" component={this.renderField} type="text" label="Username" id="userName" placeholder="ben1994" required={true} />
          <Field name="password" component={this.renderField} type="password" label="Password" id="password" placeholder="" required={true} />
          <button type="submit" className="btn btn-primary">Login</button>
        </form>
      </div>
    )
  }
}

const validate = (formValues) => {
  const errors = {};

  if (!formValues.username) {
    errors.name = 'No username entered'
  }

  if (!formValues.password) {
    errors.name = 'No password entered'
  }

  return errors;
}

Login.propTypes = {
  isAuthenticated: PropTypes.bool,
  error: PropTypes.object.isRequired,
  login: PropTypes.func.isRequired,
  clearErrors: PropTypes.func.isRequired
}

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.isAuthenticated,
    error: state.error
  }
}

Login = connect(mapStateToProps, {
  login,
  clearErrors
})(Login);

export default reduxForm({
  form: 'login',
  validate
})(Login);