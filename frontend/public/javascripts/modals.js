$(document).ready(function () {
    $(document).on("click", "#get_email", function () {
        $('#sub_error_getEmail').text("");
    });
    
    $(document).on("click", "#get_otp", function () {
        $('#sub_error_getOtp').text("");
    });

    $('#change_get_email').click(function () {
        $('#sub_error_getEmail').text("");
        $('.error').text("");
        $('#getEmail-form').trigger("reset");

    });

    $('#resend_otp_btn').click(function () {
        $('#get_otp').val("");
        $('.error').text("");
    });

    $.validator.addMethod("match", function (value, element, param) {
        return this.optional(element) || param.test(value);
    }, "Entry Invalid.");


    //form validation for get email popup
    $("#getEmail-form").validate({
        rules: {
            email: {
                required: true,
                match: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,5}))$/
            }
        },
        messages: {
            email: {
                required: "Please enter the email.",
                match: "Please enter a valid email id."
            }
        }
    });


    //form validation for get otp popup
    $("#getOtp-form").validate({
        rules: {
            otp: {
                required: true
            }
        },
        messages: {
            otp: {
                required: "Please enter the otp."
            }
        }
    });

    $('#email_verify_btn').click(function () {
        var email_id = $('#get_email').val();

        if ($('#getEmail-form').valid())
        {
            $.ajax({
                url: '/dashboard/send_otp',
                type: "POST",
                data: {temp_email: email_id},
                dataType: "JSON",
                success: function (result)
                {
                    if (result == 'unauthorised')
                        window.location = "/login";
                    else if (result.status == 1)
                    {
                        //bootbox.alert('some problem occur try again.....');
                        $("#sub_error_getEmail").text("");
                        $('#email_verify').modal('hide');
                        $('#otp_verify').modal('show');
                    } else
                    {
                        $("#sub_error_getEmail").text(result.message);

                    }
                }
            });
        }
    });

    $('#resend_otp_btn').click(function () {
        $.ajax({
            url: '/dashboard/resend_otp',
            type: "GET",
            dataType: "JSON",
            success: function (result)
            {
                if (result == 'unauthorised')
                    window.location = "/login";
                else
                {
                    $("#sub_error_getOtp").text(result.message);
                }
            }
        });
    });

    $('#otp_send_btn').click(function () {
        var otp = $('#get_otp').val();
        if ($('#getOtp-form').valid())
        {
            $.ajax({
                url: '/otp_verification',
                type: "POST",
                data: {otp_code: otp},
                dataType: "JSON",
                success: function (result)
                {
                    if (result == 'unauthorised')
                        window.location = "/login";
                    else if (result.status == 1)
                    {
                        $("#sub_error_getOtp").text("");
                        $('#otp_verify').modal('hide');
                        $('#email_link').modal('show');
                    } else
                    {
                        $("#sub_error_getOtp").text(result.message);
                    }
                }
            });
        }
    });

});

