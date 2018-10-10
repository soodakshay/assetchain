//var asset_controller = require('../controllers/assetController.js');
var express = require('express');
var router = express.Router();
//var multer = require('multer');
//var path = require('path');
var request = require('request-promise');
var util = require('util');
var find = require('arraysearch').Finder;

//set multer disk storage destination and filename for bill
//var storage = multer.diskStorage({
//    destination: function (req, file, callback) {
//        callback(null, './public/bills_pdf');
//    },
//    filename: function (req, file, callback) {
//        callback(null, Date.now() + ".pdf");
//    }
//});
//upload setting for multer
//var upload = multer({storage: storage,
//    fileFilter: function (req, file, cb) {
//        var filetypes = /pdf/;
//        var mimetype = filetypes.test(file.mimetype);
//        var extname = filetypes.test(path.extname(file.originalname).toLowerCase());
//        console.log(file.mimetype);
//        console.log(path.extname(file.originalname).toLowerCase());
//        console.log(mimetype);
//        if (mimetype && extname) {
//            return cb(null, true);
//        }
//        return cb("Error: File upload only supports the following filetypes - " + filetypes)
//    }
//}).single("bill_reciept");


//list all assets
router.get('/',
        function (req, res, next) {
            console.log("control in route ==============================");
            var url = global.apiBaseUrl + 'asset';
            var options = {
                method: 'post',
                json: true,
                url: url,
                headers: {"Authorization": req.session.user.token}
            }
            request(options).then((data) => {
                console.log("response found");
//                console.log("data***************************");
//                console.log((util.inspect(data, {depth: null})));
//                console.log(typeof data);
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
                if (error.statusCode == 401) {
                    req.session.user = "";
                    res.redirect('/')
                } else {
                    res.render('manageError', {list_asset: "active", message: req.flash()});
                }

            })
                    .catch((error) => {
                        if (error.error) {
                            error.message = error.error.message;
                        }
                        req.flash("error", error.message);
                        res.render('manageError', {list_asset: "active", message: req.flash()});
                    })
        }
)

//display add asset form
router.get('/add',
        function (req, res, next) {
            var url = global.apiBaseUrl + 'category';
            var options = {
                method: 'get',
                json: true,
                url: url,
                headers: {"Authorization": req.session.user.token}
            }
            request(options).then((data) => {
               
                var filter_category = find.all.in(data.category).with({Record: {status: 1}});
              
                res.render('add_asset', {
                    title: "Add asset",
                    categories: filter_category,
                    add_asset: "active",
                    message: req.flash()
                });
            }, (error) => {
                if (error.error) {
                    error.message = error.error.message;
                }
                console.log(error.message);
                req.flash("error", error.message);
                if (error.statusCode == 401) {
                    req.session.user = "";
                    res.redirect('/')
                } else {
                    res.redirect('/assets/add');
                }
            })
                    .catch((err) => {
                        console.log(err)
                        res.render('error', {error: err})
                    })

        }
);

//save data from add asset
router.post('/add',
        function (req, res, next) {
            var url = global.apiBaseUrl + 'asset/create';
            var options = {
                method: 'post',
                body: req.body,
                json: true,
                url: url,
                headers: {"Authorization": req.session.user.token}
            }
            request(options).then((data) => {
                req.flash("success", "asset added successfully")
//        setTimeout(function () {
                res.redirect('/assets');
//        }, 4000);
            }, (error) => {
                console.log(error);
                if (error.error) {
                    error.message = error.error.message;
                }
                console.log(error.message);
                req.flash("error", error.message);
                if (error.statusCode == 401) {
                    req.session.user = "";
                    res.redirect('/')
                } else {
                    res.redirect('/assets/add');
                }
            })
                    .catch((err) => {
                        console.log(err)
                        return next(err);
                    })

        }
);

