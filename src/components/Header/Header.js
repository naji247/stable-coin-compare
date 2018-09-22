/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Header.css';
import Link from '../Link';
import Navigation from '../Navigation';
import logoUrl from './logo-small.png';
import { connect } from 'react-redux';
import _ from 'lodash';
import { APP_URL } from '../../secrets';

class Header extends React.Component {
  render() {
    return (
      <div className={s.root}>
        <div className={s.container}>
          <Navigation />
          <Link className={s.brand} to="/">
            <img
              src={logoUrl}
              srcSet={`${logoUrl} 2x`}
              alt="SCX Logo"
              className={s.logo}
            />
            <span className={s.brandTxt}>SCX</span>
          </Link>
          <EmailSignUp />
        </div>
      </div>
    );
  }
}

class EmailSignUp extends React.Component {
  constructor(props) {
    super(props);
    this.emailInput = React.createRef();
    this.state = { subscribed: false, duplicateError: false };
  }
  handleSubmit = async event => {
    this.setState({ duplicateError: false });
    event.preventDefault();
    const email = (this.emailInput && this.emailInput.current.value) || null;
    if (this.emailInput && !email) {
      return;
    }

    try {
      const resp = await fetch(`${APP_URL}/api/subscribe`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email })
      });

      const body = await resp.json();
      if (!resp.ok) {
        this.setState({ duplicateError: true });
        return;
      }
      this.setState({ subscribed: true, duplicateError: false });
    } catch (error) {
      this.setState({ duplicateError: true });
    }
  };

  render() {
    let duplicateErrorNotice = null;
    if (this.state.duplicateError) {
      duplicateErrorNotice = (
        <p>Hmmm. Looks like you've already subscribed, try again?</p>
      );
    }
    return (
      <div className={s.emailSignupContainer}>
        <p>
          This site is under construction! If you're interested please subscribe
          for updates :)
        </p>
        {duplicateErrorNotice}
        {!this.state.subscribed ? (
          <form onSubmit={this.handleSubmit}>
            <input
              type="email"
              ref={this.emailInput}
              placeholder="satoshi@nakamoto.com"
            />
            <input type="submit" value="Subscribe!" />
          </form>
        ) : (
          <p>Thanks so much for your interest! We'll keep you posted.</p>
        )}
      </div>
    );
  }
}

const mapState = state => ({});

const mapDispatch = {};

export default connect(mapState, mapDispatch)(withStyles(s)(Header));
