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
import { ErrorList } from './Login';
import { connect } from 'react-redux';
import { signup } from '../../actions/authActions';
import validate from 'validate.js';
import { BeatLoader } from 'react-spinners';

class Signup extends React.Component {
  state = {
    email: '',
    password: '',
  };

  handleEmailChange(event) {
    this.setState({ email: event.target.value });
  }

  handlePasswordChange(event) {
    this.setState({ password: event.target.value });
  }

  onSignupClick() {
    const { email, password } = this.state;
    const { signup } = this.props;

    const signupConstraints = {
      email: {
        presence: true,
        email: {
          message: 'does not seem valid.',
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
    const validationIssues = validate({ email, password }, signupConstraints);
    this.setState({
      validationIssues: validationIssues,
    });
    if (!validationIssues) signup(email, password);
  }

  render() {
    return (
      <div>
        <p className={s.lead}>Sign up with your email address.</p>
        <ErrorList issues={this.state.validationIssues} />
        <div className={s.formGroup}>
          <label className={s.label} htmlFor="email">
            Email address:
            <input
              className={s.input}
              id="signup-email"
              value={this.state.email}
              onChange={event => this.handleEmailChange(event)}
              type="text"
              name="email"
              autoFocus // eslint-disable-line jsx-a11y/no-autofocus
            />
          </label>
        </div>
        <div className={s.formGroup}>
          <label className={s.label} htmlFor="password">
            Password:
            <input
              className={s.input}
              id="signup-password"
              value={this.state.password}
              onChange={event => this.handlePasswordChange(event)}
              type="password"
              name="password"
            />
          </label>
        </div>
        <div className={s.formGroup}>
          <button
            onClick={() => this.onSignupClick()}
            className={s.button}
            type="submit"
          >
            Signup
          </button>
        </div>
      </div>
    );
  }
}

const mapState = state => ({
  ...state.user,
});

const mapDispatch = {
  signup,
};

export default connect(mapState, mapDispatch)(withStyles(s)(Signup));
