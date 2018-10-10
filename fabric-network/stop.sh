echo ---------Time to remove containers---------

docker kill $(docker ps -a -q)
sleep 1
docker rm $(docker ps -a -q)

echo -----------removed the containers----------

docker volume rm $(docker volume ls -q)

echo ------------Cleared the Volumes----------

docker network prune

echo ------------pruned network----------


rm channel-artifacts/*.*


echo ------------removed channel-artifacts----------

echo ------------removed chaincode images----------
rm -r ../asset-chain-api/hfc-key-store
echo ------------removed hfc-key-store---
