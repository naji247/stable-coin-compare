import sequelize from '../data/sequelize';
import passport from '../passport';


export const getUserInfo = (req, res) => {
  passport.authenticate('jwt', { session: false })(req, res, function() {
    const authorizedUserId = req.user.id;

    if (!req.params || !req.params.user_id) {
      res.status(400).send('No user ID provided to fetch information for.');
    }

    if (req.params.user_id !== authorizedUserId) {
      res.status(401).send({
        message: 'You are unauthorized to see this users information.',
      });
    }

    const userId = req.params.user_id;
    const sqlString = `SELECT usr.email FROM "user" usr
                            WHERE usr.id = '${userId}'`;

    sequelize
      .query(sqlString, { type: sequelize.QueryTypes.SELECT })
      .then(results => {
        if (results.length === 0) {
          res.status(404).send('No user found for user information.');
        } else {
          var user = { ...results[0] };
          res.send(user);
        }
      })
      .catch(error => {
        res
          .status(500)
          .send('Unexpected error when trying to get information for user.');
      });
  });
};