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
import { connect } from 'react-redux';
import Header from '../../components/Header';
import { Element } from 'react-scroll';
import { APP_URL } from '../../secrets';
import _ from 'lodash';
import request from 'request-promise';

export const COIN_IDS = {
  tether: 825,
  trueusd: 2563,
  dai: 2308,
  bitcny: 624,
  paxos: 3330,
  steemdollar: 1312,
  bitusd: 623,
  nusd: 2927,
  geminidollar: 3306
};
// const coinIds = [825, 2563, 2308, 624, 3330, 1312, 623, 2927, 3306];
const specialCoinIds = {
  '3306': {
    ethContract: '0x056fd409e1d7a124bd7017459dfea2f387b6d5cd'
  }
};

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      '3306': null
    };
  }

  async componentDidMount() {
    _.keys(specialCoinIds).forEach(async coinId => {
      try {
        const resp = await request.get({
          url: `${APP_URL}/api/token-supply/${
            specialCoinIds[coinId].ethContract
          }`,
          json: true
        });
        const temp = {};
        temp[coinId] = resp.result;
        this.setState({
          ...this.state,
          ...temp
        });
      } catch (e) {
        console.log(e);
      }
    });
  }

  render() {
    if (typeof window !== 'undefined') {
      const script = document.createElement('script');
      script.src = './currency.js';
      script.async = true;
      document.body.appendChild(script);
    }

    return (
      <div>
        <Header />
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
                <EmailSignUp />
              </div>
            </Fade>
          </div>
          {/* <script type="text/javascript" src="./currency.js" /> */}
          <h1 className={s.constructionHeading}>
            Currently Released Stablecoins
          </h1>
          <div className={s.widgetContainer}>
            {_.values(COIN_IDS).map(coinId => (
              <CoinMarketCapWidget
                currencyId={coinId}
                inputSupply={this.state[`${coinId}`]}
              />
            ))}
          </div>
          <p className={s.widgetNotice}>These numbers are updated real time.</p>
        </Element>
      </div>
    );
  }
}

class EmailSignUpComp extends React.Component {
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
            <form className={s.subscribeForm} onSubmit={this.handleSubmit}>
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
          <Fade top>
            <p className={s.subscribeMessage}>
              Thanks so much for your interest! We'll keep you posted.
            </p>
          </Fade>
        )}
      </div>
    );
  }
}

const EmailSignUp = withStyles(s)(EmailSignUpComp);

export class CoinMarketCapWidget extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className={s.coinmarketcapWidgetWrapper}>
        <div
          className="coinmarketcap-currency-widget"
          data-currencyid={this.props.currencyId}
          data-base="USD"
          data-secondary=""
          data-ticker="true"
          data-inputsupply={this.props.inputSupply || ''}
          data-rank="false"
          data-marketcap="true"
          data-volume="true"
          data-stats="USD"
          data-statsticker="false"
        />
      </div>
    );
  }
}
const mapState = state => ({});

const mapDispatch = {};

export { EmailSignUp };
export default connect(
  mapState,
  mapDispatch
)(withStyles(s)(Home));
