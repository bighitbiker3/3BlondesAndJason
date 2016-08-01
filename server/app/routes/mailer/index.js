'use strict';
var router = require('express').Router();
var db = require('../../../db');
var Address = db.model('address');
var UserAddresses = db.model('user_addresses');
var utility = require('../../configure/utility');
var ensureAdmin = utility.ensureAdmin;
var ensureAuthenticated = utility.ensureAuthenticated;
var nodemailer = require('nodemailer');
var transporter = nodemailer.createTransport('smtps://boatpaints%40gmail.com:3BlondesAndJason@smtp.gmail.com');

var hashMethods = require('../password/hasher');
module.exports = router;

//mail send helper func
var sendMail = function(mailOptions, res){
  transporter.sendMail(mailOptions, function(error, info){
      if(error){
          res.send(error);
          return console.log(error);
      }
      console.log('Message sent: ' + info.response);
      res.send(info);
  });
};

router.post('/orderConfirm', function(req, res, next){
  let orderData = req.body;

  var mailOptions = {
      from: '"Yacht Paints BABAYYY  👥" <foo@blurdybloop.com>', // sender address
      to: 'bighitbiker3@gmail.com', // list of receivers
      subject: 'Order thx <3 ✔', // Subject line
      text: 'Thank you for your order! 🐴', // plaintext body
      html: '<b>Thank you for your order! <3 🐴</b>' // html body
  };
  sendMail(mailOptions, res)
});

router.post('/welcomeMessage', function(req, res, next){
  let userData = req.body;

  var mailOptions = {
      from: '"Yacht Paints BABAYYY  👥" <foo@blurdybloop.com>', // sender address
      to: userData.email, // list of receivers
      subject: 'Welcome 2 Boat Paints✔', // Subject line
      text: 'Hello ' + userData.name + ' 🐴', // plaintext body
      html: '<b>Hello boats 4 lyfe 🐴</b>' // html body
  };
  sendMail(mailOptions, res)
})

router.post('/resetPassword', function(req, res, next){
  let userData = req.body;

  var mailOptions = {
      from: '"Yacht Paints BABAYYY 👥" <noreply@boatpaints.com>', // sender address
      to: userData.email, // list of receivers
      subject: 'Password Reset 4 Dummies', // Subject line
      text: 'Hello ' + userData.name + ' 🐴' + 'Go here please http://localhost:1337/reset' + hashMethods.createHash(userData.email), // plaintext body
      html: '<b>Hello boats 4 lyfe 🐴</b> http://localhost:1337/reset/' + hashMethods.addUserHash(userData.email) // html body
  };


  sendMail(mailOptions, res)
})
