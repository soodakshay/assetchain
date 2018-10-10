var express = require('express');
var router = express.Router();
var request = require('request-promise');
var util = require('util');

//*************list all users **************/
router.get('/', function (req, res, next) {
    var url = global.apiBaseUrl + 'user';
    var options = {
        method: 'post',
        json: true,
        url: url,
        headers: {"Authorization": req.session.user.token}
    }
    request(options).then((data) => {
        console.log("listing data***************************");
        console.log((util.inspect(data.users, {depth: null})));
        console.log(typeof data);
        res.render('list_users', {
            users_data: data.users,
            title: 'Users',
            manage_user: "active",
            message: req.flash()

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
            res.render('manageError', {manage_user: "active", message: req.flash()});
        }
    })
            .catch((error) => {
                if (error.error) {
                    error.message = error.error.message;
                }
                req.flash("error", error.message);
                res.render('manageError', {manage_user: "active", message: req.flash()});
            })
})

//get single request data
router.get('/view', function (req, res, next) {
    var url = global.apiBaseUrl + 'user/detail';
    var options = {
        method: 'get',
        json: true,
        url: url,
        qs: req.query,
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

    })
            .catch((err) => {
                console.log(err)
                return next(err);
            })


})



//delete user      
//router.delete('/:id', function (req, res, next) {
//    console.log("req.params************")
//    console.log(req.params);
//    var url = global.apiBaseUrl + 'user';
//    var options = {
//        method: 'delete',
//        body: req.params,
//        json: true,
//        url: url,
//        headers: {"Authorization": req.session.user.token}
//    }
//    request(options).then((data) => {
//        console.log("data***************************");
//        console.log((util.inspect(data, {depth: null})));
//        console.log(typeof data);
//        req.flash('success', 'User deleted successfully')
//        res.send(data);
//
//    }, (error) => {
//        return next(error);
//    })
//            .catch((err) => {
//                console.log(err)
//                return next(err);
//            })
//})
router.get('/delete/:id', function (req, res, next) {
    console.log("req.params************")
    console.log(req.params);
    var url = global.apiBaseUrl + 'user';
    var options = {
        method: 'delete',
        body: req.params,
        json: true,
        url: url,
        headers: {"Authorization": req.session.user.token}
    }
    request(options).then((data) => {
        console.log("data***************************");
        console.log((util.inspect(data, {depth: null})));
        console.log(typeof data);
        req.flash('success', 'User deleted successfully');
        res.redirect('/users');

    }, (error) => {
        if (error.error) {
            error.message = error.error.message;
        }
        req.flash("error", error.message);
        if (error.statusCode == 401) {
            req.session.user = "";
            res.redirect('/')
        } else {
            res.render('manageError', {manage_user: "active", message: req.flash()});
        }
    })
            .catch((err) => {
                console.log(err)
                return next(err);
            })
})



//change password form
router.get("/change_password", function (req, res, next) {
    try {
        res.render('reset-password', {title: 'Reset-Password', message: req.flash()});
    } catch (err) {
        res.render('error', {error: err})
    }
});

//change password saved
router.post("/change_password/:id", function (req, res, next) {
    //res.send(req.body);
    req.body.id = req.params.id;
    var url = global.apiBaseUrl + 'user/change-password';
    var options = {
        method: 'put',
        body: req.body,
        json: true,
        url: url,
        headers: {"Authorization": req.session.user.token}
    }
    request(options).then((data) => {
        console.log("data***************************");
        console.log((util.inspect(data, {depth: null})));
        console.log(typeof data);
        req.flash("success", "Password changed")
//        setTimeout(function () {
        res.redirect("/users/change_password")
//        }, 4000);
//        res.send(data);
    }, (error) => {
        req.flash("error", error.message);
        res.redirect('/users/change_password')
        //return next(error);
    })
            .catch((err) => {
                console.log(err)
                return next(err);
            })
});


//change user status
router.put('/:id', function (req, res, next) {
    req.body.id = req.params.id
    if (req.body.user_status == 1)
        req.body.user_status = false;
    else
        req.body.user_status = true;

    console.log(req.body);

    var url = global.apiBaseUrl + 'user/change-user-status';
    var options = {
        method: 'put',
        body: req.body,
        json: true,
        url: url,
        headers: {"Authorization": req.session.user.token}
    }
    request(options).then((data) => {
        console.log("user status data***************************");
        console.log((util.inspect(data, {depth: null})));
        console.log(typeof data);
        req.flash("success", "Status changed successfully")
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
    var url = global.apiBaseUrl + 'user';
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
    request(options).then((data) => {
        console.log("listing data***************************");
        console.log((util.inspect(data.users, {depth: null})));
        console.log(typeof data);
        res.render('user_list_table', {
            users_data: data.users,
            title: 'Users',
            manage_user: "active",
            message: req.flash()

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
//        res.render('manageError', {manage_user: "active", message: req.flash()});
    })
            .catch((error) => {
                if (error.error) {
                    error.message = error.error.message;
                }
                req.flash("error", error.message);
                res.render('manageError', {manage_user: "active", message: req.flash()});
            })


})



module.exports = router;
