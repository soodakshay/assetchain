export IMAGE_TAG=latest
export COMPOSE_HTTP_TIMEOUT=10000
export COMPOSE_PROJECT_NAME=debutinfotech
export FABRIC_CFG_PATH=$PWD

export CHANNEL_NAME1=debutchannel
export CHANNEL_NAME2=demochannel
export CHANNEL_NAME3=userchannel

echo
sleep 1

configtxgen -profile DebutInfotechOrdererGenesis -outputBlock ./channel-artifacts/genesis.block
echo 
echo ------------- Generated Genesis Block -----------
echo

configtxgen -profile DebutInfotechOrgsChannel -outputCreateChannelTx ./channel-artifacts/channeldebut.tx -channelID $CHANNEL_NAME1
echo 
echo ------------- Generated channel.tx -----------
echo
configtxgen -profile DebutInfotechOrgsChannel -outputCreateChannelTx ./channel-artifacts/channeldemo.tx -channelID $CHANNEL_NAME2
echo 
echo ------------- Generated channel.tx -----------
echo

configtxgen -profile DebutInfotechOrgsChannel -outputCreateChannelTx ./channel-artifacts/channeluser.tx -channelID $CHANNEL_NAME3
echo 
echo ------------- Generated channel.tx -----------
echo

docker-compose -f docker-compose-cli.yaml up
