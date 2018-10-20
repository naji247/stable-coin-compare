import withStyles from 'isomorphic-style-loader/lib/withStyles';
import React from 'react';
import s from './About.css';
import { connect } from 'react-redux';
import { Element } from 'react-scroll';
import _ from 'lodash';
import Navbar from '../../components/Navbar';
import algorithmicImg from './algorithmic.jpg';

class About extends React.Component {
  constructor(props) {
    super(props);
    this.state = { methodologyType: null };
  }
  selectMethodology(methodology) {
    if (this.state.methodologyType == methodology) {
      this.setState({ methodologyType: null });
    } else this.setState({ methodologyType: methodology });
  }

  render() {
    return (
      <div>
        <Navbar />
        <div className={s.container}>
          <div className={s.sectionContainer}>
            <h1 className={s.sectionHeader}>What is a Stablecoin?</h1>
            <div className={s.definitionWrapper}>
              <p className={s.definitionStart}>
                Stablecoin - /'stā-bəl-kȯin/ (n.) -
              </p>
              <p className={s.definitionText}>
                A class of cryptocurrencies that aim to maintain a constant
                value with respect to an existing currency (e.g. the dollar).
              </p>
            </div>
            <span className={s.threeDots}>* * *</span>
          </div>
          <div className={s.sectionContainer}>
            <h1 className={s.sectionHeader}>Why Stablecoins?</h1>
            <p className={s.overview}>
              The case for stablecoins is the same as the case for all
              cryptocurrencies: to decentralize the medium of transaction and
              eliminate the reliance on centralized financial institutions. By
              eliminating the price volatility that is endemic in other
              cryptocurrencies, stablecoins allow users to take full advantage
              of the blockchain without taking on the substantial risk of
              depreciation.
            </p>
            <span className={s.threeDots}>* * *</span>
          </div>
          <div className={s.sectionContainer}>
            <h1 className={s.sectionHeader}>How Do They Work?</h1>
            <p className={s.methodologyCardsPreText}>
              Price stabilization is achieved using one of these three major
              methods.
            </p>
            <p className={s.methodologyCardsPreText}>
              Choose one of the following to read more:
            </p>
            <div className={s.methodologyCardsContainer}>
              <div
                onClick={() => {
                  this.selectMethodology('fiat');
                }}
                className={s.methodologyCard}
              >
                <div
                  className={`${s.opacityLayer} ${
                    this.state.methodologyType == 'fiat' ? s.darkerOpacity : ''
                  }`}
                >
                  <h2 className={s.methodologyCardText}>
                    Fiat<br />Collateralized
                  </h2>
                </div>
              </div>
              <div
                onClick={() => {
                  this.selectMethodology('crypto');
                }}
                className={s.methodologyCard}
              >
                <div
                  className={`${s.opacityLayer} ${
                    this.state.methodologyType == 'crypto'
                      ? s.darkerOpacity
                      : ''
                  }`}
                >
                  <h2 className={s.methodologyCardText}>
                    Crypto<br />Collateralized
                  </h2>
                </div>
              </div>
              <div
                onClick={() => {
                  this.selectMethodology('algorithmic');
                }}
                className={s.methodologyCard}
              >
                <div
                  className={`${s.opacityLayer} ${
                    this.state.methodologyType == 'algorithmic'
                      ? s.darkerOpacity
                      : ''
                  }`}
                >
                  <h2 className={s.methodologyCardText}>
                    Algorithmic<br />Central<br />Bank
                  </h2>
                </div>
              </div>
            </div>
            <MethodologyDesc methodologyType={this.state.methodologyType} />
            <span className={s.threeDots}>* * *</span>
          </div>
        </div>
      </div>
    );
  }
}

