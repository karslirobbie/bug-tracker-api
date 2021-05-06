const cors = require('cors')


module.exports = (app) => {
  const options = {
    "origin": /localhost/,
    "exposedHeaders": ["x-auth-token"],
  }

  app.use(cors(options))
}

