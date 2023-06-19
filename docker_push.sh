 
docker build . -t localhost/node-api:latest -f dockerfile
docker run -d -p 8080:8080 localhost/node-api:latest 
docker login  
docker image tag localhost/node-api:latest docker.io/chauhansumit/node-api:latest
docker push docker.io/chauhansumit/node-api:latest