const MethodologyDesc = props => {
  var content = null;
  if (!props.methodologyType) {
    content = null;
  } else if (props.methodologyType == 'fiat') {
    content = (
      <div className={s.methodologyDescContainer}>
        <div className={s.methodogyExplainContainer}>
          <h3 className={s.methodologyContentHeader}>
            Stabilization Mechanism:
          </h3>
          <p className={s.methodologyContentText}>
            For every dollar of stablecoin in existence, there is a dollar of
            fiat backing it held in reserve by the organization that operates
            the stablecoin. When a user wants to exchange their fiat dollar for
            a dollar of stablecoin, the fiat dollar will be deposited into a
            bank account where it will reside until the user wants to exchange
            the stablecoin dollar back for a fiat dollar.
          </p>
        </div>
        <div className={s.advDisadvContainer}>
          <h3 className={s.methodologyContentHeader}>Advantages</h3>
          <p className={s.methodologyContentText}>
            <b>Minimal Technology Risk: </b> These projects are not exactly
            reinventing the wheel when it comes to crypto technology, so there
            are fewer things that can go wrong.
          </p>
          <p className={s.methodologyContentText}>
            <b>Straightforward Economics:</b> The economics are no more
            complicated than the token system at Chuck-E-Cheese's which even
            five year olds can understand.
          </p>
          <h3 className={s.methodologyContentHeader}>Disadvantages</h3>
          <p className={s.methodologyContentText}>
            <b>Centralization:</b> The system depends heavily on a central actor
            to hold the reserve fiat in good faith, which runs counter to the
            principle of decentralization that is inherent in cryptocurrencies.
          </p>
          <p className={s.methodologyContentText}>
            <b>Transparency:</b> Some projects have been reluctant to allow
            external audits to confirm the proper maintenance of fiat deposits
            to back all of the stablecoins in circulation.
          </p>
        </div>
      </div>
    );
  } else if (props.methodologyType == 'crypto') {
    content = (
      <div className={s.methodologyDescContainer}>
        <div className={s.methodogyExplainContainer}>
          <h3 className={s.methodologyContentHeader}>
            Stabilization Mechanism:
          </h3>
          <p className={s.methodologyContentText}>
            To back the amount of dollars of stablecoin in circulation, there is
            some amount of crypto assets that are held as collateral. When a new
            user wants to exchange fiat for stablecoins, they will have to post
            some amount of crypto assets (usually Ethereum) as collateral. The
            specific amount will be determined by the protocol, taking into
            account the price risk of the collateral asset to minimize the risk
            of the collateral becoming worth less than the total value of the
            stablecoins outstanding, which would cause the system to collapse.
            When the user wants to redeem their stablecoins, they will be
            returned the collateral they initially posted.
          </p>
        </div>
        <div className={s.advDisadvContainer}>
          <h3 className={s.methodologyContentHeader}>Advantages</h3>
          <p className={s.methodologyContentText}>
            <b>Decentralization: </b> The operation of such a system is governed
            by a set of transparent, objective rules and does not depend on a
            centralized authority.
          </p>
          <p className={s.methodologyContentText}>
            <b>Straightforward Economics:</b> While certainly more complicated
            than a fiat-collateralized system, the fundamental principle of
            having enough dollar value in crypto assets to back every single
            dollar of stablecoin in existence is a robust way to maintain price
            stability.
          </p>
          <h3 className={s.methodologyContentHeader}>Disadvantages</h3>
          <p className={s.methodologyContentText}>
            <b>Collateral Price Crash Risk:</b> If a black swan event causes the
            value of the crypto assets held as collateral to crash, there could
            potentially not be enough collateral to back all of the stablecoins
            in existence, which would result in a complete collapse.
          </p>
          <p className={s.methodologyContentText}>
            <b>Crypto Exposure:</b> Since crypto must be held as collateral,
            there is an unavoidable long position that must be taken in crypto.
            If you eventually decide to redeem your stablecoins, the collateral
            you receive back could be worth less than when you initially posted
            it.
          </p>
          <p className={s.methodologyContentText}>
            <b>Over-Collateralization:</b> Posting an amount of crypto as
            collateral that is greater than the amount of usable stable coins is
            is not intuitive. For example, to access $100 worth of stable coin,
            you may have to lock up $150 worth of Ethereum, while you could have
            just as well have sold $100 worth of Ethereum to get fiat dollars
            directly, while holding on to the remaining $50 of Ethereum.
          </p>
        </div>
      </div>
    );
  } else if (props.methodologyType == 'algorithmic') {
    content = (
      <div className={s.methodologyDescContainer}>
        <div className={s.methodogyExplainContainer}>
          <h3 className={s.methodologyContentHeader}>
            Stabilization Mechanism:
          </h3>
          <p className={s.methodologyContentText}>
            The price peg is maintained by growing and shrinking the money
            supply based on the changing exchange rate between the stablecoin
            and the fiat dollar. When a new user wants to get exchange fiat for
            stablecoins, they will purchase it on an crypto exchange. This
            creates upward pressure on the price, and if it drifts above the
            peg, the protocol will systematically create new stablecoins to
            deflate the price back to par. When the user wants to exchange back
            to fiat, they will also have to sell the stablecoin on an exchange.
            This will create downward pressure on the price, and if it drifts
            below the peg, the protocol will start auctioning smart contracts to
            be paid out in stablecoins with interest in the future when
            additional coins need to be created to satisfy excess demand.
          </p>
        </div>
        <div className={s.advDisadvContainer}>
          <h3 className={s.methodologyContentHeader}>Advantages</h3>
          <p className={s.methodologyContentText}>
            <b>Capital Efficiency:</b> The operation of this system does not
            depend on locking up a significant amount of capital as collateral
            which could be otherwise used for other purposes.
          </p>
          <p className={s.methodologyContentText}>
            <b>Decentralization: </b> The operation of such a system is governed
            by a set of transparent, objective rules and does not depend on a
            centralized authority.
          </p>

          <p className={s.methodologyContentText}>
            <b>Alignment of Interests:</b> The issuance of smart contracts that
            pay out when the money supply increases encourages holders to become
            actively involved in the success of the stablecoin project.
          </p>
          <h3 className={s.methodologyContentHeader}>Disadvantages</h3>
          <p className={s.methodologyContentText}>
            <b>Speculative Attacks: </b> The success of the stablecoin depends
            crucially on the expectation that there will be buyers of the smart
            contracts when the price drops to decrease the money supply. If
            faith in the stablecoin is so diminished that there are no more
            smart contract buyers, then there will be nothing to prop up the
            price of the stablecoin and it will collapse.
          </p>
          <p className={s.methodologyContentText}>
            <b>Complex Economics:</b> There are a number of critical assumptions
            about the supply and demand dynamics which could potentially prove
            to be wrong.
          </p>
        </div>
      </div>
    );
  }
  return content;
};

const mapState = state => ({});

const mapDispatch = {};

export default connect(mapState, mapDispatch)(withStyles(s)(About));
