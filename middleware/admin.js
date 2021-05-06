

module.exports = (req, res, next) => {
  const { roles } = req.header.user;
  if (!roles.includes('admin')) return res.status(403).send('You do not have permissions to execute this action.');

  next()
}