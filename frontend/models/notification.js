// require mongoose module for mongoose connection
var mongoose = require('mongoose');
var notification = mongoose.model('notification');

exports.create = function (notification_data, callback)
{
    process.nextTick(function ()
    {
        notification.create(notification_data, function (error, data)
        {
            if (!error)
            {
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


exports.save = function (notification_data, callback)
{
    process.nextTick(function ()
    {
        var new_notification = new notification(notification_data);
        new_notification.save(function (error, data)
        {
            if (!error)
            {
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
        notification.findOne(query, {__v: 0, updated_at: 0, created_at: 0}, function (error, data)
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

exports.findOne_projection_population = function (query, projection, populate_query, callback)
{
    process.nextTick(function ()
    {
        notification.findOne(query, projection).populate(populate_query).exec(function (error, data)
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
        notification.find(query).sort(sort_condition).exec(function (error, data) {
            if (!error)
            {
                if (data.length !== 0)
                {
                    data = JSON.parse(JSON.stringify(data));
                    callback(null, {status: 1, message: "success", data: data});
                } else
                {
                    callback(null, {status: 2, message: "Notification not found"});
                }
            } else
            {
                callback(null, {status: 0, message: error.message});
            }
        });
    });
};

exports.find_count = function (query, callback)
{
    process.nextTick(function ()
    {
        notification.find(query).count().exec(function (error, data)
        {
            if (!error)
            {
                callback(null, {status: 1, message: "success", data: data});
            } else
            {
                callback(null, {status: 0, message: error.message});
            }
        });
    });
};

exports.find_with_population = function (query, populate_data, sort_condition, callback)
{
    process.nextTick(function ()
    {
        notification.find(query).populate(populate_data).sort(sort_condition).exec(function (error, data) {
            if (!error)
            {
                if (data.length !== 0)
                {
                    data = JSON.parse(JSON.stringify(data));
                    callback(null, {status: 1, message: "success", data: data});
                } else
                {
                    callback(null, {status: 2, message: "Notification not found"});
                }
            } else
            {
                callback(null, {status: 0, message: error.message});
            }
        });
    });
};

exports.find_with_pagination_projection = function (query, projection, sort_condition, skip, limit, options, callback)
{
    process.nextTick(function ()
    {
        notification.find(query, projection).sort(sort_condition)
                .skip(skip).limit(limit).paginate(options, function (error, data)
        {
            if (!error)
            {
                if (data.length !== 0)
                {
                    data = JSON.parse(JSON.stringify(data));
                    callback(null, {status: 1, message: "success", data: data});
                } else
                {
                    callback(null, {status: 2, message: "Notifications not found"});
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
        try
        {
            notification.remove(query, function (error, data)
            {
                if (!error)
                {
                    callback(null, {status: 1, message: "success"});
                } else
                {
                    callback(null, {status: 0, message: error.message});
                }
            });
        } catch (err) // catch errors
        {
            callback(null, {status: 0, message: err.message});
        }
    });
};

exports.update = function (query, update_data, callback)
{
    process.nextTick(function ()
    {
        notification.update(query, update_data, {multi: true}, function (error, data)
        {
            if (!error)
            {
                if (data.nModified > 0)
                {
                    callback(null, {status: 1, message: "success"});
                } else
                {
                    callback(null, {status: 2, message: "Notification data could not update"});
                }
            } else
            {
                callback(null, {status: 0, message: error.message});
            }

        });
    });
};

