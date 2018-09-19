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
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
// external-global styles must be imported in your JS.
import normalizeCss from 'normalize.css';
import s from './Layout.css';
import Header from '../Header';
// import Feedback from '../Feedback';
// import Footer from '../Footer';
const muiTheme = getMuiTheme({
  fontFamily: 'Nunito Sans',
  palette: {
    textColor: '#2A3439',
  },
  tableRow: {
    hoverColor: '#CDE2F3',
  },
});

class Layout extends React.Component {
  render() {
    return (
      <div>
        <MuiThemeProvider muiTheme={getMuiTheme(muiTheme)}>
          <Header />
          {this.props.children}
          {/* <Feedback />
        <Footer /> */}
        </MuiThemeProvider>
      </div>
    );
  }
}

export default withStyles(normalizeCss, s)(Layout);
