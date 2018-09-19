/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

/**
 * Passport.js reference implementation.
 * The database schema used in this sample is available at
 * https://github.com/membership/membership.db/tree/master/postgres
 */

import passport from 'passport';
import { User } from './data/models';
const passportJWT = require('passport-jwt');
const ExtractJWT = passportJWT.ExtractJwt;
const LocalStrategy = require('passport-local').Strategy;
const JWTStrategy = passportJWT.Strategy;
import config from './config';
import bcrypt from 'bcryptjs';

passport.use(
  new LocalStrategy(
    {
      usernameField: 'email',
      passwordField: 'password',
    },
    function(email, password, cb) {
      var user;
      //Assume there is a DB module pproviding a global User
      return User.findOne({ where: { email: email } })
        .then(userInDb => {
          if (!userInDb) {
            return cb(null, false, { message: 'Incorrect email or password.' });
          }
          user = userInDb;
          return bcrypt.compare(password, userInDb.password);
        })
        .then(correctPassword => {
          if (!correctPassword) {
            return cb(null, false, { message: 'Incorrect email or password.' });
          }
          return cb(null, user, {
            message: 'Logged In Successfully',
          });
        })
        .catch(err => {
          return cb(err);
        });
    },
  ),
);

passport.use(
  new JWTStrategy(
    {
      jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
      secretOrKey: config.auth.jwt.secret,
    },
    function(jwtPayload, cb) {
      //find the user in db if needed. This functionality may be omitted if you store everything you'll need in JWT payload.
      return User.findOne({ where: { email: jwtPayload.email } })
        .then(user => {
          return cb(null, user);
        })
        .catch(err => {
          return cb(err);
        });
    },
  ),
);

export default passport;
