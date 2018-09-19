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

const User = Model.define(
  'user',
  {
    id: {
      type: DataType.UUID,
      defaultValue: DataType.UUIDV1,
      primaryKey: true,
    },

    password: {
      type: DataType.STRING(255),
      allowNull: false,
    },

    email: {
      type: DataType.STRING(255),
      validate: { isEmail: true },
      unique: true,
    },

    email_confirmed: {
      type: DataType.BOOLEAN,
      defaultValue: false,
    },

    first_name: {
      type: DataType.STRING(255),
      allowNull: true,
    },

    last_name: {
      type: DataType.STRING(255),
      allowNull: true,
    },

    phone_number: {
      type: DataType.STRING(20),
    },

    createdAt: {
      type: DataType.DATE,
      field: 'created_at',
    },

    updatedAt: {
      type: DataType.DATE,
      field: 'updated_at',
    },

    // TODO: Add refresh token later to invalidate auth tokens
    // token: {
    //   type: DataType.STRING(255),
    //   defaultValue: null,
    //   unique: true,
    //   allowNull: true,
    // },
  },
  {
    indexes: [{ fields: ['email'] }],
  },
);

export default User;
