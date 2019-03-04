'use strict';

const express = require('express');
const favicon = require('express-favicon');

require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(favicon(__dirname + '/public/favicon.ico'));
app.set('view engine', 'ejs');
app.use(express.static('public'));


app.get('/', pageLoad);

app.get('*', (request, response) => response.status(404).send('This route does not exist'));
app.listen(PORT, () => console.log(`Listening on ${PORT}`));

function pageLoad(request, response) {
  
  response.render('index')
  app.use(favicon(__dirname + '/public/favicon.ico'));
}
