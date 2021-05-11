
const config = require('config')


module.exports = (req, res, next) => {
  if (!config.get("requireToken")) return next()

  const { roles } = req.header.user;
  if (!roles.includes('admin')) return res.status(403).send('You do not have permissions to execute this action.');

  next()
}