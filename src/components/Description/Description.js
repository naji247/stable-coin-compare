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
import s from './Description.css';
import { connect } from 'react-redux';
import img1 from './IMG_5775.jpg';
import Fade from 'react-reveal/Fade';

class Description extends React.Component {
  render() {
    return (
      <div className={s.root}>
        <div className={s.container}>
          <div className={s.text}>
            <Fade bottom>
              <div>
                <h2 className={s.header}>What is SCX?</h2>
                <p>
                  We created SCX to be an online banking services platform for
                  stablecoins. Manage your holdings and make deposits and
                  transfers in a secure and transparent way.
                </p>
              </div>
            </Fade>
          </div>
          <div className={s.images}>
            <div className={s.imageWrapper}>
              <img src={img1} alt="Screenshot" className={s.horizImage1} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withStyles(s)(Description);