//get data of asset to update
router.get('/update/:id',
        function (req, res, next) {
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
                var filter_category = find.all.in(data.category).with({Record: {status: 1}});
                console.log("filter_category in edit");
                console.log(filter_category);
                category_data = filter_category;
//       res.send(data)
            }, (error) => {
                if (error.error) {
                    error.message = error.error.message;
                }
                console.log(error.message);
                req.flash("error", error.message);
                if (error.statusCode == 401) {
                    req.session.user = "";
                    res.redirect('/')
                } else {
                    res.redirect('/assets');
                }
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
//        setTimeout(function () {
                res.render("edit_asset",
                        {title: 'Update Asset',
                            assets: data,
                            categories: category_data})
//        }, 2000);
            }, (error) => {
                if (error.error) {
                    error.message = error.error.message;
                }
                console.log(error.message);
                req.flash("error", error.message);
                if (error.statusCode == 401) {
                    req.session.user = "";
                    res.redirect('/')
                } else {
                    res.redirect('/assets');
                }
            })
                    .catch((err) => {
                        console.log(err)
                        return next(err);
                    })

        }
)


//save update asset
router.post('/update/:id',
        function (req, res, next) {
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
//        setTimeout(function () {
                res.redirect('/assets');
//        }, 4000);
            }, (error) => {
                if (error.error) {
                    error.message = error.error.message;
                }
                console.log(error.message);
                req.flash("error", error.message);
                if (error.statusCode == 401) {
                    req.session.user = "";
                    res.redirect('/')
                } else {
                    res.redirect('/assets');
                }
            })
                    .catch((err) => {
                        console.log(err)
                        return next(err);
                    })

        }
);

//view data
router.get('/view',
        function (req, res, next) {
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
//                return next(error);
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


//delete asset
//router.delete('/:id',
//function (req, res, next) {
//    console.log("req.params************")
//    console.log(req.params);
//    var url = global.apiBaseUrl + 'asset/' + req.params.id;
//    var options = {
//        method: 'delete',
//        json: true,
//        url: url,
//        headers: {"Authorization": req.session.user.token}
//    }
//    request(options).then((data) => {
//        console.log(data);
//        req.flash("success", "Asset deleted successfully")
//        res.send(data)
//    }, (error) => {
//        return next(error);
//    })
//            .catch((err) => {
//                console.log(err)
//                return next(err);
//            })
//
//
//});

//delete asset
router.get('/delete/:id',
        function (req, res, next) {
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
                res.redirect('/assets');
//        res.send(data)
            }, (error) => {
                if (error.error) {
                    error.message = error.error.message;
                }
                req.flash("error", error.message);
                if (error.statusCode == 401) {
                    req.session.user = "";
                    res.redirect('/')
                } else {
                    res.render('manageError', {list_asset: "active", message: req.flash()});
                }
            })
                    .catch((err) => {
                        console.log(err)
                        return next(err);
                    })


        });

/*****change status on assign and unassign****/
//router.put('/status/:id', 
//function (req, res, next) {
//    console.log("req.params************")
//    console.log(req.params.id);
//    req.body.id = req.params.id
//    console.log(req.body);
//    var url = global.apiBaseUrl + 'asset/update-status';
//    var options = {
//        method: 'put',
//        body: req.body,
//        json: true,
//        url: url,
//        headers: {"Authorization": req.session.user.token}
//    }
//    request(options).then((data) => {
//        res.send(data);
//    }, (error) => {
//        return next(error);
//    })
//            .catch((err) => {
//                console.log(err)
//                return next(err);
//            })
//
//
//}
//        );

//search sort
router.post('/filter', function (req, res, next) {

    console.log("reqqqqqqqqqqqqqqqqqq")

    // res.send(req.body);
    var url = global.apiBaseUrl + 'asset';
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
        console.log("data***************************");
        console.log((util.inspect(data, {depth: null})));
        console.log(typeof data);
        // res.send(data)
        res.render('asset_list_table', {
            assets: data.assets,
            title: "Assets",
            list_asset: "active",
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
        req.flash("error", error.message);
        if (error.statusCode == 401) {
            req.session.user = "";
            res.redirect('/')
        } else {

            res.status(error.status).send({error: error.message});
        }
//        if (error.error) {
//            error.message = error.error.message;
//        }
//        req.flash("error", error.message);
//        res.render('manageError', {list_asset: "active", message: req.flash()});

    })
            .catch((error) => {
                if (error.error) {
                    error.message = error.error.message;
                }
                req.flash("error", error.message);
                res.render('manageError', {list_asset: "active", message: req.flash()});
            })

})

module.exports = router;