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
import s from './Home.css';
import Fade from 'react-reveal/Fade';
import Shake from 'react-reveal/Shake';
import Introducing from '../../components/Introducing';
import Description from '../../components/Description';
import StablecoinPrimer from '../../components/StablecoinPrimer';
import { connect } from 'react-redux';
import Layout from '../../components/Layout';

class Home extends React.Component {
  render() {
    return (
      <div>
        <div className={s.introducingContainer}>
          <Fade bottom cascade>
            <div>
              <h1 className={s.introducingText}>
                Introducing a new vision for banking
              </h1>
              <h3 className={s.depositText}>
                Maintain your deposits in USD-linked stable coins
              </h3>
            </div>
          </Fade>
        </div>
        <Description />
        <StablecoinPrimer />
        <div className={s.callToActionContainer}>
          <div className={s.opacityLayer}>
            <h1 className={s.callToActionBig}>So what are you waiting for?</h1>
            <h3 className={s.callToActionSmall}>
              Sign up today to be part of the future
            </h3>
          </div>
        </div>
      </div>
    );
  }
}

const mapState = state => ({});

const mapDispatch = {};

export default connect(mapState, mapDispatch)(withStyles(s)(Home));
