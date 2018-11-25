/* eslint-env jest */
/* eslint-disable padded-blocks, no-unused-expressions */


import moment, { fn as momentProto } from 'moment'
import sequelize from '../data/sequelize';
import CoinHistory from '../data/models/CoinHistory';
import CoinMarketCapDatafiller from './dataFiller'
import chai from 'chai';
import sinon from 'sinon';
import request from 'request-promise';
import _ from 'lodash';
import chaiAsPromised from "chai-as-promised";

chai.use(chaiAsPromised);
const assert = chai.assert,
  expect = chai.expect,
  should = chai.should;
chai.should();



const sandbox = sinon.createSandbox();
let requestGetStub, sleepStub;
const getRequestMock1 = {mock: 'iamamock'};
let datafiller = new CoinMarketCapDatafiller();
const coinResponseMock2 = {"volume_usd": [[1542491040000, 8888], [1542491940000, 888]], "market_cap_by_available_supply": [[1542491040000, 75809851454], [1542491940000, 75809851455]], "price_usd": [[1542491040000, 5559.36], [1542491940000, 5551.75]]};
const mockFormattedCoinData = [
  {
    coin_id: 'bitcoin',
    price: 5559.36,
    market_cap: 75809851454,
    timestamp: '2018-11-17T21:44:00.000Z',
    volume: 8888
  },
  {
    coin_id: 'bitcoin',
    price: 5551.75,
    market_cap: 75809851455,
    timestamp: '2018-11-17T21:59:00.000Z',
    volume: 888
  }
];

