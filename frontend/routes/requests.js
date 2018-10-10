var express = require('express');
var router = express.Router();
var request = require('request-promise');
var util = require('util')
var moment = require('moment');
var moment_tz = require('moment-timezone');



//list requests
router.get('/', function (req, res, next) {
    var url = global.apiBaseUrl + 'request/all-requests';
    var options = {
        method: 'post',
        json: true,
        url: url,
        headers: {"Authorization": req.session.user.token}
    }
    request(options).then((data) => {
        console.log((util.inspect(data, {depth: null})));
//        console.log("rrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr")
//        console.log(req.flash())
        var flash_message = req.flash();
        res.render('list_requests', {
            requests: data.requests,
            title: 'Requests',
            manage_request: "active",
            message: flash_message,
            moment: moment,
            moment_tz: moment_tz,
            timezone: req.cookies.time_zone_name
        });
    }, (error) => {
        if (error.error) {
            error.message = error.error.message;
        }
        req.flash("error", error.message);
        if (error.statusCode == 401) {
            req.session.user = "";
            res.redirect('/')
        } else {

            res.render('manageError', {manage_request: "active", message: req.flash()});
        }

    })
            .catch((error) => {
                if (error.error) {
                    error.message = error.error.message;
                }
                req.flash("error", error.message);
                res.render('manageError', {manage_request: "active", message: req.flash()});
//                req.flash("error", error.message);
//                res.render('manageError', {manage_request: "active", message: error.message});
            })

});

//get single request data
router.get('/view', function (req, res, next) {
    console.log(req.query);
    var url = global.apiBaseUrl + 'request/fetch-request/' + req.query.id;
    var options = {
        method: 'get',
        json: true,
        url: url,
        headers: {"Authorization": req.session.user.token}
    }
    request(options).then((data) => {
        console.log(" updated data***************************");
        console.log(data);
        console.log(typeof data);
        res.send(data);

    }, (error) => {
        console.log(error)
        console.log("error")
        //        console.log(error.statusCode);
        //        console.log(error.error.message);
        if (error.error) {
            error.message = error.error.message;
            error.status = error.statusCode;
        }
        req.flash("error", error.message);
        if (error.statusCode == 401) {
            req.session.user = "";
            res.redirect('/')
        } else {
            res.status(error.status).send({error: error.message});
        }
//        if (error.error) {
//            error.message = error.error.message;
//        }
//        console.log(error.message);
//        req.flash("error", error.message);
//        res.redirect('/requests');
    })
            .catch((err) => {
                console.log(err)
                return next(err);
            })

});



// handover asset click
router.put('/view/handover', function (req, res, next) {

    console.log("req.body----------------")
    console.log(req.body)
    var request_data = {};
    var url, options;
    request_data.req_type = req.body.request_type;
    console.log(typeof request_data.req_type)
    request_data.request_id = req.body.id;
    url = global.apiBaseUrl + 'request/fetch-request/' + req.body.id;
    options = {
        method: 'get',
        json: true,
        url: url,
        headers: {"Authorization": req.session.user.token}
    }
    request(options).then((data) => {
        console.log("updated data***************************");
        console.log((util.inspect(data, {depth: null})));
        console.log(typeof data);
        request_data.description = data.data.request.description;
        request_data.start_timing = data.data.request.start_timing;
        request_data.end_timing = data.data.request.end_timing;
        request_data.priority = data.data.request.priority;
        request_data.user = data.data.request.user;
        request_data.asset = data.data.request.asset;
        //next request
        url = global.apiBaseUrl + 'request/handover';
        options = {
            method: 'put',
            json: true,
            url: url,
            body: request_data,
            headers: {"Authorization": req.session.user.token}
        }
        return request(options);

    })
            .then((data) => {
                console.log(" updated data***************************");
                console.log(data);
                console.log(typeof data);
                req.flash('success', 'Handover request has been send to the user ');
                res.send(data);

            })
            .catch((error) => {
                console.log(error)
                console.log("error")
                //        console.log(error.statusCode);
                //        console.log(error.error.message);
                if (error.error) {
                    error.message = error.error.message;
                    error.status = error.statusCode;
                }
                res.status(error.status).send({error: error.message});
//                console.log(error);
//                if (error.error) {
//                    error.message = error.error.message;
//                }
//                console.log(error.message);
//                req.flash("error", error.message);
//                console.log("flasssssssssssssssssssssssssssssss")
//
//                res.send({"success": 1});
//                res.redirect('/requests')
            });


});

