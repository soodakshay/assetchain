var moment = require('moment');

exports.toLocalTime = function (date1, offset)
{
    return new Date(moment(date1).utcOffset(parseInt(offset)).format("YYYY-MM-DD HH:mm") + "Z");
};

exports.toUTCTime = function (date2, offset)
{
    return new Date(moment(date2).utcOffset(-parseInt(offset)).format("YYYY-MM-DD HH:mm") + "Z");
};




