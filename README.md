# Blockchain transaction tracker
## How to run
```
docker build -t react-app .
docker run -it --rm -v ${PWD}:/app -p 3000:3000 -e CHOKIDAR_USEPOLLING=true -d react-app
```