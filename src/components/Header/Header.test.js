/* eslint-env jest */
/* eslint-disable padded-blocks, no-unused-expressions */

import React from 'react';
import renderer from 'react-test-renderer';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import App from '../App';
import Header from './Header';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);
const initialState = {};

describe('Header', () => {
  test('renders children correctly', () => {
    const store = mockStore(initialState);
    const wrapper = renderer
      .create(
        <App context={{ insertCss: () => {}, fetch: () => {}, store }}>
          <Header />
        </App>,
      )
      .toJSON();

    expect(wrapper).toMatchSnapshot();
  });
});
