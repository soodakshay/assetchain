$(document).ready(function () {
    var Login = function () {

        var handleLogin = function () {
            $('.login-form').validate({
                errorElement: 'span', //default input error message container
                errorClass: 'help-block', // default input error message class
                focusInvalid: false, // do not focus the last invalid input
                rules: {
                    email: {
                        required: true,
                        email: true
                    },
                    password: {
                        required: true
                    }
                },

                messages: {
                    email: {
                        required: "Email is required."
                    },
                    password: {
                        required: "Password is required."
                    }
                },

                invalidHandler: function (event, validator) { //display error alert on form submit   
                    $('.alert-danger', $('.login-form')).show();
                },

                highlight: function (element) { // hightlight error inputs
                    $(element)
                            .closest('.form-group').addClass('has-error'); // set error class to the control group
                },

                success: function (label) {
                    label.closest('.form-group').removeClass('has-error');
                    label.remove();
                },

                errorPlacement: function (error, element) {
                    error.insertAfter(element.closest('.input-icon'));
                },

                submitHandler: function (form) {
                    form.submit();
                }
            });

            $('.login-form input').keypress(function (e) {
                if (e.which == 13) {
                    if ($('.login-form').validate().form()) {
                        $('.login-form').submit();
                    }
                    return false;
                }
            });
        }

        var handleForgetPassword = function () {
            $('.forget-form').validate({
                errorElement: 'span', //default input error message container
                errorClass: 'help-block', // default input error message class
                focusInvalid: false, // do not focus the last invalid input
                ignore: "",
                rules: {
                    email: {
                        required: true,
                        email: true
                    }
                },

                messages: {
                    email: {
                        required: "Email is required."
                    }
                },

                invalidHandler: function (event, validator) { //display error alert on form submit   

                },

                highlight: function (element) { // hightlight error inputs
                    $(element)
                            .closest('.form-group').addClass('has-error'); // set error class to the control group
                },

                success: function (label) {
                    label.closest('.form-group').removeClass('has-error');
                    label.remove();
                },

                errorPlacement: function (error, element) {
                    error.insertAfter(element.closest('.input-icon'));
                },

                submitHandler: function (form) {
                    form.submit();
                }
            });

            $('.forget-form input').keypress(function (e) {
                if (e.which == 13) {
                    if ($('.forget-form').validate().form()) {
                        $('.forget-form').submit();
                    }
                    return false;
                }
            });

            jQuery('#forget-password').click(function () {
                jQuery('.login-form').hide();
                jQuery('.forget-form').show();
            });

            jQuery('#back-btn').click(function () {
                jQuery('.login-form').show();
                jQuery('.forget-form').hide();
            });

        }

       

        return {
            //main function to initiate the module
            init: function () {

                handleLogin();
                handleForgetPassword();
                
            }

        };

    }();



    Metronic.init(); // init metronic core components
    Layout.init(); // init current layout
    Login.init();
    Demo.init();
    // init background slide one images 
//    $.backstretch([
//        "../../assets/admin/pages/media/bg/2.jpg"
//    ]);

});