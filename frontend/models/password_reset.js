// require mongoose module for mongoose connection
var mongoose = require('mongoose');
var password_reset = mongoose.model('password_reset');

exports.save = function (user_data, callback)
{
    process.nextTick(function ()
    {
        var new_password_resets = new password_reset(user_data);
        new_password_resets.save(function (error, data)
        {
            if (!error)
            {
                console.log("data");
                console.log(data);
                callback(null, {status: 1, message: "success", data: data});
            } else
            {
                if (error.errors)
                {
                    callback(null, {status: 2, message: "Invalid values"});
                } else
                {
                    callback(null, {status: 0, message: error.message});
                }
            }
        });
    });
};

exports.findOne = function (query, callback)
{
    process.nextTick(function ()
    {
        password_reset.findOne(query, {__v: 0, updated_at: 0, created_at: 0}, function (error, data)
        {
            if (!error)
            {
                if (data !== null)
                {
                    callback(null, {status: 1, message: "success", data: data});
                } else
                {
                    callback(null, {status: 2, message: "User not found"});
                }
            } else
            {
                callback(null, {status: 0, message: error.message});
            }
        });
    });
};

exports.remove = function (query, callback)
{
    process.nextTick(function ()
    {
        password_reset.remove(query, function (error, data)
        {
            if (!error)
            {
                callback(null, {status: 1, message: "success"});
            } else
            {
                callback(null, {status: 0, message: error.message});
            }
        });
    });
};

