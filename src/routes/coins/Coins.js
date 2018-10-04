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
  constructor(props) {
    super(props);
    this.state = {
      coinId: null
    };
  }
  handleCoinSelect(coinId) {
    (coinId === this.state.coinId) ? this.setState({coinId: null}) : this.setState({coinId});
  }

  render() {
    return (
      <Element>
        <Navbar />
        <div className={s.container}>
          <h1>Coins</h1>
          <div className={s.coinDetailsContainer}>
            <div className={s.coinSelectContainer}>
              {_.keys(coinDetails).map(coinId => (
                <CoinSelector
                  isActive={coinId === this.state.coinId}
                  onClick={() => this.handleCoinSelect(coinId)}
                  coinId={coinId}
                />
              ))}
            </div>
            <div className={s.coinDetails}>
              {/*TODO: Adding coin details sections*/}
              {!this.state.coinId ? <p>Select a coin from the left.</p> :
                <CoinDetails coinId={this.state.coinId} />}
            </div>
          </div>
        </div>
      </Element>
    );
  }
}

const CoinSelector = props => (
  <div onClick={props.onClick} className={props.isActive ? s.coinSelectActive : s.coinSelect}>
    <img
      key={props.coinId}
      src={coinLogos[`${props.coinId}.png`]}
      className={s.coinLogo}
      alt={props.coinId}
    />
    <span className={s.coinName}>
      {coinDetails[props.coinId]['Stablecoin Project']}
    </span>
  </div>
);

const shownDetails = ['Founders']
const CoinDetails = props => (
  <div className={s.coinDetailHeader}>
    <div className={s.coinDetailRow}>
      <div className={s.coinDetailLogo}>
        <img
          src={coinLogos[`${props.coinId}.png`]}
          alt={props.coinId}
        />
      </div>
      <span className={s.coinDetailTitle}>
      {coinDetails[props.coinId]['Stablecoin Project']}
      </span>
    </div>
    <div>
      {shownDetails.map(field => (
        <div>
          <span>{field}:</span>
          <span>{coinDetails[props.coinId][field]}</span>
        </div>
      ))}
    </div>
  </div>
)

const mapState = state => ({});

const mapDispatch = {};

export default connect(mapState, mapDispatch)(withStyles(s)(Coins));
