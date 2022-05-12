const express = require('express');
const deptsRouter = require('./departments');
const empsRouter = require('./employees');
const rolesRouter = require('./roles');

const app = express();

app.use('./departments', deptsRouter);
app.use('./employees', empsRouter);
app.use('./roles', rolesRouter);

module.exports = app;