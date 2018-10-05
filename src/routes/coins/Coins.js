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
import history from '../../history'

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
    (coinId === this.props.selectedCoinId) ? history.push('/coins') : history.push(`/coins/${coinId}`);
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
                  isActive={coinId === this.props.selectedCoinId}
                  onClick={() => this.handleCoinSelect(coinId)}
                  coinId={coinId}
                />
              ))}
            </div>
            <div className={s.coinDetails}>
              {/*TODO: Adding coin details sections*/}
              {!this.props.selectedCoinId ? <p>Select a coin from the left.</p> :
                <CoinDetails coinId={this.props.selectedCoinId} />}
            </div>
          </div>
        </div>
      </Element>
    );
  }
}

const CoinSelector = props => (
  <div onClick={props.onClick} className={props.isActive ? s.coinSelectActive : s.coinSelect}>
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
      <span className={s.coinName}>
      {coinDetails[props.coinId]['Stablecoin Project']}
    </span>
    </div>
  </div>
);

const shownDetails = ['Founders', 'Company', 'Backers', 'Stability Method', 'Short Description']
const CoinDetails = props => (
  <div className={s.coinDetailsWrapper}>
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
    </div>
    <div className={s.fieldContainer}>
      {shownDetails.map(field => (
        <div className={s.fieldEntry}>
          <span className={s.fieldKey}>{field}:</span>
          <span className={s.fieldValue}>{coinDetails[props.coinId][field]}</span>
        </div>
      ))}
    </div>
  </div>
)

const mapState = state => ({});

const mapDispatch = {};

export default connect(mapState, mapDispatch)(withStyles(s)(Coins));
