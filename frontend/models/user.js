// require mongoose module for mongoose connection
var mongoose = require('mongoose');
var user = mongoose.model('user');

exports.findOne = function (query, callback)
{
    process.nextTick(function ()
    {
        user.findOne(query, {__v: 0, updated_at: 0}, function (error, data)
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

exports.findOne_projection_population = function (query, projection, populate_query, callback)
{
    process.nextTick(function ()
    {
        query.is_deleted = 0;
        user.findOne(query, projection).populate(populate_query).exec(function (error, data)
        {
            if (!error)
            {
                if (data !== null)
                {
                    data = JSON.parse(JSON.stringify(data));
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

exports.find_projection_population = function (query, projection, populate_query, sort_condition, callback)
{
    process.nextTick(function ()
    {
        query.is_deleted = 0;
        user.find(query, projection).populate(populate_query).sort(sort_condition).exec(function (error, data)
        {
            if (!error)
            {
                if (data !== null)
                {
                    data = JSON.parse(JSON.stringify(data));
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

exports.find = function (query, sort_condition, callback)
{
    process.nextTick(function ()
    {
        query.is_deleted = 0;
        user.find(query).sort(sort_condition).exec(function (error, data) {
            if (!error)
            {
                if (data.length !== 0)
                {
                    data = JSON.parse(JSON.stringify(data));
                    callback(null, {status: 1, message: "success", data: data});
                } else
                {
                    callback(null, {status: 2, message: "Users not found"});
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
        query.is_deleted = 0;
        user.find(query).count().exec(function (error, data) {
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
exports.find_with_pagination = function (query, sort_condition, skip, limit, options, callback)
{
    process.nextTick(function ()
    {
        user.find(query).sort(sort_condition).skip(skip).limit(limit).paginate(options, function (error, data)
        {
            if (!error)
            {
                if (data.length !== 0)
                {
                    data = JSON.parse(JSON.stringify(data));
                    callback(null, {status: 1, message: "success", data: data});
                } else
                {
                    callback(null, {status: 2, message: "Users not found"});
                }
            } else
            {
                callback(null, {status: 0, message: error.message});
            }
        });
    });
};
exports.find_with_pagination_projection = function (query, projection, population, sort_condition, skip, limit, options, callback)
{
    process.nextTick(function ()
    {
        user.find(query, projection).sort(sort_condition)
                .populate(population)
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
                    callback(null, {status: 2, message: "Users not found"});
                }
            } else
            {
                callback(null, {status: 0, message: error.message});
            }
        });
    });
};

exports.findOne_with_projection = function (query, projection, callback)
{
    process.nextTick(function ()
    {
        query.is_deleted = 0;
        user.findOne(query, projection).exec(function (error, data)
        {
            if (!error)
            {
                if (data.length !== 0)
                {
                    data = JSON.parse(JSON.stringify(data));
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

exports.find_with_population = function (query, populate_data, sort_condition, callback)
{
    process.nextTick(function ()
    {
        try
        {
            query.is_deleted = 0;
            user.find(query).populate(populate_data).sort(sort_condition).exec(function (error, data) {
                if (!error)
                {
                    if (data.length !== 0)
                    {
                        data = JSON.parse(JSON.stringify(data));
                        callback(null, {status: 1, message: "success", data: data});
                    } else
                    {
                        callback(null, {status: 2, message: "Users not found"});
                    }
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

exports.find_with_projection = function (query, projection, callback)
{
    process.nextTick(function ()
    {
        try
        {
            query.is_deleted = 0;
            query.type = 2;
            user.find(query, projection, function (error, data)
            {
                if (!error)
                {
                    if (data.length !== 0)
                    {
                        data = JSON.parse(JSON.stringify(data));
                        callback(null, {status: 1, message: "success", data: data});
                    } else
                    {
                        callback(null, {status: 2, message: "Users not found"});
                    }
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

exports.find_with_near_geometry = function (coordinates, distance, condition, projection, skip_count, limit_stylist, callback)
{
    process.nextTick(function ()
    {
        try
        {
            user.find({$and: [{business_address_coordinates: {$near: {$geometry: {type: "Point", coordinates: coordinates}, $maxDistance: distance}}, is_deleted: 0, status: 1}, condition]}, projection).skip(skip_count).limit(limit_stylist).exec(function (error, data)
            {
                if (!error)
                {
                    data = JSON.parse(JSON.stringify(data));
                    callback(null, {status: 1, message: "success", data: data});
                } else
                {
                    console.log(error);
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
        try
        {
            query.is_deleted = 0;
            user.update(query, update_data, {multi: true}, function (error, data)
            {
                if (!error)
                {
                    if (data.nModified > 0)
                    {
                        callback(null, {status: 1, message: "success"});
                    } else
                    {
                        callback(null, {status: 2, message: "Users data could not update"});
                    }
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

exports.remove = function (query, callback)
{
    process.nextTick(function ()
    {
        try
        {
            user.remove(query, function (error, data)
            {
                if (!error)
                {
                    console.log("user removed");
                    console.log(data.result);
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