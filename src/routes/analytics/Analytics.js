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
import { connect } from 'react-redux';
import { APP_URL } from '../../secrets';
import Navbar from '../../components/Navbar';
import _ from 'lodash';
import { Chart } from 'react-charts';
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
    this.state = { selectedCoinId: null, chartType: 'bar', sortBy: 'score' };
  }

  handleCoinSelect(coinId) {
    if (coinId === this.state.selectedCoinId) {
      this.setState({ ...this.state, selectedCoinId: null });
    } else {
      this.setState({ ...this.state, selectedCoinId: coinId });
    }
  }
  handleSortByChange(sortBy) {
    if (sortBy != this.state.sortBy) {
      this.setState({ ...this.state, sortBy: sortBy });
    }
  }
  handleChartTypeChange(chartType) {
    if (chartType != this.state.chartType) {
      this.setState({ ...this.state, chartType: chartType });
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
              <div className={s.innerCardContainer}>
                <div className={s.optionsPanel}>
                  <div className={s.optionTitle}> Sort: </div>
                  <div
                    className={`${s.optionButton} ${
                      this.state.sortBy == 'score' ? s.selectedButton : ''
                    }`}
                    onClick={() => this.handleSortByChange('score')}
                  >
                    Score
                  </div>
                  <div
                    className={`${s.optionButton} ${
                      this.state.sortBy == 'cap' ? s.selectedButton : ''
                    }`}
                    onClick={() => this.handleSortByChange('cap')}
                  >
                    Cap
                  </div>
                  <div
                    className={`${s.optionButton} ${
                      this.state.sortBy == 'volume' ? s.selectedButton : ''
                    }`}
                    onClick={() => this.handleSortByChange('volume')}
                  >
                    Volume
                  </div>
                </div>
              </div>
              <div className={s.innerCardContainer}>
                {_.keys(coinData).map(coinId => (
                  <Card
                    coinId={coinId}
                    isActive={coinId === this.state.selectedCoinId}
                    onClick={() => this.handleCoinSelect(coinId)}
                    sortBy={this.state.sortBy}
                  />
                ))}
              </div>
            </div>
            <div className={s.chartSection}>
              <div className={s.chartOptionsContainer}>
                <div className={s.optionsPanel}>
                  <div className={s.optionTitle}> Chart: </div>
                  <div
                    className={`${s.optionButton} ${
                      this.state.chartType == 'bar' ? s.selectedButton : ''
                    }`}
                    onClick={() => this.handleChartTypeChange('bar')}
                  >
                    Bar
                  </div>
                  <div
                    className={`${s.optionButton} ${
                      this.state.chartType == 'line' ? s.selectedButton : ''
                    }`}
                    onClick={() => this.handleChartTypeChange('line')}
                  >
                    Line
                  </div>
                </div>
              </div>
              <div className={s.chartContainer}>
                <div className={s.chartArea}>
                  <Chart
                    data={[
                      {
                        label: 'Score',
                        data: _.map(_.values(coinData), singleCoinData => [
                          singleCoinData.name,
                          singleCoinData.score
                        ])
                      }
                    ]}
                    series={{ type: 'bar' }}
                    axes={[
                      { primary: true, type: 'ordinal', position: 'bottom' },
                      { position: 'left', type: 'linear', stacked: true }
                    ]}
                    tooltip
                    dark
                  />
                </div>
              </div>
              <CoinDescription coinId={this.state.selectedCoinId} />
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
          <h3
            className={`${s.datumLabel} ${
              props.sortBy == 'score' ? s.activeDatumLabel : ''
            }`}
          >
            Score
          </h3>
          <h4
            className={`${s.datumValue} ${
              props.sortBy == 'score' ? s.activeDatum : ''
            }`}
          >
            {coinData[props.coinId].score}
          </h4>
        </div>
        <div className={s.datum}>
          <h3
            className={`${s.datumLabel} ${
              props.sortBy == 'cap' ? s.activeDatumLabel : ''
            }`}
          >
            Cap
          </h3>
          <h4
            className={`${s.datumLabel} ${
              props.sortBy == 'cap' ? s.activeDatum : ''
            }`}
          >
            {coinData[props.coinId].cap}
          </h4>
        </div>
        <div className={s.datum}>
          <h3
            className={`${s.datumLabel} ${
              props.sortBy == 'volume' ? s.activeDatumLabel : ''
            }`}
          >
            Volume
          </h3>
          <h4
            className={`${s.datumLabel} ${
              props.sortBy == 'volume' ? s.activeDatum : ''
            }`}
          >
            {coinData[props.coinId].volume}
          </h4>
        </div>
      </div>
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
const CoinDescription = props => {
  if (!props.coinId) return null;
  else {
    return (
      <div className={s.descriptionSection}>
        <div className={s.descriptionTitle}>
          <img
            className={s.descriptionTitleImg}
            src={coinLogos[`${props.coinId}.png`]}
            alt={props.coinId}
          />
          <h2 className={s.descriptionTitleText}>
            {coinData[props.coinId].name}
          </h2>
        </div>
        {shownDetails.map(field => (
          <div className={s.fieldEntry}>
            <span className={s.fieldKey}>{field}:</span>
            <span className={s.fieldValue}>
              {coinDetails[props.coinId][field]}
            </span>
          </div>
        ))}
      </div>
    );
  }
};

const mapState = state => ({});

const mapDispatch = {};

export default connect(
  mapState,
  mapDispatch
)(withStyles(s)(Analytics));
