const express = require('express')
const app = express();
const port = 3000;
const config = require('config')

require('./startup/logging')()
require('./startup/db')()
require('./startup/routes')(app)


app.listen(port, () => {
  console.log(`Listening at port ${port}`)
})