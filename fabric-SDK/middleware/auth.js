var transactionUtils = require('./../application/utility/transaction_utils')
var session = require('express-session')


console.log("middleware")

var jwt = require('jsonwebtoken');
var config = require('../configuration/config')
var auth = function verifyToken(req, res, next){
    if(req.url == "/user/login" 
    || (req.url == "/user/create" && req.method == "POST")
    || req.url == "/user/forget-password"){
        next()
    }else{
        var token = req.headers['authorization']
        //  console.log(token)
        jwt.verify(token,config.secret,function(err, decoded){
            if(err){
                res.status(401).send({message:"Please provide a valid authorization token.", status: 0})
            }else{
                req.user = decoded;
                //////////////////////set global socket channel////////////////////////
                global.socketChannel = decoded.channel
                if(decoded.channel=="debutchannel")
                    global.socketPort = config.debutchannel_socket
                else
                    global.socketPort = config.demochannel_socket
                /////////////////////////////////////////////////////////////////

                //Get the user object for the supplied id
                transactionUtils.prepareQuery( 'getUser', [decoded.id], "userchannel").then((user) =>{
                    //Status: 1=active, 0: Inactive
                    if(user.data.status==1)     //active
                        next()
                    else
                        res.status(401).send({FirstName: user.data.first_name, Last_Name:user.data.last_name, message:"You have been disabled by the admin"})
                }).catch((err) => {
                        res.status(500).send(err)
                })
            }1
        });
    }
}

module.exports = auth;
