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
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from 'recharts';
import * as coinDetails from '../../stablecoinInfo';
import { getLatest } from '../../actions/runtime';
import numeral from 'numeral';
import classNames from 'classnames';
import history from '../../history';
import { COIN_IDS, CoinMarketCapWidget, EmailSignUp } from '../home/Home';
import { RingLoader } from 'react-spinners';

const DROP_LIST = ['steem-dollars', 'white-standard', 'bridgecoin'];

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

  componentWillMount() {
    var activeCoinDetails = _.filter(coinDetails, 'isLive');
    activeCoinDetails = _.filter(
      activeCoinDetails,
      activeCoin => DROP_LIST.indexOf(activeCoin.id) == -1
    );
    const coinIds = _.map(activeCoinDetails, 'id');
    this.props.getLatest(coinIds);
  }

  componentDidMount() {}

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

    const sortByLabels = {
      avg_deviation: 'Average Deviation',
      market_cap: 'Market Cap',
      volume: 'Volume'
    };

    return (
      <div className={s.gradientLayer}>
        <Navbar background="translucent" />
        <div className={s.root}>
          <div>
            <div className={s.titleContainer}>
              <h1 className={s.titleText}>Analytics</h1>
            </div>
            {!this.props.loading ? (
              <div className={s.contentContainer}>
                <div className={s.cardContainer}>
                  <div className={s.innerCardContainer}>
                    <div className={s.optionsPanel}>
                      <div className={s.optionTitle}> Sort:</div>
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
                          this.state.sortBy == 'market_cap'
                            ? s.selectedButton
                            : ''
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
                        isActive={
                          coinDatum.coin_id === this.state.selectedCoinId
                        }
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
                    {/* <div className={s.optionsPanel}>
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
                </div> */}
                    <div className={s.optionsPanelEmpty} />
                  </div>
                  <div className={s.chartContainer}>
                    <h2 className={s.chartTitle}>
                      {sortByLabels[this.state.sortBy]}
                    </h2>
                    <div className={s.chartArea}>
                      <ResponsiveContainer>
                        <BarChart
                          data={coinData.map(coinDatum => {
                            var tmp = {
                              name: coinDatum.name
                            };
                            tmp[
                              sortByLabels[this.state.sortBy]
                            ] = formatAvgDeviation(
                              coinDatum[this.state.sortBy]
                            );
                            return tmp;
                          })}
                          margin={{ top: 20, bottom: 45 }}
                        >
                          <XAxis
                            dataKey="name"
                            stroke="#f4f4f4"
                            fontSize="0.6em"
                            interval={0}
                            tick={<CustomizedAxisTick />}
                          />
                          <YAxis
                            stroke="#f4f4f4"
                            fontSize="0.7em"
                            width={this.state.sortBy != 'avg_deviation' ? 60 : 45}
                            tickFormatter={
                              this.state.sortBy == 'avg_deviation'
                                ? formatAvgDeviation
                                : formatVolCap
                            }
                          />
                          <Tooltip
                            cursor={false}
                            content={
                              <CustomizedTooltip sortBy={this.state.sortBy} />
                            }
                          />
                          <Bar
                            dataKey={sortByLabels[this.state.sortBy]}
                            fill="#00A5CF"
                          />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                  <CoinDescription coinId={this.state.selectedCoinId} />
                </div>
              </div>
            ) : (
              <div className={s.loadingContainer}>
                <RingLoader color={'#061316'} size={90} />
              </div>
            )}
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
            Deviation
          </h3>
          <h4
            className={`${s.datumValue} ${
              props.sortBy == 'avg_deviation' ? s.activeDatumDeviation : ''
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
              props.sortBy == 'market_cap' ? s.activeDatumDollar : ''
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
              props.sortBy == 'volume' ? s.activeDatumDollar : ''
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

function formatByState(state) {
  if (state == 'avg_deviation') return formatAvgDeviation;
  else return formatVolCap;
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
            {coinDetails[props.coinId]['Stablecoin Project']}
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

class CustomizedAxisTick extends React.Component {
  render() {
    const { x, y, stroke, payload } = this.props;

    return (
      <g transform={`translate(${x},${y})`}>
        <text
          x={0}
          y={0}
          dy={10}
          textAnchor="end"
          fill="#f4f4f4"
          fontSize="0.6em"
          transform="rotate(-35)"
        >
          {payload.value}
        </text>
      </g>
    );
  }
}

class CustomizedTooltip extends React.Component {
  render() {
    const { active } = this.props;

    if (active) {
      const { payload, label, sortBy } = this.props;

      let value;
      if (sortBy == 'avg_deviation')
        value = formatAvgDeviation(payload[0].value);
      else value = formatVolCap(payload[0].value);

      return (
        <div className={s.tooltip}>
          <p>{label}</p>
          <p>{`${payload[0].dataKey} : ${value}`}</p>
        </div>
      );
    }
    return null;
  }
}

const mapState = state => ({ ...state.analytics });

const mapDispatch = {
  getLatest
};

export default connect(
  mapState,
  mapDispatch
)(withStyles(s)(Analytics));