describe('data filler', () => {
  beforeEach(() => {
    requestGetStub = sandbox.stub(request, 'get');
    sleepStub = sandbox.stub(datafiller, 'sleep')
  });

  afterEach((done) => {
    sandbox.restore()
    // http://docs.sequelizejs.com/en/v3/docs/raw-queries/
    // https://www.postgresql.org/docs/9.3/static/sql-truncate.html
    // DEV: PostgreSQL doesn't support truncating all tables via a `*`
    // DEV: Our query is vulnerable to SQL injection but we can't use bind and trust our table names more/less
    var tableNames = _.map(_.values(sequelize.models), model=>model.tableName);
    sequelize.query('TRUNCATE TABLE ' + tableNames.join(', ')).asCallback(done);
  });

  it('formats date pairs for coinmarketcap.com', () => {
    const input = [[1542864024, 1542864029]];
    const expected = [[1542864024000, 1542864029000]];
    const output = datafiller.formatListOfDatePairsForCoinMarketCap(input);
    expect(output).to.deep.equal(expected)
  });

  it('fetches live coins only', ()=>{
    const input = {
      "dai": {
        "id": "dai",
        "Stablecoin Project": "DAI",
        "Company": "MakerDao",
        "Backers": "Andreesen Horowitz, Polychain, FBG Capital",
        "Founders": "Rune Christensen",
        "Website": "https://makerdao.com/",
        "Whitepaper": "https://makerdao.com/whitepaper/",
        "Stability Method": "Crypto Collateralized",
        "isLive": true,
        "coinMarketCapId": "dai",
        "liveDate": "Tue Dec 26 2017 17:34:17 GMT-0800",
        "Description":
          "MakerDao is well known to be one of the earliest market competitors, with a strong community presence. You can find their founders and developers frequently participating on their subreddit, r/MakerDao."
      },
      "basis": {
        "id": "basis",
        "Stablecoin Project": "Basis",
        "Company": "Intangible Labs",
        "Backers":
          "Lightspeed, Andreesen Horowitz, Google Ventures, Foundation Capital",
        "Founders": "Nader Al-Naji, Lawrence Diao, Josh Chen",
        "Website": "https://basis.io",
        "Whitepaper": "https://www.basis.io/basis_whitepaper_en.pdf",
        "Stability Method": "Algorithmic Central Bank",
        "isLive": false,
        "coinMarketCapId": null,
        "liveDate": null,
        "Description":
          "With some of the strongest VC backing and an enormous funding round of $133M, Basis comes in as a strong competitor to the stablecoin market. This puts them significantly ahead the other algorithmic central bank competitors."
      }
    }

    const expected = [{
      "id": "dai",
      "Stablecoin Project": "DAI",
      "Company": "MakerDao",
      "Backers": "Andreesen Horowitz, Polychain, FBG Capital",
      "Founders": "Rune Christensen",
      "Website": "https://makerdao.com/",
      "Whitepaper": "https://makerdao.com/whitepaper/",
      "Stability Method": "Crypto Collateralized",
      "isLive": true,
      "coinMarketCapId": "dai",
      "liveDate": "Tue Dec 26 2017 17:34:17 GMT-0800",
      "Description":
        "MakerDao is well known to be one of the earliest market competitors, with a strong community presence. You can find their founders and developers frequently participating on their subreddit, r/MakerDao."
    }]

    const output = datafiller.fetchLiveCoins(input);
    expect(output).to.deep.equal(expected);
  });

  it('creates an appropriate list of date pairs with perfect days', () => {
    sandbox.useFakeTimers()
    sandbox.clock.tick(moment('2018-11-23 07:49:00+00').unix() * 1000);
    const input = '2018-11-20 07:49:00+00';
    const inputEpoch = moment(input).unix() * 1000;
    const expectedEpoch = moment('2018-11-23 07:49:00+00').unix() *1000;
    const expected = [
      [inputEpoch, inputEpoch+86400000],
      [inputEpoch+86400000, inputEpoch+86400000*2],
      [inputEpoch+86400000*2, expectedEpoch],
    ];
    const output = datafiller.fetchListOfRemainingDatesToQuery(input)
    expect(output).to.deep.equal(expected);
  });

  it('creates an appropriate list of date pairs with non perfect days', () => {
    sandbox.useFakeTimers()
    const fixedCurrentTime = '2018-11-23 06:49:00+00';
    sandbox.clock.tick(moment(fixedCurrentTime).unix() * 1000);
    const input = '2018-11-20 07:49:00+00';
    const inputEpoch = moment(input).unix() * 1000;
    const expectedEpoch = moment(fixedCurrentTime).unix() *1000;
    const expected = [
      [inputEpoch, inputEpoch+86400000],
      [inputEpoch+86400000, inputEpoch+86400000*2],
      [inputEpoch+86400000*2, expectedEpoch],
    ];
    const output = datafiller.fetchListOfRemainingDatesToQuery(input)
    expect(output).to.deep.equal(expected);
  });

  it('constructs coinmarketcaps url correctly', () => {
    let expected = 'https://graphs2.coinmarketcap.com/currencies/tether/12121/12121/';
    const output = datafiller.coinMarketCapHistoryUrl('tether', 12121, 12121);
    expect(output).to.equal(expected);
  });

  it('calls get requests properly', async () => {
    requestGetStub.returns(getRequestMock1);
    const resp = await datafiller.requestToCoinmarketcapWithRetry('euhfeuhihf');
    expect(resp).to.deep.equal(getRequestMock1);
  });

  it('calls retries get requests properly', async () => {
    requestGetStub.onFirstCall().throws({tada:'here i am'});
    requestGetStub.onSecondCall().returns(getRequestMock1);
    sleepStub.resolves(true);
    const resp = await datafiller.requestToCoinmarketcapWithRetry('euhfeuhihf');
    expect(resp).to.deep.equal(getRequestMock1);
  });

  it('calls retries get requests properly', async () => {
    requestGetStub.onFirstCall().throws({tada:'here i am'});
    requestGetStub.onSecondCall().returns(getRequestMock1);
    sleepStub.resolves(true);
    const resp = await datafiller.requestToCoinmarketcapWithRetry('euhfeuhihf');
    expect(resp).to.deep.equal(getRequestMock1);
  });

  it('follows retry-after headers when get requests 429', async () => {
    requestGetStub.onFirstCall().throws({response: {statusCode: 429, headers: {'retry-after': 89}}});
    requestGetStub.onSecondCall().returns(getRequestMock1);
    sleepStub.resolves(true);
    const resp = await datafiller.requestToCoinmarketcapWithRetry('euhfeuhihf');
    sinon.assert.calledWith(sleepStub, 89+datafiller.REQUEST_DELAY);
    expect(resp).to.deep.equal(getRequestMock1);
  });

  it('properly queries coin market cap for price history', async () => {
    const getUrlStub = sandbox.stub(datafiller, 'coinMarketCapHistoryUrl');
    const coinMarketCapRequestStub = sandbox.stub(datafiller, 'requestToCoinmarketcapWithRetry');
    const inputCoin = 'bitcoin';
    const inputDate1 = 1542491040000;
    const inputDate2 = 1543095840000;

    let expectedUrl = 'https://graphs2.coinmarketcap.com/currencies/bitcoin/1542491040000/1543095840000/';
    getUrlStub.returns(expectedUrl);
    coinMarketCapRequestStub.resolves(coinResponseMock2);
    const output = await datafiller.queryCoinMarketCapForDatePair(inputCoin, inputDate1, inputDate2);
    expect(output).to.deep.equal(mockFormattedCoinData);
  });

  it('makes a request for every input date pair', async () => {
    sleepStub.resolves(true);
    const coinMarketCapRequestStub = sandbox.stub(datafiller, 'queryCoinMarketCapForDatePair');
    coinMarketCapRequestStub.resolves(mockFormattedCoinData);
    const inputCoin = 'bitcoin';
    const inputDate1 = 1542491040000;
    const inputDate2 = 1543095840000;

    const output = await datafiller.requestCoinmarketcapForDateList(inputCoin, [[inputDate1, inputDate2], [inputDate1, inputDate2]]);

    expect(output).to.deep.equal([...mockFormattedCoinData, ...mockFormattedCoinData]);
  });

  it('batch writes coin history data correctly', async () => {
    const output = await datafiller.batchWriteCoinHistory(mockFormattedCoinData);
    const writtenCoins = await CoinHistory.findAll();
    expect(writtenCoins[0].coin_id).to.equal(mockFormattedCoinData[0].coin_id);
    expect(writtenCoins[1].coin_id).to.equal(mockFormattedCoinData[1].coin_id);
    expect(writtenCoins[0].price).to.equal(mockFormattedCoinData[0].price);
    expect(writtenCoins[1].price).to.equal(mockFormattedCoinData[1].price);
    expect(writtenCoins[0].timestamp.toISOString()).to.equal(mockFormattedCoinData[0].timestamp);
    expect(writtenCoins[1].timestamp.toISOString()).to.equal(mockFormattedCoinData[1].timestamp);
  })

  it('errors writing bad coin history data', () => {
    return Promise.all([
      datafiller.batchWriteCoinHistory([{volume: 12093812, market_cap: 124341, coin_id: null, price: 12, timestamp: moment().toISOString()}]).should.be.rejected,
      datafiller.batchWriteCoinHistory([{volume: 12093812, market_cap: 124341, coin_id: 'bitconneeect', price: null, timestamp: moment().toISOString()}]).should.be.rejected,
      datafiller.batchWriteCoinHistory([{volume: 12093812, market_cap: 124341, coin_id: 'bitconneeect', price: 12, timestamp: null}]).should.be.rejected,
      datafiller.batchWriteCoinHistory([{volume: 12093812, market_cap: 124341, coin_id: 'bitconneeect', price: 12, timestamp: '0injfne'}]).should.be.rejected,
      datafiller.batchWriteCoinHistory([{volume: 12093812, market_cap: null, coin_id: 'bitconneeect', price: 12, timestamp: moment().toISOString()}]).should.be.rejected,
      datafiller.batchWriteCoinHistory([{volume: null, market_cap: 1209381029, coin_id: 'bitconneeect', price: 12, timestamp: moment().toISOString()}]).should.be.rejected,
    ]);
  })
});
