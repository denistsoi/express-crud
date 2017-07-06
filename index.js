require('dotenv').load()
const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser')
const routes = require('./routes/.');

const port = process.env.PORT || 3000;

/**
 * setup and connect to db
 */

const mongoose = require('mongoose');

mongoose.connect(`mongodb://${process.env.DB_URL}`, {
  useMongoClient: true
});

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error'));

db.once('open', ()=> {
  console.log('application has connected to db');
});

/**
 * set routes
 */

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(routes);

/**
 * listen
 */
app.listen(port, ()=> {
  console.log(`server is listening to port: ${port}`);
});