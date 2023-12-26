# transaction-basic-service

build docker
docker build . -t acrwebdev/transaction-basic-service:0.0.3

docker push
docker push acrwebdev/transaction-basic-service:0.0.3

docker pull acrwebdev/transaction-basic-service:0.0.3

docker pull acrwebdev/transaction-basic-service:latest

run docker
docker run -p 22000:22000 --env SERVER_IP=34.80.78.75 --env SERVER_PORT=22000 --env SWAGGER_IP=34.80.78.75 --env DB_URI="" --restart=always --name=transaction-basic-service -d acrwebdev/transaction-basic-service:0.0.3
