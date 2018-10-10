var express = require('express');
var router = express.Router();
var request = require('request-promise');
var util = require('util')



//************* GET method to render login form *******/
router.get('/', function (req, res, next)
{
//    console.log("req")
//    console.log(req.cookies.time_zone_name)
//    console.log(typeof req.headers.cookie);
//    console.log(req.session);
    try {
        if (req.session.user) {

            res.redirect('/dashboard');
        } else {

            res.render('login', {title: "Login", message: req.flash()});
        }
    } catch (err) {
        res.render("error", {error: err});
    }
});


/******* POST method to login form ******/
router.post('/login', function (req, res, next)
{

    req.body.type = "1";
    var url = global.apiBaseUrl + 'user/login';
    var options = {
        method: 'post',
        body: req.body,
        json: true,
        url: url
    }
    request(options).then((result) => {
        console.log("data***************************");
        console.log((util.inspect(result, {depth: null})));
        console.log(typeof result);
        req.session.user = result.data;
        req.session.user.port = result.port;
        req.session.user.id = result.id;
        console.log(req.session);

        res.redirect('/dashboard');
    }, (error) => {
        console.log("error---------------------------------");
        console.log(error);
        if (error.error) {
            error.message = error.error.message;
        }
      
        req.flash("error", error.message);
        if (error.statusCode == 401) {
            req.session.user = "";
            res.redirect('/')
        } else {
            res.redirect('/');
        }
        // return next(error);
    }).catch((error) => {
        console.log("catch---------------------------------");
        console.log(error);
        if (error.error) {
            error.message = error.error.message;
        }
        req.flash("error", error.message);
        res.redirect('/');
    });


});

//user reset password
router.post('/forgetPassword', function (req, res, next) {

    var url = global.apiBaseUrl + 'user/forget-password';
    var options = {
        method: 'put',
        body: req.body,
        json: true,
        url: url
    }
    request(options).then((data) => {
        console.log("data***************************");
        console.log((util.inspect(data, {depth: null})));
        console.log(typeof data);
        req.flash("success", "Email has been sent");
        res.redirect('/index');

    }, (error) => {
        req.flash("error", "No such email exists");
        res.redirect('/');
    })
            .catch((err) => {
                console.log(err)
                return next(err);
            })

});
module.exports = router;
