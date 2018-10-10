// Set timeout variables.
var timoutNow = 1800000; // Timeout in 30 mins.
var logoutUrl = "/logout" // URL to logout page.

var timeoutTimer;
// Start timers.
function StartTimers() {
    timeoutTimer = setTimeout("IdleTimeout()", timoutNow);
}

// Reset timers.
function ResetTimers() {
    clearTimeout(timeoutTimer);
    StartTimers();
}

// Logout the user.
function IdleTimeout() {
    window.location = logoutUrl;
}


Metronic.init(); // init metronic core componets
Layout.init(); // init layout
Index.init();
Tasks.initDashboardWidget();



//on load elements

jQuery(document).ready(function () {
   
//stop loader
//    document.getElementById("preLoader").style.display = "none";
//    $('#asset_request_count').hide();
    var d = new Date();
    var n = d.getFullYear();
    $("#year").html(n);

    //            document.getElementById("preLoader").style.width = "0%";
    $("meta[name='timezone_custom']").attr("content", moment.tz.guess());
    $.cookie("time_zone_name", moment.tz.guess());


    // handle sidebar show/hide
    var handleBlocksHideShow = function () {
        let find = $('.page-sidebar-menu').hasClass('page-sidebar-menu-closed');
        //                alert(find);
        if (find) {
            $('.blocks-new').hide();
        } else {
            $('.blocks-new').show();
        }
    }
    handleBlocksHideShow();
    $(document).on("click", ".blockshow", function () {
        handleBlocksHideShow();
    })


    //ajax setup
    $.ajaxSetup({
        beforeSend: function () {
            document.getElementById("preLoader").style.display = "block";
        },
        error: function (xhr, status, error) {
            alertify.set('notifier', 'position', 'top-right');
            if (xhr.responseJSON) {

                alertify.error("Error : " + xhr.responseJSON.error);
            } 
            // else if(xhr.status == 0){
            //     console.log(xhr.status);
            // }
            else {
                console.log(xhr);
                alertify.error("An error occured: " + xhr.status + " " + xhr.statusText);
                // alertify.error(xhr.statusText);
            }
            //                            
        }
        ,
        complete: function (xhr, stat) {
            document.getElementById("preLoader").style.display = "none";
        }
        //    timeout: 30000 // sets timeout to 3 seconds
    });


    //            $("#special_effect").click(function () {
    console.log("porrrrttt : " + port_number);
   // console.log({{user}});
  
    var socket_url = url + port_number;
    var socket = io(socket_url);
//  var socket = io("http://assetchainapi.debutinfotech.com:3002");
//                var socket = io("http://192.168.0.99:3001");
//                var socket = io("http://112.196.27.243:3002/");


    //block added event
    socket.on("block_added", (result) => {
        console.log("result");
//        console.log(result);
        //set dynamic blocks
        var height = result.height;
        var length = height - 7;
        var content = "";
        for (var j = 0, i = length; i < height; i++) {
            var id = "block" + j;
            content += '<span id=' + id + ' class="col-md-4 col-sm-4 col-xs-4 manage-space"><a class="blockvalueinner" href="/block/' + i + '"> #' + i + '</a></span>'
            j++;
        }
        $(".fullrowfrblocks").html(content);
        $("#block0").animate({
            right: '70%',
        }, "slow");
        $("#block1").animate({
            right: '30%',
        }, "slow");
        $("#block2").animate({
            right: '35%',
        }, "slow");
        $("#block3").animate({

            left: '60%',
            bottom: '33'

        }, "slow");
        $("#block4").animate({

            right: '30%',
        }, "slow");
        $("#block5").animate({

            right: '35%',
        }, "slow");
        $("#block6").animate({

            left: '60%',
            bottom: '33'

        }, "slow");
        console.log("block_added result ==================================");
    });
    //request added event
    var count = 0;
    socket.on("request_added", (data) => {
        // console.log("data................................");
        // console.log(data)
        $.ajax({
            url: '/requests/filter',
            type: 'POST',
            beforeSend: function () {

            },
            success: function (result) {
                alertify.set('notifier', 'position', 'top-right');
                // alertify.success('!!!! Request added !!!!');
                 alertify.success(data.first_name + " " +data.last_name +" has requested for an asset.");
                console.log("request_added result ==============================");
                console.log(result);
                let requrl = "" ;
                if($("#url")){
                    requrl = $("#url").val();
                }
                
                console.log(requrl)
                if(requrl == '/request/'){
                      $("#ajaxResponce").html(result);
                }
               
              
                count++;
                $('#asset_request_count').text(count);
                $('#asset_request_count').css('display:block;');
            },
            error: function (err) {
                console.log(err);
            },
            complete: function (xhr, stat) {

            }
        });
    });
    //handover action from user
    socket.on("handover_action", (data) => {
        // alert("handover_action");
        console.log("handover_action");
        // get_request();
        $.ajax({
            url: '/requests/filter',
            type: 'POST',
            beforeSend: function () {

            },
            success: function (result) {
                console.log("handover result ========================================== ");
                // console.log(result);
                $("#ajaxResponce").html(result);
            },
            error: function (xhr) {
                console.log(xhr);
            },
            complete: function (xhr, stat) {

            }

        });
    });

    //notification added
    socket.on("notification_added",(data) =>{
        console.log("notification added.");
        get_request();
    });


    //*****get browser time zone*************8/
    $("meta[name='timezone_custom']").attr("content", moment.tz.guess());
    //fade out the alert
    $(".alert").fadeOut(10000);
    $.cookie("time_zone_name", moment.tz.guess());

});


//feedback form
ibgSdk.init({
    token: '3e87a4c9d7b367a0c3b008f69e6fc53d'
});

        