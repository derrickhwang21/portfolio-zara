'use strict';

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
require('dotenv').config();

const PORT = process.env.PORT || 3000;

app.set('view engine', 'ejs');
app.use(express.static('public'));


app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(bodyParser.json());


app.get('/', pageLoad)
app.get('/admin', showAdmin);


app.post('/send', contactSubmit)




function pageLoad(request, response){
  response.render('index');
}

function contactSubmit(request, response) {
  const output = `
    <p>You have a new contact request</p>
    <h3>Contact Details</h3>
    <ul>  
      <li>Name: ${request.body.name}</li>
      <li>Email: ${request.body.email}</li>
      <li>Subject: ${request.body.subject}</li>
      <li>Message: ${request.body.message}</li>
    </ul>
    <h3>Message</h3>
    <p>${request.body.message}</p>
  `;

  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: 'ns-cloud-c1.googledomains.com',
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: 'info@zarahuang.com', // generated ethereal user
      pass: 'ws00tsd9091905d' // generated ethereal password
    },
    tls: {
      rejectUnauthorized: false
    }
  });

  let mailOptions = {
    from: '"Nodemailer Contact" <info@zarahuang.com>', // sender address
    to: 'hwang.derrick@gmail.com', // list of receivers
    subject: 'Node Contact Request', // Subject line
    text: 'Hello world?', // plain text body
    html: output // html body
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.log(error);
    }
    console.log('Message sent: %s', info.messageId);
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

    response.render('index', {
      msg: 'Email has been sent'
    });
  });
};

function showAdmin(request, response) {
  response.render('admin');
}

app.get('*', (request, response) => response.status(404).send('This route does not exist'))
app.listen(PORT, () => console.log(`Listening on ${PORT}`))