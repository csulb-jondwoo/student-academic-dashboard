/*global process*/

const mongoose = require('mongoose')
const GoogleStrategy = require('passport-google-oauth20').Strategy
const User = require('../models/user')

module.exports = (passport) => {
  passport.use(
    new GoogleStrategy(
      {
        clientID:
          '274923431758-p0ojivpf6if4q9uvoi7ohqguevopkrus.apps.googleusercontent.com',
        clientSecret: '0VzoDBxyWwKPeupuTfHTuwZh',
        callbackURL: '/auth/google/callback',
      },
      (accessToken, refreshToken, profile, done) => {
        // Successful authentication

        // check if user exists

        User.findOne({ googleId: profile.id }, async (err, doc) => {
          if (err) {
            return done(err, null)
          }

          if (!doc) {
            // if no user, create one
            const newUser = new User({
              _id: new mongoose.Types.ObjectId(),
              googleId: profile.id,
              studentId: 0,
              name: profile.name.givenName,
            })
            // Insert into database
            await newUser.save()
            done(null, newUser)
          } else {
            // user already exists in db
            done(null, doc)
          }
        })
      }
    )
  )

  passport.serializeUser((user, done) => {
    return done(null, user._id)
  })

  passport.deserializeUser((id, done) => {
    User.findById(id, async (err, doc) => {
      // Whatever we return goes to the client
      return done(null, doc)
    })
  })
}
