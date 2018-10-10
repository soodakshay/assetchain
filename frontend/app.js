var express = require('express');
var path = require('path');
var logger = require('morgan');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var swig = require('swig');
var index = require('./routes/index');
var expressSession = require('express-session');
var compression = require('compression');
var helmet = require('helmet');
var flash = require('connect-flash');
var config = require('./config');
var app = express();

// view engine setup
app.engine('html', swig.renderFile);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html');

global.apiBaseUrl = config.apiBaseUrl;

//require mongoose module
app.use(compression());
app.use(helmet());
//app.use(helmet.noCache());
app.use(helmet.referrerPolicy({policy: 'same-origin'}));

// uncomment after placing your favicon in /public

app.use(logger('dev'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(flash());  // use connect-flash for flash messages stored in session
app.use(expressSession({secret: 'ssshhhhh', saveUninitialized: true,
                 resave: true}));
             
app.use('/', index);
// middlewares for routes
app.use('/', function (req, res, next) {
    if (req.session.user)
    {
        res.locals.user = req.session.user;
        next();
    }else{
        res.redirect('/');
    }
});
app.use('/dashboard', require('./routes/dashboard'));
app.use('/users', require('./routes/users'));
app.use('/assets', require('./routes/assets'));
app.use('/category', require('./routes/category'));
app.use('/requests', require('./routes/requests'));
app.use('/block', require('./routes/block'));
app.use('/notification', require('./routes/notification'));

app.get('/logout', function (req, res) {
    req.session.destroy();
    res.redirect('/');

});
// error handlers

//app.use('/', index,function(err,req,res,next){
//    req.flash("messages", { "error" :"Invalid login credentials"});
//    res.locals.message =req.flash();
//    console.log("msg*********8");
//    console.log(err.message);
//    res.render('login', {title:"Login"});
//});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error',{error:err});
});
//app.use(function(err,req,res,next){
//    req.flash("messages", { "error" :"Invalid login credentials"});
//    res.locals.message =req.flash();
//    console.log("msg*********8");
//    console.log(err.message);
//    res.render('login', {title:"Login"});
//})

module.exports = app;
