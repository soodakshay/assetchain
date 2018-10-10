const request = require('request');
const dateformat = require('dateformat');
var config = require('../../configuration/config');
var transaction_utils = require('./../utility/transaction_utils');
var uniqid = require('uniqid')

var couchdbBaseURL = config.couchdbBaseUrlDocker;

if(config.network_type == 1){
    couchdbBaseURL = config.couchdbBaseUrlPysical;
}

//Add a new notification into notification table
module.exports.addNotification = function(req, channel){
    
    return new Promise((resolve, reject) =>{
	console.log("Channel Name inside exported addNotification", channel);
        //first check if there is a document of same request of not.
        //if same document is there then skip
        //else write a new document
        console.log("Request to be saved ==> " + JSON.stringify(req));
        let selector = {
            "selector":
                {
                    "doc_type":"notification",
                    "action":0,
                    "user.id":req.user.id,
                    "asset.id":req.asset.id
                }
        };

        if(req == null|| req.request_id === null){
            selector.selector.old_request_id=req.old_request_id;
        }else{
            selector.selector.request_id=req.request_id;
        }



        console.log("Selector to search ==> " + JSON.stringify(selector));
        var options = {
            url: couchdbBaseURL+'/'+ channel +'_'+ config.chaincode +'/_find',
            headers:{
                "Content-Type": "application/json"
            },
            body: JSON.stringify(selector)
        };

       request.post(options,(err, response, body)=>{
           if(err){
               reject(err)
           }else {
               var docs = JSON.parse(body).docs;
               if(docs ==  null || docs.length === 0){
                console.log("Inside if condition, catch in missing here");
		 addNotification(req,resolve,reject, channel)
               }else{
                   reject({message: "Handover request has already been initiated"})
               }
           }
       })
// addNotification(req,resolve,reject, channel);
    })
}


function addNotification(req,resolve, reject, channel) {
    var id = uniqid();
	
    console.log("Channel Name inside samller add Noti", channel)
   
 var options = {
        url: couchdbBaseURL+'/'+ channel +'_'+ config.chaincode +'/'+id,
        headers:{
            "Content-Type": "application/json"
        },
        body: JSON.stringify(req)
    };

    request.put(options,(err, response, body) =>{
        if(err){
            err.http_status=500
            console.log(err)
            reject(err)
        }else{
            resolve(body)
        }
    });
};


//This function will fetch all notifications from the couchdb
module.exports.fetchAllNotifications = function(user_id, channel){

    return new Promise((resolve, reject) =>{

        var dt = new Date()
        dt.setTime(dt.getTime() - (24 * 60 * 60 * 1000))
        console.log(dt)
        var now = dateformat(dt  ,"UTC:yyyy-mm-dd'T'HH:MM:ss'Z'")
        console.log(now)
        var query;

        var sort= [ {
            "created_at": "desc"
         }]

        //Admin case
        if(user_id == transaction_utils.getAdminId(channel)){
            query = {selector:{doc_type:"notification", "user.id":user_id, seen:false},sort:sort};
            console.log("user_id = " + user_id + "  admin_id = "+transaction_utils.getAdminId(channel))
            console.log('if');        
        }else{
            query = {selector:{doc_type:"notification", "user.id":user_id, end_timing: {"$gt":now}},sort:sort}
            console.log('else');
        }
        console.log(user_id);       
        var options = {
            url: couchdbBaseURL+'/'+ channel +'_'+ config.chaincode +'/_find',
            headers:{
                "Content-Type": "application/json"
            },
            body: JSON.stringify(query)
        }
    
        request.post(options,(err, response, body) =>{
            if(err){
                err.http_status=500
                console.log(err)
                reject(err)
            }else{
                resolve(body)
            }
        })
    })

}

/**
 * This function will change the status of a notification
 * @param {String} notification_id 
 * @param {String} notification_status 
 */
module.exports.updateNotificationStatus = function(notification_id, notification_status, channel){
return new Promise((resolve, reject)=>{
    var options = {
        url: couchdbBaseURL+"/"+ channel +"_" + config.chaincode + "/_find",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            "selector":{
                "doc_type": "notification",
                "_id": notification_id 
            }
        })
    }

    request.post(options,(err, response, body) =>{
        if(err){
            reject(err)
        }else{
            var docs = JSON.parse(body).docs;

            if(docs && docs.length > 0){
                var doc = docs[0];
                doc.action = notification_status;
                doc.seen = true;
                let options = {
                        "url": couchdbBaseURL+"/" + channel + '_' +config.chaincode + "/"+notification_id,
                        "headers": {
                            "Content-Type": "application/json"
                        },
                        "body": JSON.stringify(doc)
                }

                request.put(options,(error, resp, body)=>{
                    if(error){
                        reject(error)
                    }else{
                        resolve(body)
                    }
                })
            }

        }
    })
})
   

//This function will fetch a notification from the couchdb
// module.exports.checkNotification = function(request_id, channel){

//     return new Promise((resolve, reject) =>{
        
//         query = {selector:{doc_type:"notification","action":0, "request_id":request_id, seen:false}};
        
//         var options = {
//             url: couchdbBaseURL+'/'+ channel +'_'+ config.chaincode +'/_find',
//             headers:{
//                 "Content-Type": "application/json"
//             },
//             body: JSON.stringify(query)
//         }
    
//         request.post(options,(err, response, body) =>{
//             if(err){
//                 err.http_status=500
//                 console.log(err)
//                 reject(err)
//             }else{
//                 resolve(body)
//             }
//         })
//     })

// }


}

