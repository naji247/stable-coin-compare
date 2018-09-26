/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import withStyles from 'isomorphic-style-loader/lib/withStyles';
import React from 'react';
import s from './Home.css';
import Fade from 'react-reveal/Fade';
import Shake from 'react-reveal/Shake';
import Introducing from '../../components/Introducing';
import Description from '../../components/Description';
import StablecoinPrimer from '../../components/StablecoinPrimer';
import { connect } from 'react-redux';
import Layout from '../../components/Layout';
import { Element } from 'react-scroll';
import { APP_URL } from '../../secrets';

class Home extends React.Component {
  render() {
    return (
      <Element name="subscribe">
        <div className={s.constructionContainer}>
          <Fade bottom cascade>
            <div>
              <h1 className={s.constructionHeading}>
                This site is currently under construction!
              </h1>
              <h3 className={s.constructionText}>
                We are working hard to develop these features for you ASAP. If
                you want to be notified about future updates, subscribe to our
                newsletter :)
              </h3>
            </div>
            <EmailSignUp />
          </Fade>
        </div>
      </Element>
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
      console.log(error);
      this.setState({ duplicateError: true });
    }
  };

  render() {
    let duplicateErrorNotice = null;
    if (this.state.duplicateError) {
      duplicateErrorNotice = (
        <Fade top>
          <p className={s.subscribeMessage}>
            Hmmm. Looks like you've already subscribed, try again?
          </p>
        </Fade>
      );
    }
    return (
      <div className={s.emailSignupContainer}>
        {duplicateErrorNotice}
        {!this.state.subscribed ? (
          <Shake spy={duplicateErrorNotice}>
            <form onSubmit={this.handleSubmit}>
              <input
                type="email"
                ref={this.emailInput}
                placeholder="your@email.com"
                className={s.emailInput}
              />
              <input
                type="submit"
                value="Subscribe"
                className={s.emailButton}
              />
            </form>
          </Shake>
        ) : (
          <p className={s.subscribeMessage}>
            Thanks so much for your interest! We'll keep you posted.
          </p>
        )}
      </div>
    );
  }
}

const mapState = state => ({});

const mapDispatch = {};

export default connect(mapState, mapDispatch)(withStyles(s)(Home));