//delete requests
router.get('/delete/:id', function (req, res, next) {

    var url = global.apiBaseUrl + 'request/' + req.params.id;
    var options = {
        method: 'delete',
        json: true,
        url: url,
        headers: {"Authorization": req.session.user.token}
    }
    request(options).then((data) => {
        res.redirect('/requests');

    }, (error) => {
        if (error.error) {
            error.message = error.error.message;
        }
        req.flash("error", error.message);
      
        if (error.statusCode == 401) {
            req.session.user = "";
            res.redirect('/')
        } else {

        res.render('manageError', {manage_request: "active", message: req.flash()});
    }
    })
            .catch((err) => {
                console.log(err)
                return next(err);
            })

});
//router.delete('/:id', function (req, res, next) {
//
//    var url = global.apiBaseUrl + 'request/' + req.params.id;
//    var options = {
//        method: 'delete',
//        json: true,
//        url: url,
//        headers: {"Authorization": req.session.user.token}
//    }
//    request(options).then((data) => {
//        req.flash("success", "Request deleted successfully");
//
//    }, (error) => {
//        if (error.error) {
//            error.message = error.error.message;
//        }
//        console.log(error.message);
//        req.flash("error", error.message);
//        res.redirect('/requests');
//    })
//            .catch((err) => {
//                console.log(err)
//                return next(err);
//            })
//
//});

//change status 
router.put('/status/:id', function (req, res, next) {
    console.log("req.params************")
    console.log(req.params.id);
    req.body.id = req.params.id
    console.log(req.body);
    var url = global.apiBaseUrl + 'request/update-status';
    var options = {
        method: 'put',
        body: req.body,
        json: true,
        url: url,
        headers: {"Authorization": req.session.user.token}
    }
    request(options).then((data) => {
        req.flash("success", "Request status updated successfully ")
        res.send(data);
    }, (error) => {
        console.log(error)
        console.log("error")
        //        console.log(error.statusCode);
        //        console.log(error.error.message);
        if (error.error) {
            error.message = error.error.message;
            error.status = error.statusCode;
        }
        res.status(error.status).send({error: error.message});
//        return next(error);
    })
            .catch((err) => {
                console.log(err)
                return next(err);
            })


});


//search sort
router.post('/filter', function (req, res, next) {

    console.log("reqqqqqqqqqqqqqqqqqq")
//    console.log(req.body);
    var url = global.apiBaseUrl + 'request/all-requests';
    var options = {
        method: 'post',
        json: true,
        url: url,
        headers: {"Authorization": req.session.user.token}
    }
    if (req.body.field_type) {
        var filter = {};
        filter.field_type = req.body.field_type;
        filter.sort_type = req.body.sort_type;
        console.log(filter);
        options.body = filter;
    }
    // res.send(req.body);

    request(options).then((data) => {
        console.log((util.inspect(data, {depth: null})));
//        console.log("rrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr")
//        console.log(req.flash())
        var flash_message = req.flash();
        res.render('request_list_table', {
            requests: data.requests,
            title: 'Requests',
            manage_request: "active",
            message: flash_message,
            moment: moment,
            moment_tz: moment_tz,
            timezone: req.cookies.time_zone_name
        });
    }, (error) => {
        console.log(error)
        console.log("error")
        //        console.log(error.statusCode);
        //        console.log(error.error.message);
        if (error.error) {
            error.message = error.error.message;
            error.status = error.statusCode;
        }
        res.status(error.status).send({error: error.message});
//        if (error.error) {
//            error.message = error.error.message;
//        }
//        req.flash("error", error.message);
//
//        res.render('manageError', {manage_request: "active", message: req.flash()});

    })
            .catch((error) => {
                if (error.error) {
                    error.message = error.error.message;
                }
                req.flash("error", error.message);
                res.render('manageError', {manage_request: "active", message: req.flash()});
            })


})

//get asset details on clicking asset name
router.get("/asset_details", function (req, res, next) {
    console.log("---------------------")
    console.log(req.query);
    var url = global.apiBaseUrl + 'request/requests/' + req.query.id;
    var options = {
        method: 'get',
        json: true,
        url: url,
        headers: {"Authorization": req.session.user.token}
    }
    request(options).then((data) => {
        console.log(" updated data***************************");
        console.log(data);
        console.log(typeof data);
        res.send(data);

    }, (error) => {
        console.log(error)
        console.log("error")
        //        console.log(error.statusCode);
        //        console.log(error.error.message);
        if (error.error) {
            error.message = error.error.message;
            error.status = error.statusCode;
        }
         req.flash("error", error.message);
        if (error.statusCode == 401) {
            req.session.user = "";
            res.redirect('/')
        } else {
        res.status(error.status).send({error: error.message});
    }
//        if (error.error) {
//            error.message = error.error.message;
//        }
//        console.log(error.message);
//        req.flash("error", error.message);
//        res.redirect('/requests');
    })
            .catch((err) => {
                console.log(err)
                return next(err);
            })

})


module.exports = router;