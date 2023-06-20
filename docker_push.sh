git clone https://github.com/sumitchohan/node-api.git
cd node-api

docker build . -t localhost/node-api:latest -f dockerfile
docker run -d -p 8080:8080 localhost/node-api:latest 
docker login -u chauhansumit
#enter PAT 
docker image tag localhost/node-api:latest docker.io/chauhansumit/node-api:latest
docker push docker.io/chauhansumit/node-api:latest


docker run -d -p 8080:8080 docker.io/chauhansumit/node-api:latest

# pushing from Macbook pro M1 
podman buildx build --platform linux/amd64 \
    -t <your-dockerhub-username>/<your-image-name> \
    -f Dockerfile \
    --push \
    --no-cache \
    .

