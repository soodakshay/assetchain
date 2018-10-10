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


//uniqid generates random ids based on mac, process id and 
const uniqid = require('uniqid');

////////////////////////////////////////////////////CREATE A CATEGORY//////////////////////////////////////////


module.exports.createCategory = function(category, channel){
	let cat_id = uniqid();
	var functionName = 'createCategory';
	var args = 	[
					category.cat_name,
		 			category.description,
					category.status.toString(),
					cat_id
				];
	console.log(args);


	return transactionUtils.prepareInvokation(functionName,args, channel);
}


//////////////////////////////////////////////////CREATE CATEGORY ENDS/////////////////////////////////////////////


//////////////////////////////////////////////////UPDATE CATEGORY STARTS//////////////////////////////////////////

module.exports.update = function(category, channel){
	var functionName = 'updateCategory';
	var args = 	[
					category.cat_name,
					category.description,
					category.status.toString(),
					category.id
				];
	console.log(args);


	return transactionUtils.prepareInvokation(functionName,args, channel);
}

////////////////////////////////////////////Get Detail of a category////////////////////////////////////////////////////////

module.exports.detail = function(id, channel){
	var functionName = 'GetCategoryByID';
	var args = 	[
					id
				];
	console.log(args);


	return transactionUtils.prepareQuery(functionName,args, channel);
}

////////////////////////////////////////////GET DETAILS OF A CATEGORY ENDS HERE///////////////////////////////////////////////////


//////////////////////////////////////////////////////UPDATE CATEGORY ENDS///////////////////////////////////////



//////////////////////////////////////////////////////LIST ALL CATEGORY STARTS///////////////////////////////////

module.exports.list = function(channel){
	var functionName = 'listAllCategory';
	var args = 	[];
	return transactionUtils.prepareQuery(functionName,args, channel) ;
}

////////////////////////////////////////////////////LIST ALL CATEGORY ENDS////////////////////////////////////////


//This function will delete  a Category based on its id
module.exports.delete = function(id, channel){
	var functionName = 'DeleteCategory';
	var args = 	[
					id
				];
	return transactionUtils.prepareInvokation(functionName,args, channel);
}

//update status
module.exports.changestatus = function(id,status){
	var functionName = 'ChangeStatus';
	var args = 	[
					id,
					status
				];
	return transactionUtils.prepareInvokation(functionName,args, channel);
}
