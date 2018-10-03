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
import s from './Navigation.css';
import Link from '../Link';
import { connect } from 'react-redux';
import { logout } from '../../actions/authActions';

class Navigation extends React.Component {
  render() {
    return (
      <div className={s.root} role="navigation">
        <Link className={s.link} to="/coins">
          Coins
        </Link>
      </div>
    );
  }
}

const mapState = state => ({
  token: state.userState.token
});

const mapDispatch = { logout };

export default connect(mapState, mapDispatch)(withStyles(s)(Navigation));
