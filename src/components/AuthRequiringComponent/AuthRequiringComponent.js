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
import { isAuthenticated } from '../../reducers/user';
import history from '../../history';

export default class AuthRequiringComponent extends React.Component {
  static propTypes = {
    isHydrating: PropTypes.bool.isRequired,
    isAuthenticated: PropTypes.bool.isRequired,
  };

  componentDidMount() {
    if (!this.props.isAuthenticated && !this.props.isHydrating) {
      history.push('/login');
    }
  }

  componentWillUpdate(nextProps, nextState) {
    if (!nextProps.isAuthenticated && !nextProps.isHydrating) {
      history.push('/login');
    }
  }
}

export const authRequiringState = state => ({
  isAuthenticated: isAuthenticated(state.userState),
  isHydrating: state.userState.isHydrating,
});
