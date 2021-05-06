const mongoose = require('mongoose');
const config = require('config');

module.exports = () => {
  const host = config.get('db');
  mongoose.connect(host, { useNewUrlParser: true, useUnifiedTopology: true })
  const db = mongoose.connection;
  db.on('error', console.error.bind(console, 'Error Connecting to database'))
  db.once('open', function () {
    console.log(`Connected to database: ${host}`)
  })
}