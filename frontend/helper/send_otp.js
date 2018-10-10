var config = require('../config.js');
var accountSid = config.twilio.accountSid;
var authToken = config.twilio.authToken;
var twilio_phone = config.twilio.phone_no;
//require the Twilio module and create a REST client
var client = require('twilio')(accountSid, authToken);

// send OTP
exports.sendOtp = function (phone, otp_code, callback)
{
    process.nextTick(function ()
    {
        client.messages.create({
            to: phone,
            from: twilio_phone,
            body: "Welcome to Muah. Here is the code:  " + otp_code + "  Please confirm it in the app. This OTP is valid for 30 min only. Thanks!"
        }, function (smsErr, message)
        {
            if (!smsErr)
            {
                console.log("Otp_info ");
                console.log(message.body);
            } else
            {
                console.log(smsErr);
            }
        });
        callback(null, 1);
    });
};