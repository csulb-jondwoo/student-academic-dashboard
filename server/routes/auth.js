const express = require('express')
const passport = require('passport')
const router = express.Router()

// @desc Auth with Google
// @route GET /auth/google
router.get('/google', passport.authenticate('google', { scope: ['profile'] }))

// @desc Google Auth Callback
// @route GET /auth/google/callback
router.get(
  '/google/callback',
  passport.authenticate('google', {
    failureRedirect: process.env.AUTH_FAILURE_REDIRECT,
  }),
  (req, res) => {
    // Successful authentication

    res.redirect(process.env.AUTH_SUCCESS_REDIRECT)
  }
)

// @desc log current user out
// @route GET /auth/logout
router.get('/logout', (req, res) => {
  req.logout()
  res.send('done')
})

module.exports = router
