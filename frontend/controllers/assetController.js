var request = require('request-promise');
var util = require('util');


//fetch list of all assets
   exports.asset_list= function (req, res, next) {
        var url = global.apiBaseUrl + 'asset';
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
            // res.send(data)
            res.render('list_assets', {
                assets: data.assets,
                title: "Assets",
                list_asset: "active",
                message: req.flash()

            });

        }, (error) => {
            if (error.error) {
                error.message = error.error.message;
            }
            req.flash("error", error.message);
            res.render('manageError', {list_asset: "active", message: req.flash()});

        })
                .catch((error) => {
                    if (error.error) {
                        error.message = error.error.message;
                    }
                    req.flash("error", error.message);
                    res.render('manageError', {list_asset: "active", message: req.flash()});
                })
    }
   
//create new asset get
    exports.asset_create_get=function (req, res, next) {
    var url = global.apiBaseUrl + 'category';
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
        res.render('add_asset', {
            title: "Add asset",
            categories: data.category,
            add_asset: "active",
            message: req.flash()
        });
    }, (error) => {
        if (error.error) {
            error.message = error.error.message;
        }
        console.log(error.message);
        req.flash("error", error.message);
        res.redirect('/assets/add');
    })
            .catch((err) => {
                console.log(err)
                res.render('error', {error: err})
            })

}

//add asset in the database(post)
exports.asset_create_post= function (req, res, next) {
    var url = global.apiBaseUrl + 'asset';
    var options = {
        method: 'post',
        body: req.body,
        json: true,
        url: url,
        headers: {"Authorization": req.session.user.token}
    }
    request(options).then((data) => {
        req.flash("success", "asset added successfully")
        setTimeout(function () {
            res.redirect('/assets');
        }, 4000);
    }, (error) => {
        console.log(error);
        if (error.error) {
            error.message = error.error.message;
        }
        console.log(error.message);
        req.flash("error", error.message);
        res.redirect('/assets/add');
    })
            .catch((err) => {
                console.log(err)
                return next(err);
            })

}

//get the details of asset to update 
exports.asset_update_get=function (req, res, next) {
    var category_data;
    var url = global.apiBaseUrl + 'category';
    var options = {
        method: 'get',
        json: true,
        url: url,
        headers: {"Authorization": req.session.user.token}
    }
    request(options).then((data) => {
        console.log("caterory listing data***************************");
        console.log(data);
        console.log(typeof data);
        category_data = data.category;
//       res.send(data)
    }, (error) => {
        if (error.error) {
            error.message = error.error.message;
        }
        console.log(error.message);
        req.flash("error", error.message);
        res.redirect('/assets');
    })
            .catch((err) => {
                console.log(err)
                return next(err);
            })
//asset edit data
    console.log(req.params.id)
    var url = global.apiBaseUrl + 'asset/' + req.params.id;
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
        setTimeout(function () {
            res.render("edit_asset",
                    {title: 'Update Asset',
                        assets: data,
                        categories: category_data})
        }, 2000);
    }, (error) => {
        if (error.error) {
            error.message = error.error.message;
        }
        console.log(error.message);
        req.flash("error", error.message);
        res.redirect('/assets');
    })
            .catch((err) => {
                console.log(err)
                return next(err);
            })

}

//save the updated details of the asset
exports.asset_update_post=function (req, res, next) {
    req.body.key = req.params.id;
    var url = global.apiBaseUrl + 'asset';
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
        // res.send(data)
        req.flash("success", "Asset updated successfully")
        setTimeout(function () {
            res.redirect('/assets');
        }, 4000);
    }, (error) => {
        if (error.error) {
            error.message = error.error.message;
        }
        console.log(error.message);
        req.flash("error", error.message);
        res.redirect('/assets');
    })
            .catch((err) => {
                console.log(err)
                return next(err);
            })

}

//get the all details of a asset
exports.asset_details=function (req, res, next) {
    var url = global.apiBaseUrl + 'asset/' + req.query.id;
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
        return next(error);
    })
            .catch((err) => {
                console.log(err)
                return next(err);
            })


}

//delete asset 
exports.asset_delete=function (req, res, next) {
    console.log("req.params************")
    console.log(req.params);
    var url = global.apiBaseUrl + 'asset/' + req.params.id;
    var options = {
        method: 'delete',
        json: true,
        url: url,
        headers: {"Authorization": req.session.user.token}
    }
    request(options).then((data) => {
        console.log(data);
        req.flash("success", "Asset deleted successfully")
        res.send(data)
    }, (error) => {
        return next(error);
    })
            .catch((err) => {
                console.log(err)
                return next(err);
            })

}

        
