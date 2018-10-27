/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

/* eslint-disable global-require */
import React from 'react';
import Coins from './coins/Coins';
import Layout from '../components/Layout';

// The top-level (parent) route
const routes = {
  path: '',

  // Keep in mind, routes are evaluated in order
  children: [
    {
      path: '',
      load: () => import(/* webpackChunkName: 'home' */ './home')
    },
    {
      path: '/coins/:coinId',
      // action: (context) => <Coins selectedCoinId={context.params.coinId} />
      action: context => ({
        chunks: ['home'],
        title: 'React Starter Kit',
        component: (
          <Layout>
            <Coins selectedCoinId={context.params.coinId} />
          </Layout>
        )
      })
    },
    {
      path: '/coins',
      load: () => import(/* webpackChunkName: 'coins' */ './coins')
      // children: [
      //   {
      //     path: '/:coinId',
      //     action: (context) => `<h1>${context}</h1>`
      //   }
      // ]
    },
    {
      path: '/about',
      load: () => import(/* webpackChunkName: 'about' */ './about')
    },
    {
      path: '/blog',
      load: () => import(/* webpackChunkName: 'blog' */ './blog')
    },
    // Wildcard routes, e.g. { path: '(.*)', ... } (must go last)
    {
      path: '(.*)',
      load: () => import(/* webpackChunkName: 'not-found' */ './not-found')
    }
  ],

  async action({ next }) {
    // Execute each child route until one of them return the result
    const route = await next();

    // Provide default values for title, description etc.
    route.title = `Stablecoin Compare`;
    route.description = route.description || '';

    return route;
  }
};

// The error page is available by permanent url for development mode
if (__DEV__) {
  routes.children.unshift({
    path: '/error',
    action: require('./error').default
  });
}

export default routes;
