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
    var background;
    if (this.props.background == 'transparent') background = s.transparent;
    else if (this.props.background == 'translucent') background = s.translucent;
    else background = '';

    return (
      <header className={s.root}>
        <nav className={background}>
          <ul className={s.linkHome}>
            <li>
              <a
                className={
                  s.navOption + ' ' + (this.props.hideLogo ? s.hideLogo : '')
                }
                href="/"
              >
                <img src={logoUrl} alt="Logo" className={s.logo} />
                <div className={s.siteName}>Stablecoin Compare</div>
              </a>
            </li>
          </ul>

          <ul className={s.navOptions}>
            <li>
              <a href="/analytics" className={s.navOption}>
                Analytics
              </a>
            </li>
            <li>
              <a href="/knowledge-base" className={s.navOption}>
                Knowledge Base
              </a>
            </li>
            <li>
              <a href="/coins" className={s.navOption}>
                Coins
              </a>
            </li>
            <li>
              <a href="/blog" className={s.navOption}>
                Blog
              </a>
            </li>
          </ul>
        </nav>
      </header>
    );
  }
}

export default withStyles(s)(Navbar);
