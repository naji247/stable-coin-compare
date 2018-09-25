/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Header.css';
import Link from '../Link';
import Navigation from '../Navigation';
import logoUrl from './logo-small.png';
import { connect } from 'react-redux';
import _ from 'lodash';
import { APP_URL } from '../../secrets';
import arrowUrl from './arrow.png';
import { Link as ScrollLink } from 'react-scroll';

class Header extends React.Component {
  render() {
    return (
      <div className={s.root}>
        <div className={s.container}>
          {/* <Navigation />
          <Link className={s.brand} to="/">
            <img
              src={logoUrl}
              srcSet={`${logoUrl} 2x`}
              alt="SCX Logo"
              className={s.logo}
            />
            <span className={s.brandTxt}>SCX</span>
          </Link> */}
          <div className={s.headlineContainer}>
            <h1 className={s.headlineName}>Stable Coin Compare</h1>
            <h3 className={s.description}>
              Your guide to understand and evaluate Stable Coins
            </h3>
          </div>
          <div className={s.arrowContainer}>
            <ScrollLink
              activeClass="active"
              to="subscribe"
              spy={true}
              smooth={true}
              duration={500}
            >
              <img src={arrowUrl} alt="arrow" className={s.arrow} />
            </ScrollLink>
          </div>
        </div>
      </div>
    );
  }
}

const mapState = state => ({});

const mapDispatch = {};

export default connect(mapState, mapDispatch)(withStyles(s)(Header));
