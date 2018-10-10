var request = require('request-promise');
var util = require('util');


//list all category
exports.category_list =function (req, res, next) {
    var url = global.apiBaseUrl + 'category';
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
        // var value = JSON.parse(data);
        res.render('manage_category', {
            title: 'Category',
            categories: data.category,
            manage_category: "active",
            message: req.flash()

        });
    }, (error) => {
        console.log(error);
        if (error.error) {
            error.message = error.error.message;
        }
        req.flash("error", error.message);
        res.render('manageError', { manage_category: "active",message: req.flash()});
    })
            .catch((error) => {
                console.log(error);
                if (error.error) {
                    error.message = error.error.message;
                }
                req.flash("error", error.message);
                res.render('manageError', { manage_category: "active",message: req.flash()});
            })


};

//create category get
exports.category_create_get= function (req, res, next) {
    try {
        res.render('add_category', {title: 'Add Category', message: req.flash()});
    } catch (err) {
        res.render('error', {error: err});
    }
};

//create category post
exports.category_create_post = function (req, res, next) {
    // res.send(req.body);
    var url = global.apiBaseUrl + 'category';
    var options = {
        method: 'post',
        body: req.body,
        json: true,
        url: url,
        headers: {"Authorization": req.session.user.token}
    }
    request(options).then((data) => {
        req.flash('success', 'Category added successfully');
        setTimeout(function () {
            res.redirect("/category");
        }, 4000);
    }, (error) => {
        req.flash("error", error.message);
        res.redirect('/category/add')
        //return next(error);
    })
            .catch((err) => {
                console.log(err)
                return next(err);
            })

};

//get category to update 
exports.category_update_get= function (req, res, next) {
    console.log(req.params.id);
    var url = global.apiBaseUrl + 'category/' + req.params.id;
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
        // var value = JSON.parse(data);
        res.render("edit_category",
                {title: 'Update Category',
                    category: data})
    }, (error) => {
        req.flash("error", error.message);
        res.redirect('/category')
        //return next(error);
    })
            .catch((err) => {
                console.log(err)
                return next(err);
            })

}

//update category post
exports.category_update_post=function (req, res, next) {
    req.body.id = req.params.id
    var url = global.apiBaseUrl + 'category';
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
        // var value = JSON.parse(data);
        req.flash('success', 'Category updated successfully');
        setTimeout(function () {
            res.redirect("/category")
        }, 4000);
    }, (error) => {
        req.flash("error", error.message);
        res.redirect('/category')
        // return next(error);
    })
            .catch((err) => {
                console.log(err)
                return next(err);
            })

}

//delete category
exports.category_delete=function (req, res, next) {
    console.log("req.params************")
    console.log(req.params);
    var url = global.apiBaseUrl + 'category/' + req.params.id;
    var options = {
        method: 'delete',
        json: true,
        url: url,
        headers: {"Authorization": req.session.user.token}
    };
    request(options).then((data) => {
        console.log(data);
        req.flash('success', 'Category deleted successfully');
        res.send(data);
    }, (error) => {
        req.flash("error", error.message);
        res.redirect('/category')
        //return next(error);
    })
            .catch((err) => {
                console.log(err)
                return next(err);
            })


};



