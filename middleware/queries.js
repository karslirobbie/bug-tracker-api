

const queryString = (req, res, next) => {
  const query = {}

  for (const [prop, val] of Object.entries(req.query)) {
    query[prop] = new RegExp(".*" + val + ".*", "i")
  }

  res.locals.query = query
  next()
}


module.exports.queryString = queryString