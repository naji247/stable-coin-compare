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
import s from './StablecoinPrimer.css';
import { connect } from 'react-redux';
import bitcoinChart from './bitcoin_chart.png';
import Fade from 'react-reveal/Fade';

class StablecoinPrimer extends React.Component {
  render() {
    return (
      <div className={s.root}>
        <div className={s.container}>
          <Fade left>
            <div className={s.images}>
              <h3 className={s.chartTitle}> Price Depreciation of Bitcoin</h3>
              <div className={s.imageWrapper}>
                <img
                  src={bitcoinChart}
                  alt="bitcoin price chart"
                  className={s.horizImage}
                />
              </div>
            </div>
          </Fade>

          <div className={s.text}>
            <Fade bottom>
              <div>
                <h2 className={s.header}>Why Stable Coins?</h2>
                All of the decentralization benefits of cryptocurrencies with an
                algorithmically maintained peg to the US dollar for monetary
                stability. This mitigates the risk of depreciation that has
                prevented other cryptocurrencies from being effective stores of
                wealth.
              </div>
            </Fade>
          </div>
        </div>
      </div>
    );
  }
}

export default withStyles(s)(StablecoinPrimer);
