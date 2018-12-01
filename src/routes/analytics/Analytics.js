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
import { getLatest } from '../../actions/runtime';
import numeral from 'numeral';
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

class Analytics extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedCoinId: null,
      chartType: 'bar',
      sortBy: 'avg_deviation'
    };
  }

  componentDidMount() {
    const activeCoinDetails = _.filter(coinDetails, 'isLive');
    const coinIds = _.map(activeCoinDetails, 'id');
    this.props.getLatest(coinIds);
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
    var coinData = _.map(this.props.analytics, elem => ({
      ...elem,
      name: coinDetails[elem.coin_id]['Stablecoin Project']
    }));

    coinData = _.orderBy(
      coinData,
      this.state.sortBy,
      this.state.sortBy == 'avg_deviation' ? 'asc' : 'desc'
    );

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
                      this.state.sortBy == 'avg_deviation'
                        ? s.selectedButton
                        : ''
                    }`}
                    onClick={() => this.handleSortByChange('avg_deviation')}
                  >
                    Deviation
                  </div>
                  <div
                    className={`${s.optionButton} ${
                      this.state.sortBy == 'market_cap' ? s.selectedButton : ''
                    }`}
                    onClick={() => this.handleSortByChange('market_cap')}
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
                {coinData.map(coinDatum => (
                  <Card
                    coinId={coinDatum.coin_id}
                    isActive={coinDatum.coin_id === this.state.selectedCoinId}
                    onClick={() => this.handleCoinSelect(coinDatum.coin_id)}
                    sortBy={this.state.sortBy}
                    name={coinDatum.name}
                    avgDeviation={coinDatum.avg_deviation}
                    marketCap={coinDatum.market_cap}
                    volume={coinDatum.volume}
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
                        data: coinData.map(coinDatum => [
                          coinDatum.name,
                          coinDatum.avg_deviation
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
        <h2 className={s.cardTitleText}>{props.name}</h2>
      </div>
      <div className={s.dataContainer}>
        <div className={s.datum}>
          <h3
            className={`${s.datumLabel} ${
              props.sortBy == 'avg_deviation' ? s.activeDatumLabel : ''
            }`}
          >
            Avg Deviation
          </h3>
          <h4
            className={`${s.datumValue} ${
              props.sortBy == 'avg_deviation' ? s.activeDatum : ''
            }`}
          >
            {formatAvgDeviation(props.avgDeviation)}
          </h4>
        </div>
        <div className={s.datum}>
          <h3
            className={`${s.datumLabel} ${
              props.sortBy == 'market_cap' ? s.activeDatumLabel : ''
            }`}
          >
            Cap
          </h3>
          <h4
            className={`${s.datumLabel} ${
              props.sortBy == 'market_cap' ? s.activeDatum : ''
            }`}
          >
            {formatVolCap(props.marketCap)}
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
            {formatVolCap(props.volume)}
          </h4>
        </div>
      </div>
    </div>
  </div>
);

function formatAvgDeviation(x) {
  return Number.parseFloat(x).toFixed(0);
}

function formatVolCap(x) {
  return numeral(x)
    .format('$0a')
    .toString()
    .toUpperCase();
}

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
            {coinDetails[props.coinId].name}
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

const mapState = state => ({ ...state.analytics });

const mapDispatch = {
  getLatest
};

export default connect(
  mapState,
  mapDispatch
)(withStyles(s)(Analytics));
