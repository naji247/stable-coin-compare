/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Introducing.css';
import { connect } from 'react-redux';
import Fade from 'react-reveal/Fade';

class Introducing extends React.Component {
  render() {
    return (
      <div className={s.root}>
        <div className={s.container}>
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
      </div>
    );
  }
}

export default withStyles(s)(Introducing);
