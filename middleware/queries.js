

const queryString = (req, res, next) => {
  const query = {}
  const objectIds = ["assignedTo", "assignee", "createdBy"];

  for (const [prop, val] of Object.entries(req.query)) {

    if (objectIds.includes(prop)) query[prop] = val
    else query[prop] = new RegExp(".*" + val + ".*", "i")

  }

  res.locals.query = query
  next()
}


module.exports.queryString = queryString