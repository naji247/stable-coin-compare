/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React from 'react';
// import cx from 'classnames';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Navbar.css';
import Link from '../Link';
import logoUrl from './logo-white.png';

class Navbar extends React.Component {
  render() {
    return (
      <header className={s.root}>
        <nav>
          <ul>
            <li>
              <a className={s.homeLink} href="/">
                <img src={logoUrl} alt="Logo" className={s.logo} />
                Stablecoin Compare
              </a>
            </li>
          </ul>

          <ul>
            <li>
              <a href="/coins" className={s.navOption}>
                Coins
              </a>
            </li>
          </ul>
        </nav>
      </header>
    );
  }
}

export default withStyles(s)(Navbar);
