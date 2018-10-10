var config = require('../config');
var accountSid = config.twilio.accountSid;
var authToken = config.twilio.authToken;
var twilio_phone = config.twilio.phone_no;
var client = require('twilio')(accountSid, authToken); //require the Twilio module and create a REST client

// send promo code
exports.message = function (code_info, phone_array, content, callback)
{
    process.nextTick(function ()
    {

        content = content.replace("@name@", code_info.code);
        content = content.replace("@discount@", code_info.discount);
        content = content.replace("@description@", code_info.description);
        content = content.replace("@expiry@", code_info.expiry);

        for (var i = 0; i < phone_array.length; i++)
        {
            content = content.replace("@cust_name@", phone_array[i].name);

            client.messages.create({
                to: phone_array[i].phone,
                from: twilio_phone,
                body: content
            }, function (smsErr, message)
            {
                if (!smsErr)
                {
                    console.log("message sent successfully " + message);
                } else
                {
                    console.log(smsErr);
                }
            });
        }
        callback(null, 1);
    });
};