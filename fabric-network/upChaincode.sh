export CHANNEL_NAME1=debutchannel
export CHANNEL_NAME2=demochannel
export CHANNEL_NAME3=userchannel

CORE_PEER_MSPCONFIGPATH=/opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/debutinfotech.com/users/Admin@debutinfotech.com/msp CORE_PEER_ADDRESS=peer0.debutinfotech.com:7051 CORE_PEER_LOCALMSPID="debutMSP"
peer chaincode install -n debut_asset_chaincode -v $1 -p github.com/debut_asset_chaincode/

sleep 2

CORE_PEER_MSPCONFIGPATH=/opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/debutinfotech.com/users/Admin@debutinfotech.com/msp CORE_PEER_ADDRESS=peer1.debutinfotech.com:7051 CORE_PEER_LOCALMSPID="debutMSP"
peer chaincode install -n debut_asset_chaincode -v $1 -p github.com/debut_asset_chaincode/

CORE_PEER_MSPCONFIGPATH=/opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/debutinfotech.com/users/Admin@debutinfotech.com/msp CORE_PEER_ADDRESS=peer0.debutinfotech.com:7051 CORE_PEER_LOCALMSPID="debutMSP"
peer chaincode upgrade -o orderer0.debutinfotech.com:7050 -C $CHANNEL_NAME1 -n debut_asset_chaincode -v $1 -c '{"Args":["init"]}' -P "AND ('debutMSP.peer')"

CORE_PEER_MSPCONFIGPATH=/opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/debutinfotech.com/users/Admin@debutinfotech.com/msp CORE_PEER_ADDRESS=peer0.debutinfotech.com:7051 CORE_PEER_LOCALMSPID="debutMSP"
peer chaincode upgrade -o orderer0.debutinfotech.com:7050 -C $CHANNEL_NAME2 -n debut_asset_chaincode -v $1 -c '{"Args":["init"]}' -P "AND ('debutMSP.peer')"

CORE_PEER_MSPCONFIGPATH=/opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/debutinfotech.com/users/Admin@debutinfotech.com/msp CORE_PEER_ADDRESS=peer0.debutinfotech.com:7051 CORE_PEER_LOCALMSPID="debutMSP"
peer chaincode upgrade -o orderer0.debutinfotech.com:7050 -C $CHANNEL_NAME3 -n debut_asset_chaincode -v $1 -c '{"Args":["init"]}' -P "AND ('debutMSP.peer')"
