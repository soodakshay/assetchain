package main

import (
	"encoding/json"
	"fmt"

	"github.com/debut_asset_chaincode/assets"
	"github.com/debut_asset_chaincode/category"
	"github.com/debut_asset_chaincode/organization"
	"github.com/debut_asset_chaincode/response"
	"github.com/debut_asset_chaincode/rq"
	"github.com/debut_asset_chaincode/user"
	"github.com/hyperledger/fabric/core/chaincode/shim"
	"github.com/hyperledger/fabric/protos/peer"
)

//SmartContract ... The SmartContract
type SmartContract struct {
}
type DashboardCounts struct {
	Assets   int `json:"assets"`
	Category int `json:"category"`
	Request  int `json:"request"`
}

type UserCount struct {
	User int `json:"user"`
}

//Init Function
func (s *SmartContract) Init(stub shim.ChaincodeStubInterface) peer.Response {
	return shim.Success([]byte("Chaincode Successfully initialized"))
}

//Invoke function
func (s *SmartContract) Invoke(stub shim.ChaincodeStubInterface) peer.Response {

	fun, args := stub.GetFunctionAndParameters()

	if fun == "addUser" {
		return user.AddUser(stub, args)
	} else if fun == "login" {
		return user.Login(stub, args)
	} else if fun == "CheckEmail" {
		return user.CheckEmail(stub, args)
	} else if fun == "CheckEmpId" {
		return user.CheckEmployeeID(stub, args)
	} else if fun == "CheckPhone" {
		return user.CheckPhone(stub, args)
	} else if fun == "changeUserStatus" {
		return user.ChangeUserStatus(stub, args)
	} else if fun == "changeDeleteStatus" {
		return user.ChangeDeleteStatus(stub, args)
	} else if fun == "changePassword" {
		return user.ChangePassword(stub, args)
	} else if fun == "listAllUsers" {
		return user.ListAllUsers(stub, args)
	} else if fun == "getUser" {
		return user.GetUser(stub, args)
	} else if fun == "updateAdminProfile" {
		return user.UpdateAdminProfile(stub, args)
	} else if fun == "createAsset" {
		return assets.CreateAsset(stub, args)
	} else if fun == "updateAsset" {
		return assets.UpdateAsset(stub, args)
	} else if fun == "changeAssetStatus" {
		return assets.ChangeAssetStatus(stub, args)
	} else if fun == "createCategory" {
		return category.CreateCategory(stub, args)
	} else if fun == "listAllCategory" {
		return category.ListAllCategory(stub)
	} else if fun == "updateCategory" {
		return category.UpdateCategory(stub, args)
	} else if fun == "listAllAssets" {
		return assets.ListAllAssets(stub, args)
	} else if fun == "listAllRequest" {
		return rq.ListAllRequest(stub, args)
	} else if fun == "getRequestByID" {
		return rq.GetRequestByID(stub, args)
	} else if fun == "createRequest" {
		return rq.CreateRequest(stub, args)
	} else if fun == "changeRequestStatus" {
		return rq.ChangeRequestStatus(stub, args)
	} else if fun == "getRequestForAsset" {
		return rq.GetRequestsForAsset(stub, args)
	} else if fun == "sortRequests" {
		return rq.SortRequests(stub, args)
	} else if fun == "getNextImmediateRequest" {
		return rq.GetNextImmediateRequest(stub, args)
	} else if fun == "updateTimeSlot" {
		return rq.UpdateTimeSlot(stub, args)
	} else if fun == "getRequestByUserID" {
		return rq.GetAssetsByUserID(stub, args)
	} else if fun == "DeleteCategory" {
		return category.DeleteCategory(stub, args)
	} else if fun == "ChangeStatus" {
		return category.ChangeStatus(stub, args)
	} else if fun == "DeleteAsset" {
		return assets.DeleteAsset(stub, args)
	} else if fun == "assignAsset" {
		return assets.AssignAsset(stub, args)
	} else if fun == "DashboardData" {
		return DashboardData(stub)
	} else if fun == "userDashboardData" {
		return UserDashboardData(stub, args)
	} else if fun == "GetCategoryByID" {
		return category.GetCategoryByID(stub, args)
	} else if fun == "GetAssetByID" {
		return assets.GetAssetByID(stub, args)
	} else if fun == "ForgetPassword" {
		return user.ForgetPassword(stub, args)
	} else if fun == "CreateOrganization" {
		return organization.CreateOrganization(stub, args)
	} else if fun == "ListAllOrganization" {
		return organization.ListAllOrganization(stub, args)
	} else if fun == "GetOrganizationByID" {
		return organization.GetOrganizationByID(stub, args)
	} else if fun == "UpdateOrganization" {
		return organization.UpdateOrganization(stub, args)
	} else if fun == "DeleteOrganization" {
		return organization.DeleteOrganization(stub, args)
	} else if fun == "ChangeStatus" {
		return organization.ChangeStatus(stub, args)
	}

	return shim.Error(response.CreateErrorResponse("Invalid function name = "+fun, 0, nil))
}

//function for displaying dashboard data

func DashboardData(stub shim.ChaincodeStubInterface) peer.Response {

	categoryIterator, err := stub.GetQueryResult("{\"selector\":{\"is_deleted\":false,\"doc_type\":\"category\",\"status\":1}}")
	assetIterator, err := stub.GetQueryResult("{\"selector\":{\"is_deleted\":false,\"doc_type\":\"assets\",\"status\":1}}")
	requestIterator, err := stub.GetQueryResult("{\"selector\":{\"is_deleted\":false,\"doc_type\":\"request\",\"status\":1}}")
	if err != nil {
		fmt.Println("Error occured ==> ", err)
		return shim.Error(err.Error())
	}

	category := 0
	assets := 0
	request := 0

	for categoryIterator.HasNext() {
		categoryIterator.Next()
		category++
	}

	for assetIterator.HasNext() {
		assetIterator.Next()
		assets++
	}
	for requestIterator.HasNext() {
		requestIterator.Next()
		request++
	}
	dashboardcount := DashboardCounts{Assets: assets,
		Category: category,
		Request:  request}

	responseByte, err := json.Marshal(dashboardcount)

	if err != nil {
		shim.Error(err.Error())
	}

	return shim.Success(responseByte)
}

//function for displaying dashboard data

func UserDashboardData(stub shim.ChaincodeStubInterface, args []string) peer.Response {
	if len(args) != 1 {
		return shim.Error("Channel name not recieved as a parameter to count active users")
	}
	userIterator, err := stub.GetQueryResult("{\"selector\":{\"is_deleted\":false,\"doc_type\":\"user\",\"status\":1, \"channel\":\"" + args[0] + "\"}}")

	if err != nil {
		fmt.Println("Error occured ==> ", err)
		return shim.Error(err.Error())
	}

	users := 0

	for userIterator.HasNext() {
		userIterator.Next()
		users++
	}

	usercount := UserCount{
		User: users,
	}

	responseByte, err := json.Marshal(usercount)

	if err != nil {
		shim.Error(err.Error())
	}

	return shim.Success(responseByte)
}

func main() {
	err := shim.Start(new(SmartContract))

	if err != nil {
		fmt.Print(err)
	}
}
