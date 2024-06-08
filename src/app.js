const express = require('express');

const app = express()

require('dotenv').config()
require('./dbs/mongo');

app.use(require('body-parser').json())

app.use(require('./routers/index'))
module.exports = app;