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
import s from './About.css';
import { getPrices } from '../../actions/runtime';
import { connect } from 'react-redux';

class About extends React.Component {
  componentDidMount() {
    this.props.getPrices();
  }
  render() {
    return (
      <div className={s.root}>
        <div className={s.container}>
          <h2 className={s.aboutHeader}>About SCX</h2>
          <p className={s.aboutText}>
            SCX is an analytics platform that seeks to help users of Stable
            Coins understand how successful each stability protocol is at
            maintaining their fixed price. We do so by aggregating data on price
            movements from multiple sources and computing stability metrics from
            them to show how Stable Coins compare among themselves and across
            asset classes. This way, users of Stable Coins can better understand
            which protocols are the most effective and the risks associated with
            holding them.
          </p>
          <h2 className={s.aboutHeader}>About Stable Coins</h2>
          <p className={s.aboutText}>
            Stable Coins are a category of cryptocurrencies that take advantage
            of decentralization but aim to reduce price volatility. Stable Coins
            maintain a fixed exchange rate with existing currencies like the
            dollar so that they can be a viable store of wealth and a more
            reliable medium of transaction. Each Stable Coin is implemented
            differently with its own mechanism to maintain the peg which results
            in varying levels of success in achieving the goal of stability.
          </p>
        </div>
      </div>
    );
  }
}

const mapState = state => ({
  ...state.price,
});

const mapDispatch = {
  getPrices,
};

export default connect(mapState, mapDispatch)(withStyles(s)(About));
