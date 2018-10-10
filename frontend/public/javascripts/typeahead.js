$(document).ready(function () {

    /********for contact_name typehead search************/
    $('#search_by').typeahead({
        source: function (query, process) {
            var url;
            if ($("#filterUrl").val() === "/contact_us/")
            {
                url = '/contact_us/search_by';
            }
            if ($("#filterUrl").val() === "/users/")
            {
                url = '/users/search_by';
            }
            if ($("#filterUrl").val() === "/category/")
            {
                url = '/category/search_by';
            }
            if ($("#filterUrl").val() === "/pages/")
            {
                url = '/pages/search_by';
            }
            if ($("#filterUrl").val() === "/bottle_drives/")
            {
                url = '/bottle_drives/search_by';
            }
            if ($("#filterUrl").val() === "/reported_bottle_drives/")
            {
                url = '/reported_bottle_drives/search_by';
            }
            if ($("#filterUrl").val() === "/emailTemplate/")
            {
                url = '/emailTemplate/search_by';
            }
            if ($("#filterUrl").val() === "/bottle_drives/donors/")
            {
                url = '/bottle_drives/donors/search_by?drive_id=' + $("#drive_id").val();
            }
            if ($("#filterUrl").val() === "/states/")
            {
                url = '/states/search_by';
            }
            if ($("#filterUrl").val() === "/cities/")
            {
                url = '/cities/search_by';
            }
            return $.ajax({
                url: url,
                type: 'post',
                data: {name: query},
                success: function (data) {
                    if (data == 'unauthorised')
                        window.location = "/login";
                    else
                        return process(data);
                }
            });
        }
    });
    /********for category typehead search************/
    $('#category_name').typeahead({
        source: function (query, process) {
            return $.ajax({
                url: '/category/category_name',
                type: 'post',
                data: {name: query},
                success: function (data) {
                    if (data == 'unauthorised')
                        window.location = "/login";
                    return process(data);
                }
            });
        }
    });
    /********for promo_codes_name typehead search************/
    $('#promo_codes_name').typeahead({
        source: function (query, process) {
            return $.ajax({
                url: '/promo_codes/promo_codes_name',
                type: 'post',
                data: {code: query},
                success: function (data) {
                    if (data == 'unauthorised')
                        window.location = "/login";
                    return process(data);
                }
            });
        }
    });
});
