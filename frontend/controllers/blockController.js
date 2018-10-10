var request = require('request-promise');
var util = require('util');


//get all blocks and height
exports.block_get=function (req, res, next) {
    console.log("token************88")
    console.log(req.session.user.token)
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
        res.render('blockInfo', {block_height: "active", block: data, title: "Blocks", message: req.flash()});
    }, (error) => {
        if (error.error) {
            error.message = error.error.message;
        }
        req.flash("error", error.message);
        res.render('manageError', {block_height: "active", message: req.flash()});
    }).catch((error) => {
        if (error.error) {
            error.message = error.error.message;
        }
        req.flash("error", error.message);
        res.render('manageError', {block_height: "active", message: req.flash()});
    })


};

//get transaction details
exports.block_transaction_details=function (req, res, next) {
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
        console.log("data***************************");
        console.log(util.inspect(data, {depth: null}));
        console.log(typeof data);
        res.render('view_transaction', {block_height: "active", transaction: data, title: "Transactions", message: req.flash()});
    }, (error) => {
        console.log("error---------------------------------");
        if(error.error){
            error.message=error.error.message
        }
        req.flash("error", error.message);
        res.redirect("/block");
    }).catch((error) => {
       if(error.error){
            error.message=error.error.message
        }
        req.flash("error", error.message);
        res.redirect("/block");
    })


};




