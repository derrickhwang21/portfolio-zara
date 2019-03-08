'use strict';

const express = require('express');
const favicon = require('express-favicon');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');





const app = express();
const PORT = process.env.PORT || 3000;

require('dotenv').config();


app.use(bodyParser.urlencoded({extended: true}));
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

// POST route from contact form
app.post('/submit-form', function (req, res) {
  let mailOpts, smtpTrans;
  smtpTrans = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_PASS
    }
  });
  mailOpts = {
    from: req.body.name + ' &lt;' + req.body.email + '&gt;',
    to: process.env.GMAIL_USER,
    subject: 'New message from zarahuang.com',
    text: `A new message from: ${req.body.name} (${req.body.email})(${req.body.linkedin}) says: ${req.body.message}`
  };
  smtpTrans.sendMail(mailOpts, function (error, response) {
    if (error) {
      res.redirect('/');
    }
    else {
      res.redirect('/');
    }
  });
});


