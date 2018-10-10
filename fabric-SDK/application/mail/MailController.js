var nodemailer = require('nodemailer');
var jade = require('jade');
var path = require('path');
var config = require('./../../configuration/config')

var emailJade = path.join(__dirname, '../../views/email.jade');

var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: config.user,
      pass: config.pass
    }
  });

  
  //This function will send the registration email with password
 var sendRegistrationEmail = function sendRegistrationEmail(to, password){
    var mailOptions = {
        from: config.user,
        to: to,
        subject: 'Asset Chain',
        html:jade.renderFile(emailJade,{message: "You can find the password below:",password: password})
      };

      sendEmail(mailOptions);
  }

  //This function will send forget password email
  var sendForgotPasswordEmail = function forgotPassword(to, password){
    var mailOptions = {
      from: config.user,
      to: to,
      subject: 'Asset Chain',
      html:jade.renderFile(emailJade,{message: "Please find the new password mentioned below:",password: password})
    };

    sendEmail(mailOptions);
  }

//   //This function will send forget password email
//   var sendAssetEmail = function assetEmail(to, request_status){

//     var message;
//     switch(request_status){
//       case 0:
// message = "Your request for device "
//     }

//     var mailOptions = {
//       from: 'debutinfotech2018@gmail.com',
//       to: to,
//       subject: 'Asset Chain',
//       html:jade.renderFile('/home/akshay/WS/asset-chain-api/views/email.jade',{message: "Please find the new password mentioned below:",password: password})
//     };

//     sendEmail(mailOptions);
//   }

  function sendEmail(mailOption){
    transporter.sendMail(mailOption, function(error, info){
      if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
    });
  }


  

  


  module.exports.sendRegistrationEmail = sendRegistrationEmail;
  module.exports.sendForgotPasswordEmail = sendForgotPasswordEmail;
  // module.exports.sendAssetEmail = sendAssetEmail;