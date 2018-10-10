var dashboard = require('../application/Controllers/dashboardcontroller');
var check = require('express-validator/check');
var util = require('util');
var utility = require('./../application/utility/utility')
var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  dashboard.getDashboard(req.user.channel).then(function(queRes){
    global.queRes = queRes
    return  dashboard.getUserDashboard("userchannel", req.user.channel);
  }).then((response)=>{
    global.queRes.user=response.user;
   
    res.status(200).send(global.queRes);
  }).catch(function(err){
    res.status(500).send(err);
  });
  //res.send("List category");
});

module.exports = router;