var express = require('express');
var router = express.Router();
var request = require("request-promise");
var util = require("util");

//get notification route
router.get('/', function (req, res, next) {
    var url = global.apiBaseUrl + 'notifications';
    var options = {
        method: 'get',
        json: true,
        url: url,
        headers: {"Authorization": req.session.user.token}
    }
    request(options).then((data) => {
        console.log("data***************************");
        console.log((util.inspect(data, {depth: null})));
        console.log(typeof data);
        res.send(data);

    }, (error) => {

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
            .catch((error) => {
                if (error.error) {
                    error.message = error.error.message;
                }
                req.flash("error", error.message);

                res.render('manageError', {manage_request: "active", message: req.flash()});
            })
});



router.put("/accept/handover", function (req, res, next) {
    console.log("-----------------------------------------------------------------")
    console.log(req.body);

    var url = global.apiBaseUrl + 'request/handover-action';
    var options = {
        method: 'put',
        json: true,
        url: url,
        body: req.body,
        headers: {"Authorization": req.session.user.token}
    }
    request(options).then((data) => {
        console.log("data***************************");
        console.log((util.inspect(data, {depth: null})));
        console.log(typeof data);
        req.flash("success", "handover request is accepted");
        res.send(data);

    }, (error) => {
        console.log("data cgggf***************************");
//        if (error.error) {
//            error.message = error.error.message;
//        }
//        req.flash("error", error.message);
//
//        res.status(500).send(error);
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
            .catch((error) => {
                if (error.error) {
                    error.message = error.error.message;
                }
                console.log("data error***************************");
                req.flash("error", error.message);

                res.status(500).send(error);
            })

})
module.exports = router;