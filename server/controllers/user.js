function fetchUser(req, res) {
  res.send(req.user)
}

module.exports = {
  fetchUser,
}
