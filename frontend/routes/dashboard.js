var express = require('express');
var router = express.Router();
var request = require('request-promise');

/* GET method for dashboard */
router.get('/', function (req, res, next) {
    console.log("token************88")
    console.log(req.session.user.port)
    var url = global.apiBaseUrl + 'dashboard';
    var options = {
        method: 'get',
        json: true,
        url: url,
        headers: {"Authorization": req.session.user.token}

    }
    request(options).then((data) => {
        console.log("data***************************");
        console.log(data);
        console.log(typeof data);
        res.render('dashboard', {dashboard_page: "active", dashboard: data, title: "Dashboard", message: req.flash()});
    }, (error) => {
        console.log("error++++++++++++++++++++++++")
        console.log(error)
        if (error.error) {
            error.message = error.error.message;
        }
        req.flash("error", error.message);
        if (error.statusCode == 401) {
            req.session.user = "";
            res.redirect('/')
        } else {
            res.render('manageError', {dashboard_page: "active", message: req.flash()})
        }
    }).catch((error) => {
        console.log("error---------------------------------");
        if (error.error) {
            error.message = error.error.message;
        }

        req.flash("error", error.message);
        res.render('manageError', {dashboard_page: "active", message: req.flash()});
    })


});

/* GET user profile for dashboard */
router.get('/profile', function (req, res, next) {
    try {

        res.render('profile', {title: "Profile"});
    } catch (err) {
        res.render('error', {error: err})
    }

});

//update admin profile

router.post('/admin-profile', function (req, res, next) {
//    
//    console.log(req.body);
//    res.send(req.body);
    var url = global.apiBaseUrl + 'user/update-admin';
    var options = {
        method: 'put',
        body: req.body,
        json: true,
        url: url,
        headers: {"Authorization": req.session.user.token}

    }

    console.log(options);
    request(options).then((data) => {
        console.log("data")
        console.log(data)
        req.session.user.first_name = data.first_name;
        req.session.user.last_name = data.last_name;
        req.flash('success', 'User Updated successfully');
        res.render('profile', {title: "Profile", message: req.flash()});

    }, (error) => {
        
        if (error.error) {
            error.message = error.error.message
        }
        req.flash("error", error.message);
        if (error.statusCode == 401) {
            req.session.user = "";
            res.redirect('/')
        } else {
            res.redirect('/dashboard/profile');
        }

    }).catch((err) => {

        res.render('error', {error: err});
    })


});



module.exports = router;


