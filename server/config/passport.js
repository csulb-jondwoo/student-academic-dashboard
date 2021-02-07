const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');
const User = require('../models/user');

module.exports = (passport) => {
  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        callbackURL: process.env.CALLBACK_URL,
      },
      (accessToken, refreshToken, profile, cb) => {
        // Successful authentication

        // check if user exists
        User.findOne({ googleId: profile.id }, async (err, doc) => {
          if (err) {
            return cb(err, null);
          }

          if (!doc) {
            // if none, create one
            const newUser = new User({
              googleId: profile.id,
              name: profile.name.givenName,
            });

            // Insert into database
            await newUser.save();
            cb(null, newUser);
          }
          cb(null, doc);
        });

        console.log(profile);
      },
    ),
  );

  passport.serializeUser((user, done) => {
    return done(null, user._id);
  });

  passport.deserializeUser((id, done) => {
    User.findById(id, (err, doc) => {
      // Whatever we return goes to the client
      return done(null, doc);
    });
  });
};
