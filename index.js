const express = require('express')
const cors = require('cors')
const app = express();
const port = 3000;

require('./startup/cors')(app)
require('./startup/logging')()
require('./startup/db')()
require('./startup/routes')(app)


app.listen(port, () => {
  console.log(`Listening at port ${port}`)
})