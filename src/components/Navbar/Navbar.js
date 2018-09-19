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
import logoUrl from './logo-small.png';

class Navbar extends React.Component {
  render() {
    return (
      <div className={s.root}>
        <Link className={s.brand} to="/">
          <img src={logoUrl} alt="SCX Logo" className={s.logo} />
          <span className={s.brandTxt}>SCX</span>
        </Link>
      </div>
    );
  }
}

export default withStyles(s)(Navbar);
