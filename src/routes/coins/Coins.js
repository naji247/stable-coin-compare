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
import s from './Coins.css';
import Fade from 'react-reveal/Fade';
import Shake from 'react-reveal/Shake';
import { connect } from 'react-redux';
import { Element } from 'react-scroll';
import { APP_URL } from '../../secrets';
import Navbar from '../../components/Navbar';
import _ from 'lodash';
import * as coinDetails from '../../stablecoinInfo';
import classNames from 'classnames';
import history from '../../history';
import { COIN_IDS, CoinMarketCapWidget, EmailSignUp } from '../home/Home';

function importAll(r) {
  const images = {};
  r.keys().map((item, index) => {
    images[item.replace('./', '')] = r(item);
  });
  return images;
}

const coinLogos = importAll(
  require.context('./icons', false, /\.(png|jpe?g|svg)$/)
);

class Coins extends React.Component {
  handleCoinSelect(coinId) {
    coinId === this.props.selectedCoinId
      ? history.push('/coins')
      : history.push(`/coins/${coinId}`);
  }

  render() {
    return (
      <Element>
        <Navbar />
        <div className={s.container}>
          <div
            onClick={() => {
              this.handleCoinSelect(this.props.selectedCoinId);
            }}
            className={`${s.backToCoins} ${
              this.props.selectedCoinId ? s.backToCoinsVisible : ''
            }`}
          >
            <button>Back to Coins</button>
          </div>
          <h1 className={this.props.selectedCoinId ? s.coinsHeader : null}>
            Coins
          </h1>
          <div className={s.coinDetailsContainer}>
            <div
              className={`${s.coinSelectContainer} ${
                this.props.selectedCoinId ? s.mobileHidden : s.fullWidth
              }`}
            >
              {_.keys(coinDetails).map(coinId => (
                <CoinSelector
                  isActive={coinId === this.props.selectedCoinId}
                  onClick={() => this.handleCoinSelect(coinId)}
                  coinId={coinId}
                />
              ))}
            </div>
            <div
              className={`${s.coinDescriptionContainer} ${
                this.props.selectedCoinId ? '' : s.mobileHidden
              }`}
            >
              {/* TODO: Adding coin details sections */}
              {!this.props.selectedCoinId ? (
                <p>Select a coin from the left.</p>
              ) : (
                <CoinDetails coinId={this.props.selectedCoinId} />
              )}
            </div>
          </div>
        </div>
      </Element>
    );
  }
}

const CoinSelector = props => (
  <div
    onClick={props.onClick}
    className={`${s.coinSelect} ${props.isActive ? s.coinSelectActive : ''}`}
  >
    <div className={s.coinSelectWrapper}>
      <div className={s.coinSelectLogoWrapper}>
        <img
          className={s.coinSelectImage}
          key={props.coinId}
          src={coinLogos[`${props.coinId}.png`]}
          className={s.coinLogo}
          alt={props.coinId}
        />
      </div>
      <span className={s.coinSelectName}>
        {coinDetails[props.coinId]['Stablecoin Project']}
      </span>
    </div>
  </div>
);

const shownDetails = [
  'Founders',
  'Company',
  'Backers',
  'Stability Method',
  'Description'
];

const CoinDetails = props => {
  if (typeof window !== 'undefined') {
    const script = document.createElement('script');
    script.src = '../currency.js';
    script.async = true;
    document.body.appendChild(script);
  }

  return (
    <div>
      <div className={s.coinDescriptionHeader}>
        <div className={s.coinDescriptionLogo}>
          <img
            className={s.coinDescriptionImg}
            src={coinLogos[`${props.coinId}.png`]}
            alt={props.coinId}
          />
        </div>
        <span className={s.coinDescriptionTitle}>
          {coinDetails[props.coinId]['Stablecoin Project']}
        </span>
      </div>
      <div className={s.fieldContainer}>
        {shownDetails.map(field => (
          <div className={s.fieldEntry}>
            <span className={s.fieldKey}>{field}:</span>
            <span className={s.fieldValue}>
              {coinDetails[props.coinId][field]}
            </span>
          </div>
        ))}
        {COIN_IDS[props.coinId] && (
          <CoinMarketCapWidget currencyId={COIN_IDS[props.coinId]} />
        )}
        {COIN_IDS[props.coinId] && (
          <p className={s.tickerInfo}>Ticker updated real-time.</p>
        )}

        <p className={s.subscribeText}>We're constantly adding new features! Subscribe for updates to see our latest changes and express your interest!</p>
        <EmailSignUp />
      </div>
    </div>
  );
};

const mapState = state => ({});

const mapDispatch = {};

export default connect(mapState, mapDispatch)(withStyles(s)(Coins));
