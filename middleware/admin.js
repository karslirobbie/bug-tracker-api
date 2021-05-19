
const config = require('config')


module.exports = (req, res, next) => {
  if (!config.get("requireToken")) return next()

  const { role } = req.header.user;
  if (role != 'admin') return res.status(403).send('You do not have permissions to execute this action.');

  next()
}