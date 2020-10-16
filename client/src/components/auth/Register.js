import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';

import { register } from '../../actions/authActions'
import { clearErrors } from '../../actions/errorActions'

class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = { msg: null };
  }

  // previous props argument allows us to check against current props
  componentDidUpdate(prevProps) {
    const { error } = this.props;
    // see if error has appeared
    if (error !== prevProps.error) {
      // check for register error
      if (error.id === 'REGISTER_FAIL') {
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
    // if field has been selected and there is an error, render error
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
    this.props.register(formValues)
  }

  render() {
    return (
      <div>
        {this.state.msg ? (<div className="alert alert-danger" role="alert">{this.state.msg}</div>) : null}
        <form onSubmit={this.props.handleSubmit(this.onSubmit)}>
          {/* the <Field/> component connects each input to the store, the component option creates the actual input */}
          {/* when we add a field that form doesn't know about, it will pass it as a prop through the component field */}
          <Field name="username" component={this.renderField} type="text" label="Username" id="userName" placeholder="ben1994" required={true} />
          <Field name="email" component={this.renderField} type="email" label="Email" id="email" placeholder="ben@email.com" required={true} />
          <Field name="password" component={this.renderField} type="password" label="Password" id="password" placeholder="" required={true} />
          <Field name="passwordCheck" component={this.renderField} type="password" label="Retyped Password" id="passwordCheck" placeholder="" required={true} />
          <button type="submit" className="btn btn-primary">Register</button>
        </form>
      </div>
    )
  }
}

const validate = (formValues) => {
  const errors = {};

  if (!formValues.username) {
    errors.username = 'Required.'
  } else if (formValues.username.length > 15) {
    errors.username = 'Must be 15 characters or less.'
  }

  if (!formValues.email) {
    errors.email = 'Required.'
  } else if (!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(formValues.email)) {
    errors.email = 'Invalid email address.'
  }

  if (!formValues.password) {
    errors.password = 'Required.'
  } else if (formValues.password.length < 6) {
    errors.password = 'Must be at least 6 characters.'
  }

  if (!formValues.passwordCheck) {
    errors.passwordCheck = 'Required.'
  } else if (formValues.password !== formValues.passwordCheck) {
    errors.passwordCheck = 'The two passwords your entered do not match.'
  }

  return errors;
}

Register.propTypes = {
  isAuthenticated: PropTypes.bool,
  error: PropTypes.object.isRequired,
  register: PropTypes.func.isRequired,
  clearErrors: PropTypes.func.isRequired
}

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.isAuthenticated,
    error: state.error
  }
}

Register = connect(mapStateToProps, {
  register,
  clearErrors
})(Register);

export default reduxForm({
  form: 'register',
  validate
})(Register);