var fcm = require('fcm-push'); // project server key never change
var config = require('../config');
var fcm_push = new fcm(config.push_notification.server_key);


/*
 * @params {token} -> token is the device token
 * @params {data} -> data is the notification payload 
 * @params {user_id} -> user id
 * @params {device_type} -> user device type
 * @return success or failure
 */
exports.send_notification = function (token, data, user_id, device_type)
{
    var badge_count = 1;
    var message = {
        to: token,
        priority: "high",
        data: data
    };
    
    if (device_type === 2)
    {
        message.notification = {
            'title': 'Bottle Driver',
            'body': data.body,
            'badge': badge_count,
            'content-available': "true"
        };
    }
    console.log(message);
    fcm_push.send(message, function (err, response) {
        if (err) {
            console.log("notification error");
            console.log(err);
        } else {
            console.log("notification send");
            console.log(response);
        }
        return(1);
    });
};

/*
 * @params {data} -> data is the array of notification payload and device token
 * @return success or failure
 */
exports.send_notification_to_all = function (data)
{
    for (var i = 0; i < data.length; i++)
    {
        var badge_count = 1;
        
        var message = {
            to: data[i].token,
            priority: "high",
            data: data[i].notification_data
        };
        
        if (data[i].device_type === 2)
        {
            message.notification = {
                'title': 'Bottle Driver',
                'body': data[i].notification_data.body,
                'badge': badge_count,
                'content-available': "true"
            };
        }
        console.log("message");
        console.log(message);
        fcm_push.send(message, function (err, response) {
            if (err) {
                console.log("notification error");
                console.log(err);
            } else {
                console.log("notification send");
                console.log(response);
            }
        });
    }
    return(1);
};

