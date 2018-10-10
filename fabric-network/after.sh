export CHANNEL_NAME1=debutchannel
export CHANNEL_NAME2=demochannel
export CHANNEL_NAME3=userchannel

export COMPOSE_PROJECT_NAME=debutinfotech
peer channel create -o orderer0.debutinfotech.com:7050 -c $CHANNEL_NAME1 -f ./channel-artifacts/channeldebut.tx
sleep 1

peer channel create -o orderer0.debutinfotech.com:7050 -c $CHANNEL_NAME2 -f ./channel-artifacts/channeldemo.tx
sleep 1

peer channel create -o orderer0.debutinfotech.com:7050 -c $CHANNEL_NAME3 -f ./channel-artifacts/channeluser.tx
sleep 1

echo 
echo ---------------------debutchannel created successfully------------------------
echo
peer channel join -b $CHANNEL_NAME1.block
sleep 1

peer channel join -b $CHANNEL_NAME2.block
sleep 1

peer channel join -b $CHANNEL_NAME3.block
sleep 1
echo 
echo ---------------------peer0 joined  debutchannel successfully------------------------
echo

export CORE_PEER_MSPCONFIGPATH=/opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/debutinfotech.com/users/Admin@debutinfotech.com/msp CORE_PEER_ADDRESS=peer1.debutinfotech.com:7051 CORE_PEER_LOCALMSPID="debutMSP" 
peer channel join -b $CHANNEL_NAME1.block
sleep 1

peer channel join -b $CHANNEL_NAME2.block
sleep 1

peer channel join -b $CHANNEL_NAME3.block
sleep 1

echo 
echo ---------------------peer1 joined  debutchannel successfully------------------------
echo


sleep 1
export CORE_PEER_MSPCONFIGPATH=/opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/debutinfotech.com/users/Admin@debutinfotech.com/msp CORE_PEER_ADDRESS=peer0.debutinfotech.com:7051 CORE_PEER_LOCALMSPID="debutMSP"
peer chaincode install -n debut_asset_chaincode -v 1.0 -p github.com/debut_asset_chaincode/
echo 
echo ---------------------chaincode debut_asset_chaincode installed on peer0 of debutchannel successfully------------------------
echo

sleep 1
export CORE_PEER_MSPCONFIGPATH=/opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/debutinfotech.com/users/Admin@debutinfotech.com/msp CORE_PEER_ADDRESS=peer1.debutinfotech.com:7051 CORE_PEER_LOCALMSPID="debutMSP"
peer chaincode install -n debut_asset_chaincode -v 1.0 -p github.com/debut_asset_chaincode/
echo 
echo ---------------------chaincode debut_asset_chaincode installed on peer1 of debutchannel successfully------------------------
echo

sleep 2
export CORE_PEER_MSPCONFIGPATH=/opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/debutinfotech.com/users/Admin@debutinfotech.com/msp CORE_PEER_ADDRESS=peer0.debutinfotech.com:7051 CORE_PEER_LOCALMSPID="debutMSP"
peer chaincode instantiate -o orderer0.debutinfotech.com:7050 -C $CHANNEL_NAME1 -n debut_asset_chaincode -v 1.0 -c '{"Args":["init"]}' -P "AND ('debutMSP.peer')"
echo 
echo ---------------------chaincode debut_asset_chaincode instantiated on peer0 of debutchannel successfully------------------------
echo

sleep 2
export CORE_PEER_MSPCONFIGPATH=/opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/debutinfotech.com/users/Admin@debutinfotech.com/msp CORE_PEER_ADDRESS=peer0.debutinfotech.com:7051 CORE_PEER_LOCALMSPID="debutMSP"
peer chaincode instantiate -o orderer0.debutinfotech.com:7050 -C $CHANNEL_NAME2 -n debut_asset_chaincode -v 1.0 -c '{"Args":["init"]}' -P "AND ('debutMSP.peer')"
echo 
echo ---------------------chaincode debut_asset_chaincode instantiated on peer0 of debutchannel successfully------------------------
echo

sleep 2
export CORE_PEER_MSPCONFIGPATH=/opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/debutinfotech.com/users/Admin@debutinfotech.com/msp CORE_PEER_ADDRESS=peer0.debutinfotech.com:7051 CORE_PEER_LOCALMSPID="debutMSP"
peer chaincode instantiate -o orderer0.debutinfotech.com:7050 -C $CHANNEL_NAME3 -n debut_asset_chaincode -v 1.0 -c '{"Args":["init"]}' -P "AND ('debutMSP.peer')"
echo 
echo ---------------------chaincode debut_asset_chaincode instantiated on peer0 of debutchannel successfully------------------------
echo
