package organization

import (
	"bytes"
	"encoding/json"
	"fmt"
	"strconv"
	"time"

	"github.com/debut_asset_chaincode/response"
	"github.com/hyperledger/fabric/core/chaincode/shim"
	"github.com/hyperledger/fabric/protos/peer"
)

//Organization ... Structure definition for Category
type Organization struct {
	Name        string    `json:"name"`
	Description string    `json:"description"`
	Type        string    `json:"doc_type"`
	Status      uint8     `json:"status"`
	CreatedAt   time.Time `json:"created_at"`
	UpdatedAt   time.Time `json:"updated_at"`
	IsDeleted   bool      `json:"is_deleted"`
	DeletedAt   time.Time `json:"deleted_at"`
}

//OrganizationsResponse ... structure definition for category response
type OrganizationsResponse struct {
	Organizations []Organization `json:"organizations"`
}

type QueryStruct struct {
	Selector interface{} `json:"selector"`
}
type CategoryUniqueQuery struct {
	Name      string `json:"name"`
	IsDeleted bool   `json:"is_deleted"`
	Type      string `json:"doc_type"`
}

type OrganizationByIdResponse struct {
	ID           string       `json:"id"`
	Organization Organization `json:"organization"`
}

type Response struct {
	Status  uint16                   `json:"status"`
	Message string                   `json:"message"`
	Data    OrganizationByIdResponse `json:"data"`
}

//CreateOrganization ... this function is used to create organization
func CreateOrganization(stub shim.ChaincodeStubInterface, args []string) peer.Response {
	if len(args) != 4 {
		return shim.Error(response.CreateErrorResponse("Incorrect number of arguments. Expecting 4",
			0,
			nil))
	}
	var nameArr = []string{args[0]}
	var nameValidateResponse = CheckName(stub, nameArr)
	if nameValidateResponse.Status == 500 {
		return nameValidateResponse
	}
	var uniqueID = args[3]
	status, _ := strconv.ParseUint(args[2], 10, 64)

	var organization = Organization{Name: args[0],
		Description: args[1],
		Type:        "organization",
		Status:      uint8(status),
		CreatedAt:   time.Now().UTC(),
		UpdatedAt:   time.Now().UTC()}

	orgAsBytes, _ := json.Marshal(organization)
	err := stub.PutState(uniqueID, orgAsBytes)

	if err != nil {
		shim.Error(response.CreateErrorResponse(err.Error(),
			0,
			nil))
	}

	return shim.Success(response.CreateSuccessResponse("Organization created successfully",
		1,
		nil))
}

//CheckName ... This function will check whether user email exist in database or not
func CheckName(stub shim.ChaincodeStubInterface, args []string) peer.Response {

	if len(args) != 1 {
		return shim.Error("Invalid number of arguments. Expected 1 argument.")
	} else if len(args[0]) == 0 {
		return shim.Error("Please enter a valid name.")
	}

	resultsIterator, err := stub.GetQueryResult("{\"selector\":{\"is_deleted\":false,\"doc_type\":\"organization\",\"name\":\"" + args[0] + "\"}}")
	if err != nil {
		return shim.Error(err.Error())
	}

	if resultsIterator.HasNext() {
		return shim.Error("The name you have entered already exist.")
	}

	return shim.Success(response.CreateSuccessResponse("Name does not exist",
		1,
		nil))

}

//ListAllOrganization ... this function will return the list of all organization
func ListAllOrganization(stub shim.ChaincodeStubInterface, args []string) peer.Response {

	resultsIterator, err := stub.GetQueryResult("{\"selector\":{\"is_deleted\":false,\"doc_type\":\"organization\"}}")
	if err != nil {
		fmt.Println("Error occured ==> ", err)
		return shim.Error(err.Error())
	}

	var buffer bytes.Buffer
	buffer.WriteString("{\"organization\":[")

	bArrayMemberAlreadyWritten := false
	for resultsIterator.HasNext() {
		queryResponse, err := resultsIterator.Next()
		if err != nil {
			return shim.Error(err.Error())
		}
		// Add a comma before array members, suppress it for the first array member
		if bArrayMemberAlreadyWritten == true {
			buffer.WriteString(",")
		}
		buffer.WriteString("{\"Key\":")
		buffer.WriteString("\"")
		buffer.WriteString(queryResponse.Key)
		buffer.WriteString("\"")

		buffer.WriteString(", \"Record\":")
		// Record is a JSON object, so we write as-is
		buffer.WriteString(string(queryResponse.Value))
		buffer.WriteString("}")
		bArrayMemberAlreadyWritten = true
	}
	buffer.WriteString("]}")

	if err != nil {
		return shim.Error(err.Error())
	}

	return shim.Success(buffer.Bytes())
}

