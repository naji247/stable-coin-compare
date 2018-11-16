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
import s from './Analytics.css';
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

const coinData = {
  tether: { name: 'Tether', score: 9.8, cap: '$2.1B', volume: '$3.1B' },
  trueusd: { name: 'TrueUSD', score: 8.8, cap: '$50M', volume: '$180M' },
  usdcoin: { name: 'USDCoin', score: 3.4, cap: '$200M', volume: '$400M' },
  geminidollar: {
    name: 'Gemini Dollar',
    score: 2.4,
    cap: '$100M',
    volume: '$120M'
  },
  paxos: { name: 'Paxos Standard', score: 2.3, cap: '$120M', volume: '$200M' }
};

class Analytics extends React.Component {
  constructor(props) {
    super(props);
    this.state = { selectedCoinId: null };
  }

  handleCoinSelect(coinId) {
    if (coinId === this.state.selectedCoinId) {
      this.setState({ selectedCoinId: null });
    } else {
      this.setState({ selectedCoinId: coinId });
    }
  }
  render() {
    return (
      <div className={s.gradientLayer}>
        <Navbar background="translucent" />
        <div className={s.root}>
          <div className={s.titleContainer}>
            <h1 className={s.titleText}>Analytics</h1>
          </div>
          <div className={s.contentContainer}>
            <div className={s.cardContainer}>
              <div className={s.innerCardWrapper}>
                {_.keys(coinData).map(coinId => (
                  <Card
                    coinId={coinId}
                    isActive={coinId === this.state.selectedCoinId}
                    onClick={() => this.handleCoinSelect(coinId)}
                  />
                ))}
              </div>
            </div>
            <div className={s.chartContainer}>
              <div className={s.chartArea}>hello</div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const Card = props => (
  <div
    onClick={props.onClick}
    className={`${s.card} ${props.isActive ? s.activeCard : ''}`}
  >
    <div
      className={`${s.innerCard} ${props.isActive ? s.activeInnerCard : ''}`}
    >
      <div className={s.cardTitleWrapper}>
        <img
          className={s.cardTitleImg}
          src={coinLogos[`${props.coinId}.png`]}
          alt={props.coinId}
        />
        <h2 className={s.cardTitleText}>{coinData[props.coinId].name}</h2>
      </div>
      <div className={s.dataContainer}>
        <div className={s.datum}>
          <h3 className={s.datumLabel}>Score</h3>
          <h4 className={s.datumValueActive}>{coinData[props.coinId].score}</h4>
        </div>
        <div className={s.datum}>
          <h3 className={s.datumLabel}>Cap</h3>
          <h4 className={s.datumValue}>{coinData[props.coinId].cap}</h4>
        </div>
        <div className={s.datum}>
          <h3 className={s.datumLabel}>Volume</h3>
          <h4 className={s.datumValue}>{coinData[props.coinId].volume}</h4>
        </div>
      </div>
    </div>
  </div>
);

const mapState = state => ({});

const mapDispatch = {};

export default connect(mapState, mapDispatch)(withStyles(s)(Analytics));
