import withStyles from 'isomorphic-style-loader/lib/withStyles';
import React from 'react';
import s from './About.css';
import { connect } from 'react-redux';
import { Element } from 'react-scroll';
import _ from 'lodash';
import Navbar from '../../components/Navbar';
import algorithmicImg from './algorithmic.jpg';

class About extends React.Component {
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
          </div>
          <div className={s.sectionContainer}>
            <h1 className={s.sectionHeader}>How Do They Work?</h1>
            <div className={s.methodologyCardsContainer}>
              <div className={s.methodologyCard}>
                <div className={s.opacityLayer}>
                  <h2 className={s.methodologyCardText}>
                    Fiat<br />Collateralized
                  </h2>
                </div>
              </div>
              <div className={s.methodologyCard}>
                <div className={s.opacityLayer}>
                  <h2 className={s.methodologyCardText}>
                    Crypto<br />Collateralized
                  </h2>
                </div>
              </div>
              <div className={s.methodologyCard}>
                <div className={s.opacityLayer}>
                  <h2 className={s.methodologyCardText}>
                    Algorithmic<br />Central<br />Bank
                  </h2>
                </div>
              </div>
            </div>

            <div className={s.methodologyDescContainer}>
              <div className={s.methodogyExplainContainer}>
                <h3 className={s.methodologyContentHeader}>
                  Stabilization Mechanism:
                </h3>
                <p className={s.methodologyContentText}>
                  To back the amount of dollars of stablecoin in circulation,
                  there is some amount of crypto assets that are held as
                  collateral. When a new user wants to exchange fiat for
                  stablecoins, they will have to post some amount of crypto
                  assets (usually ethereum) as collateral. The specific amount
                  will be determined by the protocol, taking into account the
                  price risk of the collateral asset to minimize the risk of the
                  collateral becoming worth less than the total value of the
                  stablecoins outstanding. When the user wants to redeem their
                  stablecoin for cash, they will get some amount of crypto back
                </p>
              </div>
              <div className={s.advDisadvContainer}>
                <h3 className={s.methodologyContentHeader}>Advantages</h3>
                <p className={s.methodologyContentText}>
                  <b>Minimal Technology Risk: </b> These projects are not
                  exactly reinventing the wheel when it comes to crypto
                  technology, so there are fewer things that can go wrong
                </p>
                <p className={s.methodologyContentText}>
                  <b>Straightforward Economics:</b> The economics are no more
                  complicated than the token system at Chuck-E-Cheese's which
                  even five year olds can understand.
                </p>
                <h3 className={s.methodologyContentHeader}>Disadvantages</h3>
                <p className={s.methodologyContentText}>
                  <b>Centralization: </b>The system depends heavily on a central
                  actor to hold the reserve fiat in good faith, which runs
                  counter to the principle of decentralization that is inherent
                  in cryptocurrencies
                </p>
                <p className={s.methodologyContentText}>
                  <b>Transparency:</b> Some projects have been reluctant to
                  allow external audits to confirm the proper maintenance of
                  fiat deposits to back all of the stablecoins in circulation
                </p>
              </div>
            </div>
            <span className={s.threeDots}>* * *</span>
          </div>
        </div>
      </div>
    );
  }
}

const mapState = state => ({});

const mapDispatch = {};

export default connect(mapState, mapDispatch)(withStyles(s)(About));
