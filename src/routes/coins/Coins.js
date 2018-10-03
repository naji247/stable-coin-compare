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
import * as coinDetails from '../../stablecoinInfo'

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
  render() {
    return (
      <Element>
        <Navbar />
        <div className={s.container}>
          <h1>Coins</h1>
          <div className={s.coinDetailsContainer}>
            <div className={s.coinSelectContainer}>
              {_.keys(coinDetails).map(coinId =>
                <div className={s.coinSelect}>
                  <img key={coinId} src={coinLogos[`${coinId}.png`]} className={s.coinLogo} alt={coinId} />
                  <span className={s.coinName}>{coinDetails[coinId]["Stablecoin Project"]}</span>
                </div>
              )}
            </div>
            <div className={s.coinDetails}>
              <p>Select a coin from the left.</p>
            </div>
          </div>
        </div>
      </Element>
    );
  }
}

const mapState = state => ({});

const mapDispatch = {};

export default connect(mapState, mapDispatch)(withStyles(s)(Coins));
