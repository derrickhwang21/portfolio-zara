'use strict';

const express = require('express');
const superagent = require('superagent');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

app.set('view engine', 'ejs');
app.use(express.static('public'));

app.get('/', pageLoad);


app.listen(PORT, () => console.log(`Listening on ${PORT}`));

function pageLoad(request, response) {
  response.render('index')
}
