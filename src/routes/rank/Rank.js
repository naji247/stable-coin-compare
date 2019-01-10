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
import s from './Rank.css';
import { connect } from 'react-redux';
import { APP_URL } from '../../secrets';
import Navbar from '../../components/Navbar';
import _ from 'lodash';
import request from 'request-promise';
import * as coinDetails from '../../stablecoinInfo';
import { getLatest } from '../../actions/runtime';
import numeral from 'numeral';
import { RingLoader } from 'react-spinners';
import logoUrl from './stablerank_logo.png';

const DROP_LIST = ['steem-dollars', 'white-standard', 'bridgecoin'];

function formatAvgDeviation(x) {
  return (
    Number.parseFloat(x / 100)
      .toFixed(2)
      .toString() + '¢'
  );
}

function formatVolCap(x) {
  if (x >= 1e9) {
    return numeral(x)
      .format('$0.0a')
      .toString()
      .toUpperCase();
  } else {
    return numeral(x)
      .format('$0a')
      .toString()
      .toUpperCase();
  }
}

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

class Rank extends React.Component {
  componentWillMount() {
    var activeCoinDetails = _.filter(coinDetails, 'isLive');
    activeCoinDetails = _.filter(
      activeCoinDetails,
      activeCoin => DROP_LIST.indexOf(activeCoin.id) == -1
    );
    const coinIds = _.map(activeCoinDetails, 'id');
    this.props.getLatest(coinIds);
  }

  render() {
    console.log(this.props);

    var coinData = _.map(this.props.analytics, elem => ({
      ...elem,
      name: coinDetails[elem.coin_id]['Stablecoin Project']
    }));

    var avg_deviation_list = _.orderBy(coinData, 'avg_deviation', 'asc');
    var market_cap_list = _.orderBy(coinData, 'market_cap', 'desc');
    var volume_list = _.orderBy(coinData, 'volume', 'desc');

    return (
      <div className={s.root}>
        <div className={s.gradientLayer}>
          <div className={s.navBar}>
            <a href="/">
              <img src={logoUrl} alt="Logo" className={s.logo} />
              Stablecoin Rank
            </a>
          </div>
          {!this.props.loading ? (
            <div>
              <div className={s.contentContainer}>
                <RankingSection rankBy="market_cap" data={market_cap_list} />
                <RankingSection
                  rankBy="avg_deviation"
                  data={avg_deviation_list}
                />
                <RankingSection rankBy="volume" data={volume_list} />
              </div>
              <div className={s.footer}>
                This site is powered by{' '}
                <a href="stablecoincompare.com">Stablecoin Compare</a>
              </div>
            </div>
          ) : (
            <div className={s.loadingContainer}>
              <RingLoader color={'#F4F4F4'} size={75} />
            </div>
          )}
        </div>
      </div>
    );
  }
}

const RankingSection = props => {
  const bestCoin = props.data[0];
  var headerText;
  var labelText;
  var formatFunc;
  switch (props.rankBy) {
    case 'avg_deviation':
      headerText = 'Most Stable';
      labelText = 'Average Deviation: ';
      formatFunc = formatAvgDeviation;
      break;
    case 'market_cap':
      headerText = 'Largest Market Cap';
      labelText = 'Market Cap: ';
      formatFunc = formatVolCap;
      break;
    case 'volume':
      headerText = 'Most Volume';
      labelText = 'Volume: ';
      formatFunc = formatVolCap;
      break;
  }
  console.log(bestCoin);
  return (
    <div
      className={`${s.rankingContainer} ${
        props.rankBy != 'avg_deviation' ? s.topMargin : ''
      }`}
    >
      <h1>{headerText}</h1>
      <img className={s.bestImg} src={coinLogos[`${bestCoin.coin_id}.png`]} />
      <h2> {bestCoin.name}</h2>
      <h3>
        {labelText} {formatFunc(bestCoin[props.rankBy])}{' '}
      </h3>

      <table className={s.rankTable}>
        {_.map(props.data, (coin, idx) => (
          <tr className={s.tableRow}>
            <td className={s.rankCell}>{idx + 1}</td>
            <td className={s.nameCell}>
              <img
                className={s.rankImg}
                src={coinLogos[`${coin.coin_id}.png`]}
              />
              {coin.name}
            </td>
            <td className={s.amountCell}>{formatFunc(coin[props.rankBy])}</td>
          </tr>
        ))}
      </table>
    </div>
  );
};

const mapState = state => ({ ...state.analytics });

const mapDispatch = {
  getLatest
};

export default connect(
  mapState,
  mapDispatch
)(withStyles(s)(Rank));
