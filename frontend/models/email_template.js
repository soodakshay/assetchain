// require mongoose module for mongoose connection
var mongoose = require('mongoose');
var email_template = mongoose.model('email_template');

exports.findOne = function (query, callback)
{
    process.nextTick(function ()
    {
        email_template.findOne(query, {__v: 0, updated_at: 0, created_at: 0}, function (error, data) {
            if (!error)
            {
                if (data !== null)
                {
                    data = JSON.parse(JSON.stringify(data));
                    callback(null, {status: 1, message: "success", data: data});
                } else
                {
                    callback(null, {status: 2, message: "template not found"});
                }
            } else
            {
                callback(null, {status: 0, message: error.message});
            }
        });
    });
};



