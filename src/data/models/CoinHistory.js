/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import DataType from 'sequelize';
import Model from '../sequelize';

const CoinHistory = Model.define('coin_history', {
    id: {
      type: DataType.UUID,
      defaultValue: DataType.UUIDV4,
      primaryKey: true
    },

    coin_id: {
      type: DataType.STRING(255),
      allowNull: false
    },

    timestamp: {
      type: DataType.DATE,
      allowNull: false
    },

    price: {
      type: DataType.FLOAT,
      allowNull: false
    },

    volume: {
      type: DataType.FLOAT,
      allowNull: false
    },

    market_cap: {
      type: DataType.FLOAT,
      allowNull: false
    }
  },
  {
    timestamps: false
  });

export default CoinHistory;
