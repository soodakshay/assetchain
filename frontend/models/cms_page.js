// require mongoose module for mongoose connection
var mongoose = require('mongoose');
var cms_page = mongoose.model('cms_page');

exports.save = function (booking_data, callback)
{
    process.nextTick(function ()
    {
        var new_cms_page = new cms_page(booking_data);
        new_cms_page.save(function (error, data)
        {
            if (!error)
            {
                callback(null, {status: 1, message: "success", data: data});
            } else
            {
                if (error.errors)
                {
                    console.log("error.errors");
                    console.log(error.errors);
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
        cms_page.findOne(query, {__v: 0, updated_at: 0}, function (error, data)
        {
            if (!error)
            {
                if (data !== null)
                {
                    data = JSON.parse(JSON.stringify(data));
                    callback(null, {status: 1, message: "success", data: data});
                } else
                {
                    callback(null, {status: 2, message: "Booking not found"});
                }
            } else
            {
                callback(null, {status: 0, message: error.message});
            }
        });
    });
};


exports.find = function (query, sort_condition, callback)
{
    process.nextTick(function ()
    {
        cms_page.find(query).sort(sort_condition).exec(function (error, data) {
            if (!error)
            {
                if (data.length !== 0)
                {
                    data = JSON.parse(JSON.stringify(data));
                    callback(null, {status: 1, message: "success", data: data});
                } else
                {
                    callback(null, {status: 2, message: "cms_page not found"});
                }
            } else
            {
                callback(null, {status: 0, message: error.message});
            }
        });
    });
};


exports.update = function (query, update_data, callback)
{
    process.nextTick(function ()
    {
        cms_page.update(query, update_data, {multi: true}, function (error, data)
        {
            if (!error)
            {
                if (data.nModified > 0)
                {
                    callback(null, {status: 1, message: "success"});
                } else
                {
                    callback(null, {status: 2, message: "cms_page data could not update"});
                }
            } else
            {
                callback(null, {status: 0, message: error.message});
            }

        });
    });
};

