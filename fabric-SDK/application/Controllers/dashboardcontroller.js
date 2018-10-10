'use strict';
/*
* Copyright IBM Corp All Rights Reserved
*
* SPDX-License-Identifier: Apache-2.0
*/
/*
 * Chaincode Invoke
 */

var Fabric_Client = require('fabric-client');
var path = require('path');
var util = require('util');
var os = require('os');
var store_path = 'hfc-key-store';

var transactionUtils = require('../utility/transaction_utils')

//This fuction will return the Total assets, Active users, Active categories and open requests.
module.exports.getDashboard = function(channel){
	
	var args=[];
	var functionName = 'DashboardData';
	
	console.log(args); 
	
	//return transactionUtils.prepareQuery(functionName, args, channel);
	return transactionUtils.prepareQuery(functionName, args, channel)
}

module.exports.getUserDashboard = function(channel, channel2){

	var args=[channel2];

	var functionName = 'userDashboardData';
	
	console.log(args); 
	
	//return transactionUtils.prepareQuery(functionName, args, channel);
	return transactionUtils.prepareQuery(functionName, args, channel)
}