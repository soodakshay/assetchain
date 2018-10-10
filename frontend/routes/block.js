var block_controller = require('../controllers/blockController.js');
var moment = require('moment');
var moment_tz = require('moment-timezone');

var express = require('express');
var router = express.Router();
var request = require("request-promise");
var util = require("util");


//get block height
router.get('/', function (req, res, next) {

    console.log(req.session.user.token);
    var url = global.apiBaseUrl + 'network/height';
    var options = {
        method: 'get',
        json: true,
        url: url,
        headers: {"Authorization": req.session.user.token}

    }


    request(options).then((data) => {
        console.log("data***************************");
        console.log(util.inspect(data, {depth: null}));
        console.log(typeof data);
        if (req.query.socket) {
            res.send(data);
        } else {
            res.render('blockInfo', {block_height: "active", block: data, title: "Blocks", message: req.flash()});

        }
    }, (error) => {
        if (error.error) {
            error.message = error.error.message;
        }
        req.flash("error", error.message);
        if (error.statusCode == 401) {
            req.session.user = "";
            res.redirect('/')
        } else {
            res.render('manageError', {block_height: "active", message: req.flash()});
        }
    }).catch((error) => {
        if (error.error) {
            error.message = error.error.message;
        }
        req.flash("error", error.message);
        res.render('manageError', {block_height: "active", message: req.flash()});
    })


});



//get transaction details
router.get('/:number', function (req, res, next) {
    console.log("token************88")
    console.log(req.session.user.token)
    console.log(req.params.number);

    var url = global.apiBaseUrl + 'network/block';
    var options = {
        method: 'get',
        json: true,
        url: url,
        qs: {number: req.params.number},
        headers: {"Authorization": req.session.user.token}

    }  
    request(options).then((data) => {        
        res.render('view_transaction', {block_height: "active", transaction: data, title: "Transactions", message: req.flash(), moment: moment, moment_tz: moment_tz, timezone: req.cookies.time_zone_name});
    }, (error) => {
        console.log("error---------------------------------");
        if (error.error) {
            error.message = error.error.message
        }
        req.flash("error", error.message);
        if (error.statusCode == 401) {
            req.session.user = "";
            res.redirect('/')
        } else {
            res.redirect("/block");
        }
    }).catch((error) => {
        if (error.error) {
            error.message = error.error.message
        }
        req.flash("error", error.message);
        res.redirect("/block");
    })


});

module.exports = router;