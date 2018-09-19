/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Login.css';
import { connect } from 'react-redux';
import { login, logout } from '../../actions/authActions';
import validate from 'validate.js';
import history from '../../history';
import { BeatLoader } from 'react-spinners';
import Fade from 'react-reveal/Fade';
import Shake from 'react-reveal/Shake';

class Login extends React.Component {
  state = {
    email: '',
    password: '',
    validationIssues: undefined,
    loginAttempts: 0,
  };

  componentWillMount() {
    this.setState({
      email: '',
      password: '',
      validationIssues: undefined,
      loginAttempts: 0,
    });
  }

  static propTypes = {
    title: PropTypes.string.isRequired,
  };

  handleEmailChange(event) {
    this.setState({ email: event.target.value });
  }

  handlePasswordChange(event) {
    this.setState({ password: event.target.value });
  }

  onLoginClick() {
    const { email, password, loginAttempts } = this.state;
    const { login } = this.props;

    const loginConstraints = {
      email: {
        presence: true,
        email: {
          message: 'is not valid.',
        },
      },
      password: {
        presence: true,
        length: {
          minimum: 6,
          message: 'must be at least 6 characters.',
        },
      },
    };

    const validationIssues = validate({ email, password }, loginConstraints);
    this.setState({
      validationIssues: validationIssues,
    });
    if (!validationIssues) {
      login(email, password);
    } else {
      this.setState({
        validationIssues: { ...validationIssues, server: [] },
        loginAttempts: loginAttempts + 1,
      });
    }
  }

  handleKeyPress(event) {
    if (event.charCode == 13) {
      event.preventDefault();
      event.stopPropagation();
      this.onLoginClick();
    }
  }

  onExitClick() {
    this.props.logout();
    history.push('/');
  }

  loginDisabled() {
    return this.state.email.length < 3 || this.state.password.length < 3;
  }

  render() {
    var issues = this.state.validationIssues;
    if (!issues && this.props.error) {
      issues = { server: [this.props.error.error.message] };
    }

    var disabled = this.loginDisabled();
    return (
      <div className={s.root} onKeyPress={event => this.handleKeyPress(event)}>
        <div className={s.exit} onClick={() => this.onExitClick()}>
          X
        </div>
        <div className={s.container}>
          <Fade top>
            <p className={s.lead}>Log in to your account</p>
          </Fade>
          <ErrorList issues={issues} />
          <Shake
            spy={this.state.loginAttempts + this.props.serverLoginAttempts}
          >
            <div>
              <div className={s.formGroup}>
                <label className={s.label} htmlFor="email">
                  <input
                    className={s.input}
                    value={this.state.email}
                    onChange={event => this.handleEmailChange(event)}
                    placeholder="Email Address"
                    id="login-email"
                    type="text"
                    name="email"
                    autoFocus // eslint-disable-line jsx-a11y/no-autofocus
                  />
                </label>
              </div>
              <div className={s.formGroup}>
                <label className={s.label} htmlFor="password">
                  <input
                    className={s.input}
                    placeholder="Password"
                    id="login-password"
                    value={this.state.password}
                    onChange={event => this.handlePasswordChange(event)}
                    type="password"
                    name="password"
                  />
                </label>
              </div>
              <div className={s.formGroup}>
                <button
                  onClick={() => this.onLoginClick()}
                  className={s.button}
                  disabled={disabled}
                  type="submit"
                >
                  {!this.props.loading ? (
                    'Log In'
                  ) : (
                    <BeatLoader color={'#055ea8'} />
                  )}
                </button>
              </div>
            </div>
          </Shake>
        </div>
      </div>
    );
  }
}

export class ErrorList extends React.Component {
  render() {
    const { issues } = this.props;
    if (!issues || issues.length === 0)
      return <Fade top collapse spy={JSON.stringify(issues)} />;

    var messages = [];
    if (issues.email) {
      _.forEach(issues.email, reason => {
        messages.push(
          <p key={reason} className={s.issues}>
            {reason}
          </p>,
        );
      });
    }

    if (issues.password) {
      _.forEach(issues.password, reason => {
        messages.push(
          <p key={reason} className={s.issues}>
            {reason}
          </p>,
        );
      });
    }

    if (issues.server) {
      _.forEach(issues.server, reason => {
        messages.push(
          <p key={reason} className={s.issues}>
            {reason}
          </p>,
        );
      });
    }

    if (issues.confirmPassword) {
      _.forEach(issues.confirmPassword, reason => {
        messages.push(
          <p key={reason} className={s.issues}>
            {reason}
          </p>,
        );
      });
    }
    return (
      <Fade top collapse spy={JSON.stringify(issues)}>
        <div>{messages}</div>
      </Fade>
    );
  }
}

const mapState = state => ({
  loading: state.userState.isLoadingLogin,
  error: state.userState.loginError,
  serverLoginAttempts: state.userState.serverLoginAttempts,
});

const mapDispatch = {
  login,
  logout,
};

export default connect(mapState, mapDispatch)(withStyles(s)(Login));
