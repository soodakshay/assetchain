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
//uniqid generates random ids based on mac, process id and 
const uniqid = require('uniqid');

var transactionUtils = require('../utility/transaction_utils')

//This fuction will return the Total assets, Active users, Active categories and open requests.
module.exports.create = function(organization){
	let org_id = uniqid();
	var functionName = 'CreateOrganization';
	var args = 	[
                    organization.org_name,
                    organization.description,
                    organization.status.toString(),
                    org_id
				];
	


	return transactionUtils.prepareInvokation(functionName,args);
}

// function will return list of all organization
module.exports.list = function(){
	
	var functionName = 'ListAllOrganization';
	var args = 	[
                   
                ];
    return transactionUtils.prepareQuery(functionName,args);
}
//function to get the detail of a organization
module.exports.detail = function(id){
	
	var functionName = 'GetOrganizationByID';
	var args = 	[
                  id 
                ];
    return transactionUtils.prepareQuery(functionName,args);
} 
//updating the organization

module.exports.update = function(organization){
	
	var functionName = 'UpdateOrganization';
	var args = 	[
                    organization.org_name,
                    organization.description,
                    organization.status.toString(),
                    organization.id
                ];
    return transactionUtils.prepareInvokation(functionName,args);
} 
//deleting the organization

module.exports.delete = function(id){
	
	var functionName = 'DeleteOrganization';
	var args = 	[
                    id
                ];
    return transactionUtils.prepareInvokation(functionName,args);
} 