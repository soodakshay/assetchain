var request = require("request-promise");
var util = require("util");


//list all users
exports.user_list = function (req, res, next) {
    var url = global.apiBaseUrl + 'user';
    var options = {
        method: 'get',
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
        res.render('manageError', {manage_user: "active",message: req.flash()});
    })
            .catch((error) => {
                if (error.error) {
                    error.message = error.error.message;
                }
                req.flash("error", error.message);
                res.render('manageError', {manage_user: "active",message: req.flash()});
            })
};


//fetch details of a single user
exports.user_details = function (req, res, next) {
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
        return next(error);
    })
            .catch((err) => {
                console.log(err)
                return next(err);
            })


}
    
//delete user
exports.user_delete = function (req, res, next) {
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
        req.flash('success', 'User deleted successfully')
        res.send(data);

    }, (error) => {
        return next(error);
    })
            .catch((err) => {
                console.log(err)
                return next(err);
            })
};


//change password
exports.change_password_get = function (req, res, next) {
    try {
        res.render('reset-password', {title: 'Reset-Password', message: req.flash()});
    } catch (err) {
        res.render('error', {error: err})
    }
};

//change password post
exports.change_password_post = function (req, res, next) {
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
        setTimeout(function () {
            res.redirect("/users/change_password")
        }, 4000);
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
};

//change user status  active /inactive
exports.change_user_status = function (req, res, next) {
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
        console.log("data***************************");
        console.log((util.inspect(data, {depth: null})));
        console.log(typeof data);
        req.flash("success", "Status changed successfully")
        res.send(data);

    }, (error) => {
        return next(error);
    })
            .catch((err) => {
                console.log(err)
                return next(err);
            })

};