//GetOrganizationByID ... This function will return a particular category
func GetOrganizationByID(stub shim.ChaincodeStubInterface, args []string) peer.Response {

	if len(args) != 1 {
		return shim.Error("Incorrect number of arguments.Expected 1 argument")
	}

	resultsIterator, err := stub.GetQueryResult("{\"selector\":{\"doc_type\":\"organization\",\"_id\":\"" + args[0] + "\"}}")
	if err != nil {
		return shim.Error(err.Error())
	}

	if resultsIterator.HasNext() {
		resultQuery, resultError := resultsIterator.Next()

		if resultError != nil {
			return shim.Error(resultError.Error())
		}

		var org Organization

		unMarshalError := json.Unmarshal(resultQuery.Value, &org)

		if unMarshalError != nil {
			return shim.Error(unMarshalError.Error())
		}

		orgResponse := OrganizationByIdResponse{ID: resultQuery.Key, Organization: org}
		response := Response{Status: 1, Message: "success", Data: orgResponse}

		responseByte, resConvErr := json.Marshal(response)

		if resConvErr != nil {
			return shim.Error(resConvErr.Error())
		}

		return shim.Success(responseByte)

	}
	return shim.Error("Could not find any Organization.")

}

//UpdateOrganization ... function will update the category
func UpdateOrganization(APIstub shim.ChaincodeStubInterface, args []string) peer.Response {
	if len(args) != 4 {
		return shim.Error("Invalid number of arguments. Expected 4 arguments")
	}
	var uinqueID = args[3]
	status, _ := strconv.ParseUint(args[2], 10, 64)

	var org = Organization{
		Name:        args[0],
		Description: args[1],
		Type:        "organization",
		Status:      uint8(status),
		CreatedAt:   time.Now().UTC(),
		UpdatedAt:   time.Now().UTC(),
	}
	orgAsBytes, _ := json.Marshal(org)
	err := APIstub.PutState(uinqueID, orgAsBytes)
	if err != nil {
		shim.Error(response.CreateErrorResponse(err.Error(),
			0,
			nil))
	}

	return shim.Success(response.CreateSuccessResponse("Organization Updated successfully",
		1,
		nil))

}

//DeleteOrganization ... This function will delete category
func DeleteOrganization(APIstub shim.ChaincodeStubInterface, args []string) peer.Response {
	if len(args) != 1 {
		return shim.Error("Invalid number of arguments. Expected 1 arguments")
	}
	orgAsBytes, _ := APIstub.GetState(args[0])
	org := Organization{}
	json.Unmarshal(orgAsBytes, &org)
	org.IsDeleted = true
	org.DeletedAt = time.Now().UTC()
	orgAsBytes, _ = json.Marshal(org)
	err := APIstub.PutState(args[0], orgAsBytes)
	if err != nil {
		shim.Error(response.CreateErrorResponse(err.Error(),
			0,
			nil))
	}

	return shim.Success(response.CreateSuccessResponse("Organization Updated successfully",
		1,
		nil))
}

//ChangeStatus ... this function will change the status of organization
func ChangeStatus(APIstub shim.ChaincodeStubInterface, args []string) peer.Response {
	if len(args) != 2 {
		return shim.Error("Invalid number of arguments. Expected 2 arguments")
	}
	orgAsBytes, _ := APIstub.GetState(args[0])
	org := Organization{}
	json.Unmarshal(orgAsBytes, &org)
	status, _ := strconv.ParseUint(args[1], 10, 64)
	org.Status = uint8(status)
	orgAsBytes, _ = json.Marshal(org)
	err := APIstub.PutState(args[0], orgAsBytes)
	if err != nil {
		shim.Error(response.CreateErrorResponse(err.Error(),
			0,
			nil))
	}

	return shim.Success(response.CreateSuccessResponse("Organization Updated successfully",
		1,
		nil))
}
