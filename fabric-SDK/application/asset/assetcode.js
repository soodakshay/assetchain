'use strict';
/*
* Copyright IBM Corp All Rights Reserved
*
* SPDX-License-Identifier: Apache-2.0
*/
/*
 * Chaincode Invoke
 */
var os = require('os');

var transactionUtils = require('../utility/transaction_utils')

//uniqid generates random ids based on mac address, process id and timestamp
const uniqid = require('uniqid');

////////////////////////////////////////////////////CREATE AN ASSET//////////////////////////////////////////////////////

module.exports.createAsset = function(asset, channel){
	let asset_id = uniqid();
	var functionName = 'createAsset';
	var args = 	[
		asset.name,  
		(asset.description ==  undefined) ? "" : asset.description, 
		asset.status, 
		asset.asset_number, 
		asset.serial_number, 
		(asset.color ==  undefined) ? "" : asset.color,
		(asset.quantity ==  undefined) ? "1" : asset.quantity,
		(asset.purchase_date ==  undefined) ? "01/01/0001" : asset.purchase_date,
		(asset.warranty_upto ==  undefined) ? "01/01/0001" : asset.warranty_upto,
		(asset.purchasing_amount ==  undefined) ? "0" : asset.purchasing_amount,
		asset.categoryid,
		asset.category_name,
		asset_id
		];
	console.log(args);

	return transactionUtils.prepareInvokation(functionName,args, channel);
}

//////////////////////////////////////////////////CREATE ASSET ENDS/////////////////////////////////////////////


//////////////////////////////////////////////////UPDATE ASSET STARTS//////////////////////////////////////////

module.exports.updateAsset = function(asset, channel){
	
	var functionName = 'updateAsset';
	var args = 	[
		asset.name,  
		asset.description, 
		asset.status, 
		asset.asset_number, 
		asset.serial_number, 
		asset.color, 
		(asset.quantity ==  undefined) ? "1" : asset.quantity, 
		asset.purchase_date, 
		asset.warranty_upto, 
		asset.purchasing_amount, 
		asset.categoryid, 
		asset.category_name,
		asset.key
		];
	console.log(args);

	return transactionUtils.prepareInvokation(functionName,args, channel);
}

//////////////////////////////////////////////////////UPDATE ASSET ENDS///////////////////////////////////////


//////////////////////////////////////////////////////LIST ALL ASSET STARTS///////////////////////////////////

module.exports.listAllAsset = function(body, channel){
	
	var functionName = 'listAllAssets';
	var args = new Array();

    if(body.field_type != undefined && body.sort_type != undefined){
        args.push(body.field_type.toString());
        args.push(body.sort_type.toString());
    }

	if(body.req_type == "1" ){
		args.push(body.req_type.toString());
	}

	return transactionUtils.prepareQuery(functionName,args, channel);
}

////////////////////////////////////////////////////LIST ALL ASSET ENDS////////////////////////////////////////

////////////////////////////////////////////GET DETAILS OF AN ASSET STARTS HERE////////////////////////////////////////////////////////

module.exports.detail = function(id, channel){
	var functionName = 'GetAssetByID';
	var args = 	[
					id
				];


	return transactionUtils.prepareQuery(functionName,args, channel);
}

////////////////////////////////////////////GET DETAILS OF AN ASSET ENDS HERE ///////////////////////////////////////////////////

/////////////////////////////////////////////////////DELETE ASSET STARTS//////////////////////////////////////

module.exports.delete = function(id, channel){
	var functionName = 'DeleteAsset';
	var args = 	[
					id
				];
	return transactionUtils.prepareInvokation(functionName,args, channel);
}

module.exports.changeAssignedStatus = function(asset_id, user_id, first_name, last_name, channel){
	var functionName = 'assignAsset'
	var args = [
					asset_id,
					user_id,
					first_name,
					last_name
				]

				
	return transactionUtils.prepareInvokation(functionName,args, channel);
}

////////////////////////////////////////////////////DELETE ASSET ENDS////////////////////////////////////////


module.exports.changeAssetStatus = function(asset, channel){
	var functionName = 'changeAssetStatus'
	var args = [
					asset.id,
					asset.status.toString()
				]

	return transactionUtils.prepareInvokation(functionName,args, channel);
}