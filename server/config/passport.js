/*global process*/

const mongoose = require('mongoose')
const GoogleStrategy = require('passport-google-oauth20').Strategy
const User = require('../models/user')

module.exports = (passport) => {
  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        callbackURL: process.env.CALLBACK_URL,
      },
      (accessToken, refreshToken, profile, done) => {
        // Successful authentication

        // check if user exists

        User.findOne({ googleId: profile.id }, async (err, doc) => {
          if (err) {
            return done(err, null)
          }

          if (!doc) {
            console.log('no doc')
            // if no user, create one
            const newUser = new User({
              _id: new mongoose.Types.ObjectId(),
              googleId: profile.id,
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
      },
    ),
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
