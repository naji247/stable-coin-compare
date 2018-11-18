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

const Feedback = Model.define('feedback', {
  id: {
    type: DataType.UUID,
    defaultValue: DataType.UUIDV1,
    primaryKey: true
  },

  reason: {
    type: DataType.STRING(255),
    allowNull: false
  },

  createdAt: {
    type: DataType.DATE,
    field: 'created_at'
  },

  updatedAt: {
    type: DataType.DATE,
    field: 'updated_at'
  }
});

export default Feedback;
