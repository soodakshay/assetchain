var organization = require('../application/Controllers/OrganizationController');
var check = require('express-validator/check');
var util = require('util');
var utility = require('./../application/utility/utility')
var express = require('express');
var router = express.Router();

//var front1 = {name:'car', description:'ndjhfkjsdn', status:'1'};
//var front2 = {name:'truck', description:'ndjhfkjsdn', status:'2', id:"bbhtoogb89ced24h1a70"};

/* GET organization listing. */

router.post('/', function(req, res, next) {
    organization.list().then(function(queRes){
    res.status(200).send(queRes);
    
  }).catch(function(err){
    res.status(422).send(err);
  });
  //res.send("List category");
});

//get detail of a organization
router.get('/:id', function(req, res, next) {
    organization.detail(req.params.id).then(function(queRes){
    res.status(200).send(queRes);
    
  }).catch(function(err){
    res.status(422).send(err);
  });
  
});

//create the category

router.post('/create', function(req, res, next) {
  validateCreateOrganization(req);
  var errors = req.validationErrors()
  if(errors){
    res.status(422).send(utility.createError(errors))
  }else{
    organization.create(req.body).then(function(queRes){
      res.status(200).send(queRes);
    }).catch(function(err){
      res.status(500).send(err);
    });
  }
});

//update the category

router.put('/', function(req, res, next) {
    validateCreateOrganization(req);
    var errors = req.validationErrors()
    if(errors){
        res.status(422).send(utility.createError(errors))
    }else{
        organization.update(req.body).then(function(queRes){
        res.status(200).send(queRes);
        }).catch(function(err){
            res.status(500).send(err);
        });
    }
});
//change the status of the category
router.get('status/:id/:status', function(req, res, next) {
  category.changestatus(req.params.id,req.params.status).then(function(queRes){
    res.status(200).send(queRes);
  }).catch(function(err){
    res.status(500).send(err);
  });
  
});


//delete the category


router.delete('/:id', function(req, res, next) {
    organization.delete(req.params.id).then(function(queRes){
    res.status(200).send(queRes);
  }).catch(function(err){
    res.status(500).send(err);
  });
  
});
//supportive function here 

function validateCreateOrganization(req){
  req.checkBody('org_name','Organization Name is Required').exists().notEmpty()
  req.checkBody('description','Organization desription is Required').exists().notEmpty()
  req.checkBody('status','Organization status is required').exists().notEmpty()
  if(req.method=="PUT"){
    req.checkBody('id','Organization id is required').exists().notEmpty()
  }
  
}


module.exports = router;
