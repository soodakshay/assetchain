var request = require('request-promise');
var util = require("util");

//fetch data for dashboard
exports.dashboard_details = function (req, res, next) {
   
    var url = global.apiBaseUrl+'dashboard';
    var options = {
        method: 'get',
        json: true,
        url: url,
        headers: {"Authorization": req.session.user.token}

    }
    request(options).then((data) => {
       
        res.render('dashboard', {dashboard_page: "active", dashboard: data, title: "Dashboard", message: req.flash()});
    }, (error) => {
        console.log("error---------------------------------");
        req.flash("error", error.message);
        res.redirect("/");
    }).catch((error) => {
     console.log("error---------------------------------");
        req.flash("error", error.message);
        res.redirect("/");
    })


};

//display user profile
exports.dashboard_user_profile = function (req, res, next) {
    try {
        
        res.render('profile', {title: "Profile"});
    } catch (err) {
        res.render('error', {error: err})
    }

};