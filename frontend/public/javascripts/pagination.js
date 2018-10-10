
$(document).on("click", ".pagination a", function () {
    var page = $(this).attr("page");
    var str = $("form").serialize();
    var url = $("#url").val();
    document.getElementById("preLoader").style.width = "100%";
    $.ajax({
        url: url + '?' + str,
        type: "GET",
        data: {page: page},
        success: function (result) {
            document.getElementById("preLoader").style.width = "0%";
            if (result == 'unauthorised')
            {
                window.location = "/login";
            } else
            {

                $("#ajaxResponce").html(result);
                Metronic.init(); // init metronic core components
            }
        }
    });
});

