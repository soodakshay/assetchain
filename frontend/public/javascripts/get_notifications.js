jQuery(document).ready(function () {

    /* for requests  notifications*/
     get_request();
    // setInterval(function () {
    //     get_request();
    // }, 20000);



//get listing for notification
    $(document).on('click', '#notifications', function () {
        get_request();

    });




    //accept the handover request by admin in notification
    $(document).on('click', 'a.handover', function (event) {
        event.preventDefault();
        var href = $(this).attr('href');
//        alert(href)
        var notification_id = $(this).attr('data-notification');
        if (!notification_id)
        {
            alert("notification id missing")
            return;
        }
//        alert(notification_id)
        var asset_id = $(this).attr('data-asset');
//        alert(asset_id)
        var request_id = parseInt($(this).attr('data-req-type'), 10);
//        alert(request_id)
        var action = parseInt($(this).attr('data-action'), 10);
//        alert(action)
        var old_request_id = $(this).attr('old-request-id');
//       alert(old_request_id)

        document.getElementById("preLoader").style.width = "100%";
        $.ajax({
            url: href,
            data: {"notification_id": notification_id, "asset_id": asset_id, "req_type": request_id, "action": action, "old_request_id": old_request_id},
            type: 'put',
            success: function (result) {
//                setTimeout(function () {                  
                window.location = '/requests'
//                }, 4000)
            }
//            ,
//            error: function (xhr) {
//                console.log("An error occured: " + xhr.status + " " + xhr.statusText);
////                setTimeout(function () {
//                    window.location = '/requests'
////                }, 4000)
            //            }
        });

    });


});

//function is called after every 20 seconds
function  get_request() {
    $.ajax({
        url: '/notification',
        type: 'GET',
        beforeSend: function () {

        },
        success: function (data) {
            var content = '';
            var length = data.docs.length;
            if (length == 0) {
                content += '<li class="details" style="background-color:#D7D7D7; padding:2px;">No Pending notification</li>';
            } else {
                $('#notification_count').text(length);
                for (let i = 0; i < length; i++) {

                    url = "notification/accept/handover";
                    var action = 0;
                    var req_type = 1;
                    var old_request_id = data.docs[i].old_request_id;
                    var asset_id = data.docs[i].asset.id;
                    var notification_id = data.docs[i]._id;
                    var message = '<span><strong>' + data.docs[i].sender.first_name + " " + data.docs[i].sender.last_name + '</strong>' + " wants to handover the " + '<strong>' + data.docs[i].asset.name + '</strong></span>'
                    content += '<li class="details""><span class="label label-sm label-success"><i class="fa fa-user"></i></span>' + " " + message + " " + '<span><a class="btn btn-sm btn-success handover notification_accept " href=' + url + " " + 'data-notification=' + notification_id + " " + 'old-request-id=' + old_request_id + " " + 'data-asset=' + asset_id + " " + 'data-req-type=' + req_type + " " + 'data-action=' + action + " " + '>Accept</a></span></li>';

                }
            }
            $('#notification_content').html(content);
        },
        error: function (xhr, status, error) {
            alertify.set('notifier', 'position', 'top-right');
            if (xhr.responseJSON) {

                alertify.error("Error : " + xhr.responseJSON.error);
            } else {
                console.log(xhr.status);
                alertify.error("You are currently offline. ");

            }

        },
        complete: function () {

        }
    })
}
   
